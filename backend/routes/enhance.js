import express from 'express';
import Enhancement from '../models/Enhancement.js';
import User from '../models/User.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { enhancePrompt } from '../utils/gemini.js';

const router = express.Router();

// @route   POST /api/enhance
// @desc    Enhance a user's prompt using Gemini API
// @access  Protected
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { originalPrompt, platform } = req.body;
        const userId = req.userId;

        // Validation
        if (!originalPrompt || !platform) {
            return res.status(400).json({
                success: false,
                message: 'Please provide both prompt and platform'
            });
        }

        if (!['chatgpt', 'gemini'].includes(platform)) {
            return res.status(400).json({
                success: false,
                message: 'Platform must be either "chatgpt" or "gemini"'
            });
        }

        if (originalPrompt.trim().length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Prompt cannot be empty'
            });
        }

        // Get user and check daily limit
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Check and reset daily limit if needed
        const canEnhance = user.checkAndResetDailyLimit();
        if (!canEnhance) {
            return res.status(429).json({
                success: false,
                message: `Daily limit of ${user.usageStats.dailyLimit} enhancements reached. Resets at midnight UTC.`,
                usageStats: {
                    dailyCount: user.usageStats.dailyCount,
                    dailyLimit: user.usageStats.dailyLimit,
                    totalEnhancements: user.usageStats.totalEnhancements
                }
            });
        }

        // Call Gemini API to enhance the prompt
        const { enhancedPrompt, responseTime } = await enhancePrompt(originalPrompt);

        // Save enhancement to database (only if saveHistory is enabled)
        let enhancement = null;
        if (user.preferences.saveHistory) {
            enhancement = new Enhancement({
                userId: user._id,
                originalPrompt: originalPrompt.trim(),
                enhancedPrompt,
                platform,
                enhancementTime: responseTime,
                promptLength: {
                    original: originalPrompt.trim().length,
                    enhanced: enhancedPrompt.length
                }
            });
            await enhancement.save();
        }

        // Increment user's usage stats
        await user.incrementUsage();

        res.status(200).json({
            success: true,
            data: {
                originalPrompt: originalPrompt.trim(),
                enhancedPrompt,
                enhancementId: enhancement?._id || null,
                saved: user.preferences.saveHistory
            },
            usageStats: {
                dailyCount: user.usageStats.dailyCount,
                dailyLimit: user.usageStats.dailyLimit,
                totalEnhancements: user.usageStats.totalEnhancements
            },
            meta: {
                responseTime,
                promptLengthIncrease: enhancedPrompt.length - originalPrompt.trim().length
            }
        });

    } catch (error) {
        console.error('Enhancement error:', error);

        // Handle specific error types
        if (error.message.includes('API rate limit')) {
            return res.status(429).json({
                success: false,
                message: error.message
            });
        }

        res.status(500).json({
            success: false,
            message: error.message || 'Error enhancing prompt',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// @route   GET /api/enhance/history
// @desc    Get user's enhancement history
// @access  Protected
router.get('/history', authMiddleware, async (req, res) => {
    try {
        const userId = req.userId;
        const { page = 1, limit = 20 } = req.query;

        const skip = (parseInt(page) - 1) * parseInt(limit);

        // Get enhancements (exclude deleted)
        const enhancements = await Enhancement.find({
            userId,
            isDeleted: false
        })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit))
            .select('-__v');

        // Get total count for pagination
        const total = await Enhancement.countDocuments({
            userId,
            isDeleted: false
        });

        res.status(200).json({
            success: true,
            data: enhancements,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / parseInt(limit))
            }
        });

    } catch (error) {
        console.error('History fetch error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching history'
        });
    }
});

// @route   GET /api/enhance/favorites
// @desc    Get user's favorited enhancements
// @access  Protected
router.get('/favorites', authMiddleware, async (req, res) => {
    try {
        const userId = req.userId;

        const favorites = await Enhancement.find({
            userId,
            isFavorited: true,
            isDeleted: false
        })
            .sort({ createdAt: -1 })
            .select('-__v');

        res.status(200).json({
            success: true,
            data: favorites,
            count: favorites.length
        });

    } catch (error) {
        console.error('Favorites fetch error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching favorites'
        });
    }
});

// @route   PUT /api/enhance/:id/favorite
// @desc    Toggle favorite status
// @access  Protected
router.put('/:id/favorite', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId;

        const enhancement = await Enhancement.findOne({ _id: id, userId });
        if (!enhancement) {
            return res.status(404).json({
                success: false,
                message: 'Enhancement not found'
            });
        }

        enhancement.isFavorited = !enhancement.isFavorited;
        await enhancement.save();

        res.status(200).json({
            success: true,
            data: enhancement,
            message: enhancement.isFavorited ? 'Added to favorites' : 'Removed from favorites'
        });

    } catch (error) {
        console.error('Favorite toggle error:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating favorite status'
        });
    }
});

// @route   DELETE /api/enhance/:id
// @desc    Soft delete an enhancement
// @access  Protected
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId;

        const enhancement = await Enhancement.findOne({ _id: id, userId });
        if (!enhancement) {
            return res.status(404).json({
                success: false,
                message: 'Enhancement not found'
            });
        }

        enhancement.isDeleted = true;
        await enhancement.save();

        res.status(200).json({
            success: true,
            message: 'Enhancement deleted successfully'
        });

    } catch (error) {
        console.error('Delete error:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting enhancement'
        });
    }
});

export default router;

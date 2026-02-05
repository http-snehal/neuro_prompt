import mongoose from 'mongoose';

const enhancementSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    originalPrompt: {
        type: String,
        required: [true, 'Original prompt is required'],
        trim: true
    },
    enhancedPrompt: {
        type: String,
        required: [true, 'Enhanced prompt is required'],
        trim: true
    },
    platform: {
        type: String,
        enum: ['chatgpt', 'gemini'],
        required: true
    },
    isFavorited: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    enhancementTime: {
        type: Number, // API response time in milliseconds
        default: 0
    },
    promptLength: {
        original: {
            type: Number,
            default: 0
        },
        enhanced: {
            type: Number,
            default: 0
        }
    }
}, {
    timestamps: true // Adds createdAt and updatedAt
});

// Indexes for efficient querying
enhancementSchema.index({ userId: 1, createdAt: -1 }); // For history pagination
enhancementSchema.index({ userId: 1, isFavorited: 1 }); // For favorites
enhancementSchema.index({ userId: 1, isDeleted: 1 }); // Filter deleted items

const Enhancement = mongoose.model('Enhancement', enhancementSchema);

export default Enhancement;

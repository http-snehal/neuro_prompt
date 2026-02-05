import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long']
    },
    usageStats: {
        dailyCount: {
            type: Number,
            default: 0
        },
        lastResetDate: {
            type: Date,
            default: Date.now
        },
        totalEnhancements: {
            type: Number,
            default: 0
        },
        dailyLimit: {
            type: Number,
            default: 50
        }
    },
    preferences: {
        saveHistory: {
            type: Boolean,
            default: true
        },
        theme: {
            type: String,
            enum: ['light', 'dark'],
            default: 'light'
        }
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true // Adds createdAt and updatedAt automatically
});

// Add index on email for faster queries
userSchema.index({ email: 1 });

// Method to check if daily limit needs reset
userSchema.methods.checkAndResetDailyLimit = function () {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const lastReset = new Date(this.usageStats.lastResetDate);
    lastReset.setHours(0, 0, 0, 0);

    // If it's a new day, reset the counter
    if (today > lastReset) {
        this.usageStats.dailyCount = 0;
        this.usageStats.lastResetDate = Date.now();
    }

    return this.usageStats.dailyCount < this.usageStats.dailyLimit;
};

// Method to increment daily usage
userSchema.methods.incrementUsage = async function () {
    this.usageStats.dailyCount += 1;
    this.usageStats.totalEnhancements += 1;
    await this.save();
};

const User = mongoose.model('User', userSchema);

export default User;

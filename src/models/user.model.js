import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    mail: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true
    },
    playedGames: {
        type: Number,
        default: 0
    },
    wonGames: {
        type: Number,
        default: 0
    },
    rating: {
        type: Number,
        default: 1000
    },
    avatar: {
        type: String,
        default: 'pawn1'
    },
    lastLogin: {
        type: Date,
        default: Date.now()
    }
}, {
    timestamps: true
});

// Index username (for fast searches)
userSchema.index({ username: 1 });

const User = mongoose.model('User', userSchema);

export default User;

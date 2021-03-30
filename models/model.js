const mongoose = require('mongoose');

const ScoreSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        total_score: {
            type: Number,
            default: 0
        },
        minigame_scores: {
            minigame_1: {
                type: Number,
                default: 0
            },
            minigame_2: {
                type: Number,
                default: 0
            },
            minigame_3: {
                type: Number,
                default: 0
            },
            minigame_4: {
                type: Number,
                default: 0
            },
            minigame_5: {
                type: Number,
                default: 0
            },
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Score", ScoreSchema, "leaderboard");

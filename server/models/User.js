const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        max: 50
    },
    password: {
        type: String,
        required: true,
        min: 5,
    },
    profilePicture: {
        type: String,
        default: ""
    },
    coverPicture: {
        type: String,
        default: ""
    },
    followers: {
        type: Array,
        default: []
    },
    following: {
        type: Array,
        default: []
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    desc: {
        type: String,
        max: 50
    },
    city: {
        type: String,
        max: 30
    },
    from: {
        type: String,
        max: 30
    }
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model("User", userSchema)
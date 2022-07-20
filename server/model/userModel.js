const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
        unique: true
    },
    email: {
        type: String,
        required: true,
        maxlength: 50,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    isAvatarImageSet:{
        type: Boolean,
        default: false
    },
    avatarImage: {
        type: String,
        default: ""
    },
});

module.exports = mongoose.model('User', userSchema);

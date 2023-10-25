const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    university: {
        type: String,
        require: true
    },
    opinion: [
        {
            opinion: {
                type: String,
                require: true
            },
            date: {
                type: Date,
                default: Date.now
            },
        }
    ],
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = User = mongoose.model('user', UserSchema);
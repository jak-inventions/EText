const mongoose = require('mongoose');
const messageSchema = require('./Message.js');
const userSchema = require('./User.js');

const conversationSchema = new mongoose.Schema({
    messages: {
        type: [messageSchema]
    },
    users: {
        type: [userSchema]
    }
});

module.exports = mongoose.model('conversation', conversationSchema);

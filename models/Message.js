const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    value: {
        type: String,
        required: true,
        max: 384000
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    timestamp : {
        type : Date,
        default: Date.now
    }
});

module.exports = mongoose.model('message', messageSchema);

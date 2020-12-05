const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    guildID: String,
    welcomemsg: String,
    goodbyemsg: String

})

module.exports = mongoose.model('Message', messageSchema, 'messages');
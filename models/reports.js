const { Message } = require("discord.js");
const mongoose = require("mongoose");

let reportSchema = new mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    guildID: String,
    userID: String,
    reportedByID: String,
    reason: String

})

module.exports = mongoose.model('Report', reportSchema, 'reports')
const mongoose = require("mongoose");

const guildSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    guildID: String,
    guildName: String,
    prefix: String,
    logChannelID: String,
    welcomeChannelID: String,
    goodbyeChannelID: String,
    welcome: String,
    goodbye: String,
    ticketCount: Number

});

module.exports = mongoose.model('Guild', guildSchema, 'guilds');
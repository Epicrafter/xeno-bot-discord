const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    guildID: String,
    ticketCount: Number

})

module.exports = mongoose.model('Ticket', ticketSchema, 'tickets');
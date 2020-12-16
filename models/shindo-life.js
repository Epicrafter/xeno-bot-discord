const mongoose = require("mongoose");

let shindoSchema = mongoose.Schema({

    userID: String,
    village: String,
    clan: String,
    villageID: String,
    clanID: String

})

module.exports = mongoose.model("Shindo", shindoSchema, "shindos")
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    
    guildID: String,
    userID: String,
    userName: String,
    muteCount: Number,
    warnCount: Number, 
    kickCount: Number, 
    banCount: Number ,

})

module.exports = mongoose.model('User', userSchema, 'users');
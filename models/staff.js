const mongoose = require("mongoose");

const staffSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    userID: String,
    userName: String,
    userTag: String

});

module.exports = mongoose.model('Staff', staffSchema, 'staffs');
const mongoose = require("mongoose");

const ruleSchema = mongoose.Schema({
    
    _id: mongoose.Schema.Types.ObjectId,
    ruleNumber: String,
    ruleTitle: String,
    ruleImage: String,
    rule: String

});

module.exports = mongoose.model('Rule', ruleSchema, 'rules');
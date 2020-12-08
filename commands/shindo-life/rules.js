const { MessageEmbed } = require("discord.js");
const mongoose = require("mongoose");
const Rules = require("../../models/rules");

module.exports = {
    name: "rules",
    category: "shindo-life",
    description: "Return the rules of the Shindo Life Server",
    usage: "rules [rule number]",
    run: async(client, message, args) => {

        let rule1 = await Rules.findOne({
            ruleNumber: 1
        }, (err) => {
            if(err) {
                console.error(err);
                message.channel.send('An error occurred while trying to fetch the rules.')
        }})

        let rule2 = await Rules.findOne({
            ruleNumber: 2
        }, (err) => {
            if(err) {
                console.error(err);
                message.channel.send('An error occurred while trying to fetch the rules.')
        }})
        
        let rule3 = await Rules.findOne({
            ruleNumber: 3
        }, (err) => {
            if(err) {
                console.error(err);
                message.channel.send('An error occurred while trying to fetch the rules.')
        }})

        let rule4 = await Rules.findOne({
            ruleNumber: 4
        }, (err) => {
            if(err) {
                console.error(err);
                message.channel.send('An error occurred while trying to fetch the rules.')
        }})

        let rule5 = await Rules.findOne({
            ruleNumber: 5
        }, (err) => {
            if(err) {
                console.error(err);
                message.channel.send('An error occurred while trying to fetch the rules.')
        }})

        let rule6 = await Rules.findOne({
            ruleNumber: 6
        }, (err) => {
            if(err) {
                console.error(err);
                message.channel.send('An error occurred while trying to fetch the rules.')
        }})

        let rule7 = await Rules.findOne({
            ruleNumber: 7
        }, (err) => {
            if(err) {
                console.error(err);
                message.channel.send('An error occurred while trying to fetch the rules.')
        }})
        
        if(!args[0]) {

            let rulesEmbed = new MessageEmbed()
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter("Powered By Xeno", client.user.avatarURL())
            .setImage(`https://i.imgur.com/bUdmJ6x.png`)
            .addField(rule1.ruleTitle, rule1.rule)
            .addField(rule2.ruleTitle, rule2.rule)
            .addField(rule3.ruleTitle, rule3.rule)
            .addField(rule4.ruleTitle, rule4.rule)
            .addField(rule5.ruleTitle, rule5.rule)
            .addField(rule6.ruleTitle, rule6.rule)
            .addField(rule7.ruleTitle, rule7.rule)

            message.channel.send(rulesEmbed)

        } else {

            let title;
            let image;
            let rule;

            if(args[0] === '1') title = rule1.ruleTitle, image = rule1.ruleImage, rule = rule1.rule;
            if(args[0] === '2') title = rule2.ruleTitle, image = rule2.ruleImage, rule = rule2.rule;
            if(args[0] === '3') title = rule3.ruleTitle, image = rule3.ruleImage, rule = rule3.rule;
            if(args[0] === '4') title = rule4.ruleTitle, image = rule4.ruleImage, rule = rule4.rule;
            if(args[0] === '5') title = rule5.ruleTitle, image = rule5.ruleImage, rule = rule5.rule;
            if(args[0] === '6') title = rule6.ruleTitle, image = rule6.ruleImage, rule = rule6.rule;
            if(args[0] === '7') title = rule7.ruleTitle, image = rule7.ruleImage, rule = rule7.rule;
            

            let ruleEmbed = new MessageEmbed()
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter("Powered By Xeno", client.user.avatarURL())
            .setImage(image)
            .addField(title, rule)

            message.channel.send(ruleEmbed)

        }
        
    }
}

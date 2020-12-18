const { MessageEmbed } = require("discord.js");
const mongoose = require("mongoose");
const Staff = require("../../models/staff");

module.exports = {
    name: "checkstaff",
    category: "bot-owner",
    description: "Checks if the memtionned user is part of the Staff list",
    usage: "checkstaff <@member>",
    run: async(client, message, args) => {

        let botOwner = message.author.id == '342333088573161472';
        let member = message.mentions.members.first();

        let usage = new MessageEmbed()
            .setColor(process.env.embedcolor)

        if(!botOwner) { 
            usage.addField("Missing Permission", "Only the \`\`BOT OWNER\`\` can execute this command.")
            message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
            return;
        }

        if(!member) {
            usage.addField("Missing Member Mention", "Usage: checkstaff <@member>")
            message.channel.send(usage)
                .then(msg => {msg.delete({ timeout: 5000 })})
            return;
        }

        const checkStaff = Staff.findOne({

            userID: member.user.id

        }, (err, staff) => {

            if(err) console.error(err);
            if(!staff) {

                return message.channel.send(`<@${member.user.id}> is not an \`\`Authorized\`\` member.`);

            } else {

                return message.channel.send(`<@${member.user.id}> is an \`\`Authorized\`\` member.`)

            }

        })

    }
}
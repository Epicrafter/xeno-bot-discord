const { MessageEmbed } = require("discord.js");
const mongoose = require("mongoose");
const User = require("../../models/user");
const Guild = require("../../models/guild");
const config = require("../../config.json");

module.exports = {
    name: "resetwarns",
    category: "moderation",
    description: "Sets the warns of the mentionned user too 0",
    usage: "resetwarns <@member>",
    run: async(client, message, args) => {

        try {
            message.delete()
        } catch(err) {
            console.error(err)
            message.channel.send(`An error occurred while executing this command`)
        }

        const member = message.mentions.members.first();

        let usage = new MessageEmbed()
            .setColor(process.env.embedcolor)
        
        if(!message.member.hasPermission("MANAGE_MESSAGES")) {
            usage.addField("Missing Permission", "Only users with the \`\`MANAGE_MESSAGES\`\` permission can use this command")
            message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
            return;
        }

        if(!member) {
            usage.addField(`Missing Member Mention", "Usage: warn <@member> <reason>`)
            message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
            return;
        }

        await User.findOne({
            userID: member.user.id
        }, async (err, user) => {

            if(err) console.error(err);
        
            if(!user) {

                const newUser = new User({

                    _id: mongoose.Types.ObjectId(),
                    guildID: message.guild.id,
                    userID: member.user.id,
                    userName: member.user.username,
                    muteCount: 0,
                    warnCount: 0, 
                    kickCount: 0, 
                    banCount: 0,

                })

                newUser.save()
                .then(result => console.log(result))
                .catch(err => console.error(err))

            } else {

                user.updateOne({

                    warnCount: 0

                })

                .then(result => console.log(result))
                .catch(err => console.error(err))

            }

        })

        message.channel.send(`**${member.user.username}#${member.user.discriminator}'s** warnings have been reseted`)

    }
}
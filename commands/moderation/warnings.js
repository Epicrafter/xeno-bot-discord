const { MessageEmbed } = require("discord.js");
const mongoose = require("mongoose");
const User = require("../../models/user");
const guild = require("../../models/guild");
const config = require("../../config.json");

module.exports = {
    name: "warnings",
    category: "moderation", 
    description: "Returns the number of warnings the mentionned user has",
    usage: "warnings <@member>",
    run: async(client, message, args) => {

        let member = message.mentions.members.first();

        let usage = new MessageEmbed()
            .setColor(process.env.embedcolor)

        if(!message.member.hasPermission("MANAGE_MESSAGES")) {
            usage.addField("Missing Permission", "Only users with the \`\`MANAGE_MESSAGES\`\` permission can use this command")
            message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
            return;
        }

        if(!member) {
            usage.addField("Missing Member Mention", "Usage: warn <@member> <reason>")
            message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
            return;
        }

        await User.findOne({

            userID: member.user.id

        }, async(err, user) => {

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
                .catch(err => console.error(err));

            }
        })

        const warns = await User.findOne({
            guildID: message.guild.id,
            userID: member.id
        }).catch(err => console.error(err));  

        const warning = warns.warnCount;

        let avatar = member.user.displayAvatarURL({ format: 'jpg', dynamic: true, size: 1024 });

        let warnEmbed = new MessageEmbed()
        .setColor("#363940")
        .setDescription(`**Warning(s)**: ${warning}`)
        .setAuthor(`${member.user.username}#${member.user.discriminator} | ${member.user.id}`, avatar)

        message.channel.send(warnEmbed)
    
    }
}
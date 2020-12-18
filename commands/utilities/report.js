const { MessageEmbed } = require("discord.js");
const mongoose = require("mongoose");
const Report = require("../../models/reports");
const Guild = require("../../models/guild");
const config = require("../../config.json");

module.exports = {
    name: "report",
    category: "utilities",
    descritpion: "Report someone on the server",
    usage: "report <@member> <reason>",
    run: async(client, message, args) => {

        try {
            message.delete()
        } catch(err) {
            console.log(err)
        }

        let member = message.mentions.members.first();
        let reason = args.slice(1).join(' ');

        let usage = new MessageEmbed()
            .setColor(process.env.embedcolor)

        if(!member) {
            usage.addField("Missing Member", "Usage: report <@member> <reason>")
            message.channel.send(usage)
            .then(msg =>{msg.delete({ timeout: 5000 })})
            return;
        }

        if(!reason) {
            usage.addField("Missing Reason", "Usage: report <@member> <reason>")
            message.channel.send(usage)
            .then(msg =>{msg.delete({ timeout: 5000 })})
            return;
        }

        await Report.findOne({

            guildID: message.guild.id,
            userID: member.user.id

        }, async (err, report) => {

            if(err) console.error(err);

            if(!report) {

                let newReport = new Report({

                    _id: mongoose.Types.ObjectId(),
                    guildID: message.guild.id,
                    userID: member.user.id,
                    reportedByID: message.author.id,
                    reason: reason

                })

                await newReport.save()
                .then(result => console.log(result))
                .catch(err => console.error(err))

            } else {

                report.updateOne({

                    reportedByID: message.author.id,
                    reason: reason

                })

                .then(result => console.log(result))
                .catch(err => consolele.error(err))

            }

        })

        const guildDB = await Guild.findOne({

            guildID: message.guild.id

        }, async(err, guild) => {

            if(err) console.error(err);

            if(!guild) {

                const newGuild = new Guild({

                    _id: mongoose.Types.ObjectId(),
                    guildID: message.guild.id,
                    guildName: message.guild.name,
                    prefix: config.PREFIX,
                    logChannelID: null,
                    welcomeChannelID: null,
                    goodbyeChannelID: null,
                    welcome: null,
                    goodbye: null,
                    nsfw: null

                })

                await newGuild.save()
                .then(result => console.log(result))
                .catch(err => console.error(err))

            }

        })

        const logChannel = message.guild.channels.cache.get(guildDB.logChannelID);

        let avatar = member.user.displayAvatarURL({ format: 'jpg', dynamic: true, size: 1024 })

        let reportEmbed = new MessageEmbed()
        .setColor("#363940")
        .setAuthor(`${member.user.username}#${member.user.discriminator} has been reported.`, avatar)

        let reportedEmbed = new MessageEmbed()
        .setColor("#363940")
        .setThumbnail(avatar)
        .setAuthor(`${member.user.username}#${member.user.discriminator} has been reported`, avatar)
        .setDescription(`**User ID**: ${member.user.id} \n**Reported By**: ${member.user.id} \n**Reason**: ${reason}`)

        message.channel.send(reportEmbed)
        
        if(!logChannel) {
            return;
        } else {
            logChannel.send(reportedEmbed)
        }

    }
}
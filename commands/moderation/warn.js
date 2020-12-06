const { MessageEmbed } = require("discord.js");
const mongoose = require("mongoose");
const User = require("../../models/user");
const Guild = require("../../models/guild");
const config = require("../../config.json");

module.exports = {
    name: "warn",
    category: "moderation",
    description: "Warns the mentionned user",
    usage: "warn <@member> <reason>",
    run: async(client, message, args) => {

        try {
            message.delete()
        } catch(err) {
            console.error(err)
            message.channel.send(`An error occurred while executing this command`)
        }

        const member = message.mentions.members.first();
        const reason = args.slice(1).join(' ');

        let usage = new MessageEmbed()
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter("Powered By Xeno", client.user.avatarURL())
        
        if(!message.member.hasPermission("MANAGE_MESSAGES")) {
            usage.addField(`Missing Permission", "Only users with the \`\`MANAGE_MESSAGES\`\` permission can use this command`)
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

        if(!reason) {
            usage.addField(`Missing Reason", "Usage: warn <@member> <reason>`)
            message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
            return;
        }

        if(member.id === message.author.id) {
            usage.addField("Error", "You can't warn yourself")
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
                    warnCount: 1, 
                    kickCount: 0, 
                    banCount: 0,
                    
                })

                newUser.save()
                .then(result => console.log(result))
                .catch(err => console.error(err))

            } else {

                user.updateOne({

                    warnCount: user.warnCount + 1

                })

                .then(result => console.log(result))
                .catch(err => console.error(err))

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

        const warns = await User.findOne({
            guildID: message.guild.id,
            userID: member.id
        }).catch(err => console.error(err))    

        member.send(`You have been warned in **${message.guild.name}** \n**Reason**: ${reason}.`)

        let avatar = member.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 });

        let warnEmbed = new MessageEmbed()
            .setColor("#363940")
            .setAuthor(`${member.user.username}#${member.user.discriminator} has been warned`, avatar)

        if(!logChannel) {
            
            message.channel.send(warnEmbed)

        } else {
            
            let warnsEmbed = new MessageEmbed()
            .setColor("#363940")
            .setThumbnail(avatar)
            .setAuthor(`${member.user.username}#${member.user.discriminator} has been warned`, avatar)
            .setDescription(`**Reason:** ${reason} \n**Warns:** ${warns.warnCount} \n**User ID:** ${member.user.id}`)

            logChannel.send(warnsEmbed)
            message.channel.send(warnEmbed)

        }

    }
}
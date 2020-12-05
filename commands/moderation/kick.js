const { MessageEmbed } = require("discord.js");
const mongoose = require("mongoose");
const User = require("../../models/user");
const Guild = require("../../models/guild");
const config = require("../../config.json");
const { exists } = require("../../models/user");

module.exports = {
    name: "kick", 
    category: "moderation",
    description: "Kicks the mentionned user from your server",
    usage: "kick <@user> <reason>",
    run: async(client, message, args) => {

        try {
            message.delete();
        } catch(err) {
            console.error(err);
            message.channel.send(`An error occurred while executing this command`);
        }

        const member = message.mentions.members.first();
        let reason = args.slice(1).join(' ');

        let usage = new MessageEmbed()
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter("Powered By Xeno", client.user.avatarURL())

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
                    goodbye: null

                })

                await newGuild.save()
                .then(result => console.log(result))
                .catch(err => console.error(err))

            }

        })

        const logChannel = message.guild.channels.cache.get(guildDB.logChannelID);

        if(!message.member.hasPermission("KICK_MEMBER")) {
            usage.addField("Missing Permission", "Only users with the \`\`KICK_MEMBER\`\` permission can use this command.")
            message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
            return;
        }

        if(!member) {
            usage.addField("Missing Mention", "Usage: kick <@user> [reason]")
            message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
            return;
        }

        if(!member.kickable) {
            usage.addField("Error", "This member can't be kicked.")
            message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
            return;
        }

        if(message.member.roles.highest.position < member.roles.highest.position) {
            usage.addField("Error", "You cannot kick a member that has a higher role than you.")
            message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
            return;
        }

        if(!reason) {
            usage.addField("Missing Reason", "Usage: kick <@user> <reason>")
            message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
            return;
        }

        User.findOne({
            guildID: message.guild.id,
            userID: member.id
        }, async (err, user) => {

            if(err) console.error(err);

            if(!user) {
                
                const newUser = new User({
                    _id: mongoose.Types.ObjectId(),
                    guildID: message.guild.id,
                    userID: member.id,
                    userName: member.user.username,
                    muteCount: 0,
                    warnCount: 0, 
                    kickCount: 1, 
                    banCount: 0,
                })

                await newUser.save()
                .then(result => console.log(result))
                .catch(err => console.error(err));

            } else {

                user.updateOne({

                    kickCount: user.kickCount + 1

                })
                .then(result => console.log(result))
                .catch(err => console.error(err))

            }

        })

        member.send(`You were kicked from **${message.guild.name}** \n**Reason**: ${reason}`);
        member.kick(reason);
        message.channel.send(`<@${member.id}> was **kicked**!`);
        if(!logChannel) {
            return;
        } else {

            const kickEmbed = new MessageEmbed()
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter("Powered By Xeno", client.user.avatarURL())
            .setThumbnail(member.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
            .addFields(
                { name: 'Username', value: member.user.username, inline: false },
                { name: 'User ID', value: member.id, inline: false },
                { name: 'Kicked by', value: message.author, inline: false },
                { name: 'Reason', value: reason, inline: false }
            )

            return logChannel.send(kickEmbed)

        }

    }
}
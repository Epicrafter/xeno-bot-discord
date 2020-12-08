const { MessageEmbed } = require("discord.js");
const mongoose = require("mongoose");
const User = require("../../models/user");
const Guild = require("../../models/guild");
const config = require("../../config.json");
const { exists } = require("../../models/user");

module.exports = {
    name: "ban", 
    category: "moderation",
    description: "Bans the mentionned user from your server",
    usage: "ban <@user> <reason>",
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
                    goodbye: null,
                    nsfw: null

                })

                await newGuild.save()
                .then(result => console.log(result))
                .catch(err => console.error(err))

            }

        })

        const logChannel = message.guild.channels.cache.get(guildDB.logChannelID);

        if(!message.member.hasPermission("BAN_MEMBERS")) {
            usage.addField("Missing Permission", "Only users with the \`\`KICK_MEMBER\`\` permission can use this command.")
            message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
            return;
        }

        if(!member) {
            usage.addField("Missing Mention", "Usage: ban <@user> [reason]")
            message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
            return;
        }

        if(!member.bannable) {
            usage.addField("Error", "This member can't be banned.")
            message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
            return;
        }

        if(message.member.roles.highest.position < member.roles.highest.position) {
            usage.addField("Error", "You cannot ban a member that has a higher role than you.")
            message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
            return;
        }

        if(!reason) {
            usage.addField("Missing Reason", "Usage: ban <@user> <reason>")
            message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
            return;
        }

        if(member.id === message.author.id) {
            usage.addField("Error", "You can't ban yourself")
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
                    kickCount: 0, 
                    banCount: 1,
                })

                await newUser.save()
                .then(result => console.log(result))
                .catch(err => console.error(err));

            } else {

                user.updateOne({

                    banCount: user.banCount + 1

                })
                .then(result => console.log(result))
                .catch(err => console.error(err))

            }

        })

        member.send(`You were banned from **${message.guild.name}** \n**Reason**: ${reason}`);
        member.ban({ reason: reason });
        message.channel.send(`<@${member.id}> was **banned**!`);

        let avatar = member.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 });

        if(!logChannel) {
            return;
        } else {

            const banEmbed = new MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(`${member.user.username}#${member.user.discriminator} has been banned`, avatar)
            .setDescription(`**User ID**: ${member.user.id}\n**Banned By**: ${message.author.id}\n**Reason**: ${reason}`)
            .setThumbnail(avatar)

            return logChannel.send(banEmbed)

        }

    }
}
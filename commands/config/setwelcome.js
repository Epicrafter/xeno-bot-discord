const { MessageEmbed } = require("discord.js");
const mongoose = require("mongoose");
const Guild = require("../../models/guild");
const config = require("../../config.json");

module.exports = {
    name: "setwelcome",
    category: "config",
    description: "Sets the channel in which new members will be announced",
    usage: "setwelcome <#channel>",
    run: async(client, message, args) => {

        let usage = new MessageEmbed()
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter("Powered By Xeno", client.user.avatarURL())

        if(!message.member.hasPermission("MANAGE_GUILD")) {
            usage.addField("Missing Permission", "Only users with the \`\`MANAGE_GUILD\`\` permission can use this command.")
            message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
            return;
        }

        let channel = message.mentions.channels.first();

        if(!channel) {
            usage.addField("Missing Argument", "Usage: setwelcome <#channel>")
            message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
            return;
        }

        await Guild.findOne({
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
                    welcomeChannelID: channel.id,
                    goodbyeChannelID: null,
                    welcome: null,
                    goodbye: null

                })

                newGuild.save()
                .then(result => console.log(result))
                .catch(err => console.error(err))

                return message.channel.send(`The welcome channel has been set to <#${channel.id}>.`);

            } else {

                guild.updateOne({
                    welcomeChannelID: channel.id
                })

                .then(result => console.log(result))
                .catch(err => console.error(err))

                return message.channel.send(`The welcome channel has been updated to <#${channel.id}>`)

            }

        })

    }
}
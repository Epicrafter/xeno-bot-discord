const { MessageEmbed } = require("discord.js");
const mongoose = require("mongoose");
const Guild = require("../../models/guild");
const config = require("../../config.json");

module.exports = {
    name: "setleave",
    category: "config",
    description: "Sets the channel which will announce member that have left the server",
    usage: "setleave <#channel>",
    run: async(client, message, args) => {

        let usage = new MessageEmbed()
            .setColor(process.env.embedcolor)

        if(!message.member.hasPermission("MANAGE_GUILD")) {
            usage.addField("Missing Permission", "Only users with the \`\`MANAGE_GUILD\`\` permission can use this command.")
            message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
            return;
        }

        let channel = message.mentions.channels.first();

        if(!channel) {
            usage.addField("Missing Argument", "Usage: setleave <#channel>")
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
                    welcomeChannelID: null,
                    goodbyeChannelID: channel.id,
                    welcome: null,
                    goodbye: null


                })

                newGuild.save()
                .then(result => console.log(result))
                .catch(err => console.error(err))

                return message.channel.send(`The goodbye channel has been set to <#${channel.id}>.`);

            } else {

                guild.updateOne({
                    goodbyeChannelID: channel.id
                })

                .then(result => console.log(result))
                .catch(err => console.error(err))

                return message.channel.send(`The goodbye channel has been updated to <#${channel.id}>`)

            }

        })

    }
}
const { MessageEmbed } = require("discord.js");
const mongoose = require("mongoose");
const Guild = require("../../models/guild");
const config = require("../../config.json");

module.exports = {
    name: "welcome",
    category: "config",
    description: "Turns on/off the welcome messages",
    usage: "welcome <on/off>",
    run: async(client, message, args) => {

        let OnOff = args[0];

        let usage = new MessageEmbed()
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter("Powered By Xeno", client.user.avatarURL())

        if(!message.member.hasPermission("MANAGE_GUILG")) {
            usage.addField("Missing Permission", "Only users with the \`\`MANAGE_GUILD\`\` permission can use this command.")
            message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
            return;
        }

        if(!OnOff) {
            usage.addField("Missing Argument", "Usage: welcome <on/off>")
            message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
            return;
        }

        if(OnOff != 'on' && OnOff != 'off') {
            usage.addField("Please provide a valid argument", "Usage: welcome <on/off>")
            message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
            return;
        }

        await Guild.findOne({
            guildID: message.guild.id
        }, async (err, guild) => {

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
                    welcome: OnOff,
                    goodbye: null

                })

                newGuild.save()
                .then(result => console.log(result))
                .catch(err => console.error(err))

                return message.channel.send(`Welcome messages are now turned \`\`${OnOff}\`\` on this server.`)

            } else {

                guild.updateOne({

                    welcome: OnOff

                })

                .then(result => console.log(result))
                .catch(err => console.error(err))

                return message.channel.send(`Welcome messages are now turned \`\`${OnOff}\`\` on this server.`)

            }

        }) 

    }
}
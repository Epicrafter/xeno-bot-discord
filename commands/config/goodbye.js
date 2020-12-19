const { MessageEmbed } = require("discord.js");
const mongoose = require("mongoose");
const Guild = require("../../models/guild");
const config = require("../../config.json");

module.exports = {
    name: "goodbye",
    category: "config",
    description: "Turns on/off the goodbye messages",
    usage: "goodbye <on/off>",
    run: async(client, message, args) => {

        let OnOff = args[0];

        let usage = new MessageEmbed()
            .setColor(process.env.embedcolor)

        if(!message.member.hasPermission("MANAGE_GUILD")) {
            usage.addField("Missing Permission", "Only users with the \`\`MANAGE_GUILD\`\` permission can use this command.")
            message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
            return;
        }

        if(!OnOff) {
            usage.addField("Missing Argument", "Usage: goodbye <on/off>")
            message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
            return;
        }

        if(OnOff != 'on' && OnOff != 'off') {
            usage.addField("Please provide a valid argument", "Usage: goodbye <on/off>")
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
                    welcome: null,
                    goodbye: OnOff

                })

                newGuild.save()
                .then(result => console.log(result))
                .catch(err => console.error(err))

                return message.channel.send(`Goodbye messages are now turned \`\`${OnOff}\`\` on this server.`)

            } else {

                guild.updateOne({

                    goodbye: OnOff

                })

                .then(result => console.log(result))
                .catch(err => console.error(err))

                return message.channel.send(`Goodbye messages are now turned \`\`${OnOff}\`\` on this server.`)

            }

        }) 

    }
}
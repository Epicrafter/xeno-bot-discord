const { MessageEmbed } = require("discord.js");
const mongoose = require("mongoose");
const Guild = require("../../models/guild");
const config = require("../../config.json");

module.exports = {
    name: "setprefix",
    category: "admin",
    description: "Sets the prefix for this server.",
    usage: "prefix <newPrefix>",
    run: async(client, message, args) => {

        message.delete();

        let usage = new MessageEmbed()
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter("Powered By Xeno", client.user.avatarURL())

        if(!message.member.hasPermission("MANAGE_GUILD")) {
            usage.addField("Missing Permission", "Required Permission: \`\`MANAGE_GUILD\`\`")
            message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
            return;
        }

        const settings = await Guild.findOne({

            guildID: message.guild.id

        }, (err, guild) => {

            if(err) console.error(err);
            console.log(guild)
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

                newGuild.save()
                .then(result => console.log(result))
                .catch(err => console.error(err))

                return message.channel.send(`This server was not in our database! We have added it, please retype this command.`).then(msg => {msg.delete({ timeout: 10000 })});
            }

        })

        if(!args[0]) {
            usage.addField("Missing Argument", "Usage: prefix <newPrefix>")
            message.channel.send(usage)
            .then(msg => msg.delete({ timeout: 5000 }))
            return;
        }

        await settings.updateOne({ 
            prefix: args[0]
        });

        return message.channel.send(`Your server prefix has been updated too: \`\`${args[0]}\`\``);

    }
}
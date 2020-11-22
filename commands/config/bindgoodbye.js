const db = require("quick.db");
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "bindgoodbye",
    category: "config",
    description: "Bind goodbye messages to a channel",
    usage: "bindgoodbye <channel id>",
    run: async (client, message, args) => {

        let channel = args[0];

        let usage = new MessageEmbed()
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter("Powered By Xeno", client.user.avatarURL())
        if(!channel)usage.addField("Missing Channel", "Usage: setgoodbye <channel id>")
        if(!message.member.hasPermission("MANAGE_CHANNELS"))usage.addField("Missing Permission", "You can't use this command")

        if(!channel) {
            message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
        } else if(!message.member.hasPermission("MANAGE_CHANNELS")) {
            message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
        } else {

            db.set(`goodchannel_${message.guild.id}`, channel);
            message.channel.send(`Goodbye channel set to <#${channel}>`);

        }

    }
}
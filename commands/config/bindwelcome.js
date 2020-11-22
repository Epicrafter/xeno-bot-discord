const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "bindwelcome",
    category: "config",
    description: "Bind welcome messages to a channel",
    usage: "bindwelcome <channel id>",
    run: async (client, message, args) => {

        let channel = args[0];
        
        let usage = new MessageEmbed()
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter("Powered By Xeno", client.user.avatarURL())
        if(!channel)usage.addField("Missing Channel", "Usage: setwelcome <channel id>")
        if(!message.member.hasPermission("MANAGE_CHANNELS"))usage.addField("Missing Permission", "You can't use this command")

        if(!channel) {
            message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
        } else if(!message.member.hasPermission("MANAGE_CHANNELS")) {
            message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
        } else {
        
            db.set(`welchannel_${message.guild.id}`, channel)
            message.channel.send(`Welcome Channel is set to ${channel}`);

        }

    }
}
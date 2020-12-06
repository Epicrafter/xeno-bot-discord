const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "delwarn",
    category: "moderation",
    description: "Deletes all the warns of the specified user",
    usage: "delwarn <@user>",
    run: async(client, message, args) => {

        let user = message.mentions.members.first();

        let usage = new MessageEmbed()
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter("Powered By Xeno", client.user.avatarURL())
        if(!user)usage.addField("Missing User", "Usage: delwarn <@user>")
        if(!message.member.hasPermission("MANAGE_MESSAGES"))usage.addField("Missing Permissions", "``MANAGE_MESSAGES``")

        if(!user) {
            return message.channel.send(usage).then(msg => {msg.delete({ timeout: 5000 })})
        }

        if(!message.member.hasPermission("MANAGE_MESSAGES")) {
            return message.channel.send(usage).then(msg => {msg.delete({ timeout: 5000 })})
        }

        let warnings = db.get(`warnings_${message.guild.id}_${user.id}`);
        db.delete(`warnings_${message.guild.id}_${user.id}`);

        user.send(`All your warnings in **${message.guild.name}** have been reseted by **${message.author.tag}**`)
        await message.channel.send(`Reseted all warnings of **${user.user.username}**`)

    }
}
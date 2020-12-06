const { MessageEmbed } = require("discord.js");
const ms = require('ms');

module.exports = {
    name: "unmute",
    category: "moderation",
    description: "Unmutes the mentionned user",
    usage: "unmute <@member>",
    run: async(client, message, args) => {

        try {
            message.delete();
        } catch(err) {
            console.error(err);
        }

        let member = message.mentions.members.first();

        let usage = new MessageEmbed()
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter("Powered By Xeno", client.user.avatarURL())

        if(!message.member.hasPermission("MANAGE_ROLES")) {
            usage.addField("Missing Permission", "Only users with the \`\`MANAGE_ROLES\`\` permission can use this command")
            message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
            return;
        }

        if(!member) {
            usage.addField("Missing Member Mention", "Usage: unmute <@member>")
            message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
            return;
        }

        if(member.id === message.author.id) {
            usage.addField("Error", "You can't mute yourself")
            message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
            return;
        }

        let muted = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted');
        
        if(!member.roles.cache.has(muted.id)) return message.channel.send(`**${member.user.username}** is not muted.`)
        await member.roles.remove(muted);

        let avatar = member.user.displayAvatarURL({ format: 'jpg', dynamic: true, size: 1024 });

        member.user.send(`You've been **muted** in **${message.guild.name}**`);

        let muteEmbed = new MessageEmbed()
        .setColor("#363940")
        .setAuthor(`${member.user.username}#${member.user.discriminator} has been unmuted`, avatar)

        message.channel.send(muteEmbed)

    }
}
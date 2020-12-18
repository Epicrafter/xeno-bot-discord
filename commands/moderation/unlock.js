const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "unlock",
    category: "moderation",
    description: "Unlocks a locked channel",
    usage: "unlock <#channel>",
    run: async(client, message, args) => {

        try {
            message.delete()
        } catch(err) {
            console.error(err)
        }

        let channel = message.mentions.channels.first();

        let usage = new MessageEmbed()
            .setColor(process.env.embedcolor)

        if(!message.member.hasPermission("MANAGE_CHANNELS")) {
            usage.addField("Missing Permission", "Only users with the \`\`MANAGE_MESSAGES\`\` permission can use this command")
            message.channel.send(usage)
                .then(msg => {msg.delete({ timeout: 5000 })})
            return;
        }

        if(!channel) {
            usage.addField("Missing Channel", "Usage: lock <#channel>")
            message.channel.send(usage)
                .then(msg => {msg.delete({ timeout: 5000 })})
            return;
        }

        let toLock = client.channels.cache.get(channel.id);

        toLock.updateOverwrite(message.guild.roles.everyone, { SEND_MESSAGES: true });

        message.channel.send(`🔓 You have successfully unlocked <#${channel.id}>`)
            .then(msg => {msg.delete({ timeout: 5000 })})
        toLock.send(`🔓 This channel has been unlocked`)
            .then(msg => {msg.delete({ timeout: 30000 })})

    }
}
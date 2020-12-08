const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "bugreport",
    category: "utilites",
    description: "Have you encountered an issue while using Xeno? Report it!",
    usage: "bugreport <bug>",
    run: async (client, message, args) => {

        try {
            message.delete()
        } catch(err) {
            console.error(err)
        }

        let bug = args.join(' ');

        let usage = new MessageEmbed()
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter("Powered By Xeno", client.user.avatarURL())
        if(!bug)usage.addField("Missing Bug Report", "Usage: bugreprot <bug>")

        if(!bug) {
            message.channel.send(usage).then(msg => {msg.delete({ timeout: 5000 })})
        }

        let embed = new MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(`New bug reported by ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
        .setDescription(`**Bug**: ${bug}`)

        client.users.cache.get('342333088573161472').send(embed).then(msg => msg.react('✅'))

        message.channel.send(`Bug was successfully reported to the technical team.`)

    }
}
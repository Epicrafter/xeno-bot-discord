const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "suggest",
    category: "utilities",
    description: "Suggest something",
    usage: "suggest <suggestion>",
    run: async (client, message, args) => {

        message.delete();

        let suggestion = args.join(" ");

        let usage = new MessageEmbed()
            .setColor(process.env.embedcolor)

        if(!suggestion) {
            usage.addField("Missing Suggestion", "Usage: suggest <suggestion>")
            message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
            return;
        }

        let embed = new MessageEmbed()
        .setAuthor(`New Suggestion from ${message.author.tag}`, `${message.author.displayAvatarURL()}`)
        .setColor("RANDOM")
        .addField("Suggestion:", `${suggestion}`)

        message.channel.send(embed)
        .then(message => {

            message.react('✅').then( r => {
            message.react('❎').then(r => {

                message.delete({ timeout: 86400 })

            })

            })
        })


        let embed2 = new MessageEmbed()
        .setAuthor(`New Suggestion from ${message.author.tag}`, `${message.author.displayAvatarURL()}`)
        .setColor("RANDOM")
        .addField("Suggestion:", `${suggestion}`)

        client.users.cache.get("342333088573161472").send(embed2);

    }
}
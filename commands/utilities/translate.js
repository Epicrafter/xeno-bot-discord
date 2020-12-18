const translate = require("@k3rn31p4nic/google-translate-api");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "translate",
    category: "utilities",
    description: "Translate your message",
    usage: "translate <from language> <to language> <message>",
    run: async(client, message, args) => {

        const lang = args[0];
        const toLang = args[1];
        const text = args.slice(2).join(' ');

        let usage = new MessageEmbed()
            .setColor(process.env.embedcolor)

        if(!lang) {
            usage.addField("Missing Language Translated From", "Usage: translate <from language> <to language> <message>")
            message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
            return;
        }

        if(!toLang) {
            usage.addField("Missing Language to Translate too", "Usage: translate <from language> <to language> <message>")
            message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
            return;
        }

        if(!text) {
            usage.addField("Missing Text", "Usage: translate <from language> <to language> <message>")
            message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
            return;
        }

        translate(text, { from: lang, to: toLang }).then(res => {
           
            let embed = new MessageEmbed()
            .setColor("RANDOM")
            .addField(`Translated from: [ ${lang.toUpperCase()} ]`, `${text}`, true)
            .addField(`Translated to: [ ${toLang.toUpperCase()} ]`, res.text, true)

            message.channel.send(embed)

          }).catch(err => {
            return message.channel.send(`\`\`${toLang.toUpperCase()}\`\` is not a supported language.`)
          });

    }
}
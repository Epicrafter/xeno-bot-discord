const { Message, MessageEmbed } = require('discord.js');
const hastebin = require('hastebin-gen');

module.exports = {
    name: "bin",
    category: "utility",
    description: "Creates a hastebin link with the provided text",
    usage: "bin <text>",
    run: async (client, message, args) => {

        let haste = args.slice(0).join(" ")
        let type = args.slice(1).join(" ")

        let usage = new MessageEmbed()
            .setColor(process.env.embedcolor)

        if (!args[0]) {
            usage.addField("Missing Text", "Usage: bin <text>")
            message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
            return;
        }

        hastebin(haste).then(r => {

            message.channel.send("Posted to Hastebin at this URL:  " + r);
            }).catch(console.error);

        message.delete();

    }
} 

const { MessageEmbed } = require("discord.js");
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
const hastebin = require('hastebin-gen');

module.exports = {
    name: "encrypt",
    category: "utilities",
    description: "Encrypt's your message",
    usage: "encrypt <message>",
    run: async (client, message, args) => {

        let msg = args.join(" ");
        const encryptedString = cryptr.encrypt(msg);

        let usage = new MessageEmbed()
            .setColor(process.env.embedcolor)

        if(!msg) {
            usage.addField("Missing Text", "Usage: encrypt <text>")
            message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
            return;
        }

        hastebin(encryptedString).then(r => {

            message.channel.send("Here's your encrypted message:  " + r);
            }).catch(console.error);

        message.delete();
        
    }
}
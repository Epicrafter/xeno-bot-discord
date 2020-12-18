const { Message, MessageEmbed } = require('discord.js');
const indentString = require('indent-string');
const fetch = require("node-fetch");
const moment = require("moment");

module.exports = {
    name: "clyde",
    category: "fun",
    description: "Your own discord Clyde message",
    usage: "clyde <message>",
    run: async (client, message, args) => {

        let text = args.join(" ");

        let usage = new MessageEmbed()
            .setColor(process.env.embedcolor)
        if(!text)usage.addField("Missing Message", "Usage: clyde <message>")

        if(!text) {
            usage.addField("Missing Message", "Usage: clyde <message>")
            message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
            return;
        }

        const url = `https://nekobot.xyz/api/imagegen?type=clyde&text=${text}`;
        const res = await fetch(url).then(url => url.json());

        let covidEmbed = new MessageEmbed()
        .setColor("RANDOM")
        .setImage(res.message)
        .setTimestamp()
        .setFooter("Powered By Xeno", `${client.user.avatarURL()}`)

        message.channel.send(covidEmbed);
    }
} 
const { Message, MessageEmbed } = require('discord.js');
const indentString = require('indent-string');
const fetch = require("node-fetch");
const slaps = [
    'https://i.giphy.com/media/3XlEk2RxPS1m8/giphy.gif',
    'https://i.giphy.com/media/mEtSQlxqBtWWA/giphy.gif',
    'https://i.giphy.com/media/j3iGKfXRKlLqw/giphy.gif',
    'https://i.giphy.com/media/2M2RtPm8T2kOQ/giphy.gif',
    'https://i.giphy.com/media/l3YSimA8CV1k41b1u/giphy.gif',
    'https://i.giphy.com/media/WLXO8OZmq0JK8/giphy.gif',
    'https://media1.tenor.com/images/0720ffb69ab479d3a00f2d4ac7e0510c/tenor.gif',
    'https://media1.tenor.com/images/8b80166ce48c9c198951361715a90696/tenor.gif',
    'https://media1.tenor.com/images/6aa432caad8e3272d21a68ead3629853/tenor.gif',
    'https://media1.tenor.com/images/4ec47d7b87a9ce093642fc8a3c2969e7/tenor.gif'
];

module.exports = {
    name: "slap",
    category: "fun",
    description: "Slaps the mentionned user",
    usage: "slap <@user>",
    run: async (client, message, args) => {

        const user = message.mentions.users.first();

        let usage = new MessageEmbed()
            .setColor(process.env.embedcolor)

        if(!user) {
            usage.addField("Missing Mention", "Usage: slap <@member>")
            message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
            return;
        }
        
        let embed = new MessageEmbed()
        .setColor("RANDOM")
        .setImage(slaps[Math.floor(Math.random() * slaps.length)])
        .setTitle(`${message.author.username} slapped ${user.username}`)
        .setTimestamp()
        .setFooter("Powered By Xeno", `${client.user.avatarURL()}`)

        message.channel.send(embed)

    }
} 
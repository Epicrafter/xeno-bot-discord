const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const key = require("../../config.json");

module.exports = {
    name: "deepfry",
    category: "image-manipulation",
    description: "Deepfrys a user",
    usage: "deepfry [@member]",
    run: async (client, message, args) => {

        const user = message.mentions.users.first() || message.author;
        let avatar = user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 });


        const res = await fetch(`https://api.alexflipnote.dev/filter/deepfry?image=${avatar}`, { headers: { 'Authorization': process.env.alex, 'User-Agent': 'AlexFlipnote.js@2.2.0 by HarutoHiroki#4000' } });

        let embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter("Powered By Xeno", client.user.avatarURL())
        .setImage(res)
        .setTitle(`${user.username} was deepfried`)

        message.channel.send(embed)

    }
}
const { Message, MessageEmbed } = require('discord.js');
const fetch = require("node-fetch");

module.exports = {
    name: "fact",
    category: "fun",
    description: "Give you a random fact",
    usage: "fact",
    run: async (client, message, args) => {
        
        const url = `https://uselessfacts.jsph.pl/random.json?language=en`;
        const res = await fetch(url).then(url => url.json());
        
        let factEmbed = new MessageEmbed()
        .setColor("RANDOM")
        .addField("Random Fact", `${res.text}`)
        .setFooter("Powered By Xeno", `${client.user.avatarURL()}`)
        .setTimestamp()

        message.channel.send(factEmbed);

    } 
}
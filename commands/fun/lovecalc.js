const { MessageEmbed, MessageAttachment } = require("discord.js");
const fetch = require("node-fetch");
const config = require("../../config.json");
const baseURL = require("../../config/baseURL.json");

module.exports = {
    name: "lovecalc",
    category: "fun",
    descritpion: "Calculates the amount of Love between 2 users",
    usage: "lovecalc [@member]",
    run: async(client, message, args) => {

        let member = message.mentions.members.first() || message.author;
        let love = Math.floor(Math.random() * 101);

        message.channel.send(`**${message.author.username}** + ** ${member.user.username}** = ${love}% of Love ❤`)

    }
}
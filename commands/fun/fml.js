const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const key = process.env.alex;
const baseURL = require("../../assets/json/baseURL.json");

module.exports = {
    name: "fml",
    category: "fun",
    description: "Returns a random FML joke",
    usage: "fml",
    run: async(client, message, args) => {

        let url = baseURL.URL + '/fml';

        const res = await fetch(url, {

            headers: {
                'Authorization': key,
                'User-Agent': 'AlexFlipnote.js@2.2.0 by HarutoHiroki#4000'
            }

        });

        let fml = res.headers.get("content-type") === "application/json" ? await res.json() : await res.buffer();
        let text = fml.text;

        let embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter("Powered By Xeno", client.user.avatarURL())
        .addField("FML Joke:", text)

        message.channel.send(embed)
        .then(message => {

            message.react('😂').then( r => {
            message.react('🥱')

            })
        })
    
    }
}
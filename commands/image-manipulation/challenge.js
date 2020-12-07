const { MessageEmbed, MessageAttachment } = require("discord.js");
const fetch = require("node-fetch");
const key = process.env.alex;
const baseURL = require("../../assets/json/baseURL.json");

module.exports = {
    name: "challenge",
    category: "image-manipulation",
    description: "Get those achievements like in Minecraft Challenges!",
    usage: "challenge <text>",
    run: async(client, message, args) => {

        try {
            message.delete()
        } catch(err) {
            console.error(err)
        }

        let text = args.join(' ');

        let url = `${baseURL.URL}/challenge?text=${text}`;

        let usage = new MessageEmbed()
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter("Powered By Xeno", client.user.avatarURL())

        if(!text) {
            usage.addField("Missing Text", "Usage: supreme [dark|light] <text>")
            message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
            return;
        }

        const res = await fetch(url, {
            headers: {
                'Authorization': key,
                'User-Agent': 'AlexFlipnote.js@2.2.0 by HarutoHiroki#4000' 
            }
        })

        let image = res.headers.get("content-type") === "application/json" ? await res.json() : await res.buffer();
        let attachement = new MessageAttachment(image, 'supreme.png');

        message.channel.send(attachement)

    }
}
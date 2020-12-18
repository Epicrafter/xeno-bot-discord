const { MessageEmbed, MessageAttachement, MessageAttachment } = require("discord.js");
const fetch = require("node-fetch");
const key = process.env.alex;
const baseURL = require("../../assets/json/baseURL.json");

module.exports = {
    name: "ph",
    category: "image-manipulation",
    description: "Generate your own Pornhub Logo",
    usage: "ph <text 1> <text 2>",
    run: async(client, message, args) => {

        try {
            message.delete();
        } catch(err) {
            console.error(err);
        }

        let text1 = args[0];
        let text2 = args[1];

        let usage = new MessageEmbed()
            .setColor(process.env.embedcolor)

        if(!text1) {
            usage.addField("Missing Text 1", "Usage: ph <text 1> <text 2>")
            message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
            return;
        }

        if(!text1) {
            usage.addField("Missing Text 2", "Usage: ph <text 1> <text 2>")
            message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
            return;
        }

        let url = baseURL.URL + `/pornhub?text=${text1}&text2=${text2}`;

        let res = await fetch(url, {

            headers: {
                'Authorization': key,
                'User-Agent': 'AlexFlipnote.js@2.2.0 by HarutoHiroki#4000'
            }

        })

        let image = res.headers.get("content-type") === "application/json" ? await res.json() : await res.buffer();
        let attachement = new MessageAttachment(image, 'pornhub.png');

        message.channel.send(attachement)

    }
}
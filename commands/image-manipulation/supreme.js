const { MessageEmbed, MessageAttachment } = require("discord.js");
const fetch = require("node-fetch");
const key = process.env.alex;
const baseURL = require("../../assets/json/baseURL.json");

module.exports = {
    name: "supreme",
    category: "image-manipulation",
    description: "Generate your own Supreme logo",
    usage: "supreme [dark|light] <text>",
    run: async(client, message, args) => {

        try {
            message.delete()
        } catch(err) {
            console.error(err)
        }

        let text = args[0];
        let color = args[0];

        if(color == 'dark' || color == 'light') text = args.slice(1).join(' ');

        let url = `${baseURL.URL}/supreme?text=${text}`;

        let usage = new MessageEmbed()
            .setColor(process.env.embedcolor)

        if(!text) {
            usage.addField("Missing Text", "Usage: supreme [dark|light] <text>")
            message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
            return;
        }

        if(color) url = url + `&${color}=true`;

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
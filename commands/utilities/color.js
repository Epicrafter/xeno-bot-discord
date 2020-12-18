const { MessageAttachment, MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const key = process.env.alex;
const baseURL = require("../../assets/json/baseURL.json");

module.exports = {
    name: "color",
    category: "utilities",
    description: "MaGiK",
    usage: "color <hex code>", 
    run: async(client, message, args) => {

        try {
            message.delete()
        } catch(err) {
            console.error(err)
        }

        let color = args[0];

        let usage = new MessageEmbed()
            .setColor(process.env.embedcolor)
        
        if(!color) {
            usage.addField("Missing Hex Color", "Usage: color <hex code>")
            message.channel.send(usage)
            .then(msg =>{msg.delete({ timeout: 5000 })})
            return;
        }

        let url = baseURL.URL + `/colour/${color}`;

        let res = await fetch(url, {

            headers: {
                'Authorization': key,
                'User-Agent': 'AlexFlipnote.js@2.2.0 by HarutoHiroki#4000'
            }

        })

        let colour = res.headers.get("content-type") === "application/json" ? await res.json() : await res.buffer();
        
        if(colour.code == '400') {
            usage.addField("Invalid HEX Color", "If you have included a \'#\' please remove it.")
            message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
            return;
        }

        let colorEmbed = new MessageEmbed()
        .setColor(colour.hex)
        .setThumbnail(colour.image)
        .setImage(colour.image_gradient)
        .addFields(
            { name: 'Hex', value: colour.hex, inline: true },
            { name: 'RGB', value: colour.rgb, inline: true},
            { name: 'Int', value: colour.int, inline: true },
            { name: 'Brightness', value: colour.brightness }
        )

        message.channel.send(colorEmbed)

    }
}
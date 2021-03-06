const { MessageEmbed } = require('discord.js');
const fetch = require("node-fetch");

module.exports = {
    name: "hstatus",
    category: "hypixel",
    description: "Get's the status of a Hypixel player",
    usage: "status <player>",
    run: async (client, message, args) => {

        let usage = new MessageEmbed()
            .setColor(process.env.embedcolor)

        if(!args[0]) {
            usage.addField("Missing Player's Username", "Usage: status <username>")
            message.channel.send(usage)
                .then(msg => {msg.delete({ timeout: 5000 })})
            return;
        }

        const uUrl = `https://api.mojang.com/users/profiles/minecraft/${args[0]}`;
        try { 
            const uRes = await fetch(uUrl).then(uUrl => uUrl.json());

            const url = `https://api.hypixel.net/status?key=2441ceef-7c75-4fd8-a6c8-b6f093a2ca94&uuid=${uRes.id}`;
            const res = await fetch(url).then(url => url.json());

                    if(res.session.online === "true") {
                        let onlineEmbed = new MessageEmbed()
                        .setColor("#27ae60")
                        .setTitle(`${args[0]}'s Hypixel's status`)
                        .setURL(`https://namemc.com/search?q=${args[0]}`)
                        .addField('**Status:**', "Online")
                        .setThumbnail(`https://visage.surgeplay.com/full/512/${uRes.id}`)
                        .setTimestamp()
                        .setFooter("Powered By Xeno", `${client.user.avatarURL()}`)
        
                    message.channel.send(onlineEmbed);
                    } else {
                        let offlineEmbed = new MessageEmbed()
                        .setColor("#c0392b")
                        .setTitle(`${args[0]}'s Hypixel's status`)
                        .setURL(`https://namemc.com/search?q=${args[0]}`)
                        .addField('**Status:**', "Offline")
                        .setThumbnail(`https://visage.surgeplay.com/full/512/${uRes.id}`)
                        .setTimestamp()
                        .setFooter("Powered By Xeno", `${client.user.avatarURL()}`)
        
                    message.channel.send(offlineEmbed);
                    }
        } catch(err) {

            if(message.delatable) {
                message.delete
            }

            message.channel.send(`Sorry, I coundn't find a Hypixel user by the name of \`\`${args[0]}\`\``)
            .then(msg => {msg.delete({ timeout: 5000 })});

        }
    
}}
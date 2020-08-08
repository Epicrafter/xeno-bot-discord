const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "status",
    category: "hypixel",
    description: "Get's the status of a player on the Hypixel server",
    usage: "status <player>",
    run: async (client, message, args) => {

        const uUrl = `https://api.mojang.com/users/profiles/minecraft/${args[0]}`;
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
                    .setTitle(`${args[1]}'s Hypixel's status`)
                    .setURL(`https://namemc.com/search?q=${args[0]}`)
                    .addField('**Status:**', "Offline")
                    .setThumbnail(`https://visage.surgeplay.com/full/512/${uRes.id}`)
                    .setTimestamp()
                    .setFooter("Powered By Xeno", `${client.user.avatarURL()}`)
    
                message.channel.send(offlineEmbed);
    }
    
}}
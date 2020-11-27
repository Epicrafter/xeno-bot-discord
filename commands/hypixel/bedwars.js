const { MessageEmbed } = require('discord.js');
const fetch = require("node-fetch");
module.exports = {
    name: "bedwars",
    category: "hypixel",
    description: "Get a player's Bedwars Statistics",
    usage: "bedwars <player>",
    run: async (client, message, args) => {

        let usage = new MessageEmbed()
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter("Powered By Xeno", client.user.avatarURL())

        if(!args[0]) {
            usage.addField("Missing Player's Username", "Usage: bedwars <username>")
            return message.channel.send(usage).then(msg => {msg.delete({ timeout: 5000 })})
        }

        const uUrl = await `https://api.mojang.com/users/profiles/minecraft/${args[0]}`;
        
        try { 
            
            const uRes = await fetch(uUrl).then(uUrl => uUrl.json());

            const url = `https://api.hypixel.net/player?key=2441ceef-7c75-4fd8-a6c8-b6f093a2ca94&uuid=${uRes.id}`;
            const res = await fetch(url).then(url => url.json());

            function minecraftColorToHex(colorname) {
                switch(colorname) {
                    case "BLACK":
                        return "#000000";
                    case "DARK_BLUE":
                        return "#0100BD";
                    case "DARK_GREEN":
                        return "#00BF00";
                    case "DARK_AQUA":
                        return "#00BDBD";
                    case "DARK_RED":
                        return "#BE0000";
                    case "DARK_PURPLE":
                        return "#BC01BC";
                    case "GOLD":
                        return "#DB9F37";
                    case "GRAY":
                        return "#BEBDBE";
                    case "DARK_GRAY":
                        return "#3F3F3F";
                    case "BLUE":
                        return "#3F3FFE";
                    case "GREEN":
                        return "#3FFE3E";
                    case "AQUA":
                        return "#40FCFF";
                    case "RED":
                        return "#FF3E3F";
                    case "LIGHT_PURPLE":
                        return "#FE3FFE";
                    case "YELLOW":
                        return "#FEFD3F";
                    case "WHITE":
                        return "#FFFFFF";
                }
            }

            let tinodata = { "rank": {}, "user": {}, "pit": {} };
                    if(!res.success || res.success == false || res.player == null || res.player == undefined || !res.player) return sendErrorEmbed(message.channel.send(`Unknown Player`, `Player has no data in Hypixel's Database`));
                        switch(res.player.newPackageRank) {
                            case "MVP_PLUS":
                                tinodata.rank.displayName = "[MVP+]";
                                tinodata.rank.name = "MVP+";
                                tinodata.rank.color = minecraftColorToHex("AQUA");
                                break;
                            case "MVP":
                                tinodata.rank.displayName = "[MVP]";
                                tinodata.rank.name = "MVP";
                                tinodata.rank.color = minecraftColorToHex("AQUA");
                                break;
                            case "VIP_PLUS":
                                tinodata.rank.displayName = "[VIP+]";
                                tinodata.rank.name = "VIP+";
                                tinodata.rank.color = minecraftColorToHex("GREEN");
                                break;
                            case "VIP":
                                tinodata.rank.displayName = "[VIP]";
                                tinodata.rank.name = "VIP";
                                tinodata.rank.color = minecraftColorToHex("GREEN");
                                break;
                            default:
                                tinodata.rank.displayName = "";
                                tinodata.rank.name = "None";
                                tinodata.rank.color = minecraftColorToHex("GRAY");
                        }
                        if(res.player.monthlyPackageRank == "SUPERSTAR") {
                            tinodata.rank.displayName = "[MVP++]";
                            tinodata.rank.name = "MVP++";
                            tinodata.rank.color = minecraftColorToHex("GOLD");
                        }
                        if(res.player.rankPlusColor) tinodata.rank.color = minecraftColorToHex(res.player.rankPlusColor);
        
            let bEmbed = new MessageEmbed()
            .setColor(`${tinodata.rank.color}`)
            .setTitle(`${tinodata.rank.displayName} ${args[0]}`)
            .setURL(`https://namemc.com/search?q=${args[0]}`)
            .setThumbnail("https://i.imgur.com/O9Dk8Vi.png")
            .setDescription(`${args[0]}'s Bedwars stats.`)
            .setTimestamp()
            .setFooter("Powered By Xeno", client.user.avatarURL())
            if(!res.player.stats.Bedwars) {
                embed.setDescription(`**Bedwars**\nCould not retrieve **Bedwars** Stats for this user, maybe he/she never joined a Bedwars game!`);
                return message.channel.send(embed);
            }
            bEmbed.addFields(
                {name: `**Games Played**`, value: `${res.player.stats.Bedwars.games_played_bedwars_1}`, inline: true},
                {name: `**Wins**`, value: `${res.player.stats.Bedwars.wins_bedwars}`, inline: true},
                {name: `**Kills**`, value: `${res.player.stats.Bedwars.kills_bedwars}`, inline: true},
                {name: `**Final Kills**`, value: `${res.player.stats.Bedwars.final_kills_bedwars}`, inline: true},
                {name: `**Games Lost**`, value: `${res.player.stats.Bedwars.losses_bedwars}`, inline: true},
                {name: `**Deaths**`, value: `${res.player.stats.Bedwars.deaths_bedwars}`, inline: true},
                {name: `**Beds Broken**`, value: `${res.player.stats.Bedwars.beds_broken_bedwars}`, inline: true},
                {name: `**Beds Lost**`, value: `${res.player.stats.Bedwars.beds_lost_bedwars}`, inline: true},
                {name: `**Coins**`, value: `${res.player.stats.Bedwars.coins}`, inline: true}
            )

            message.channel.send(bEmbed);   

        } catch(err) {

            if(message.delatable) {
                message.delete
            }

            message.channel.send(`Sorry, I coundn't find a Hypixel user by the name of \`\`${args[0]}\`\``)
            .then(msg => {msg.delete({ timeout: 5000 })});

        }

}}

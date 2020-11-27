const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: "skywars",
    category: "hypixel",
    description: "Get a player's Skywars Statistics",
    usage: "skywars <player>",
    run: async (client, message, args) => {

        let usage = new MessageEmbed()
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter("Powered By Xeno", client.user.avatarURL())
        .addField("Missing Player's Username", "Usage: skywars <username>")

        if(!args[0]) {
            return message.channel.send(usage).then(msg => {msg.delete({ timeout: 5000 })})
        }

        const uUrl = `https://api.mojang.com/users/profiles/minecraft/${args[0]}`;
        
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
        
            let sEmbed = new MessageEmbed()
            .setColor(`${tinodata.rank.color}`)
            .setTitle(`${tinodata.rank.displayName} ${args[0]}`)
            .setURL(`https://namemc.com/search?q=${args[0]}`)
            .setThumbnail("https://i.imgur.com/Din9Uch.png")
            .setDescription(`${args[0]}'s Skywars stats.`)
            .setTimestamp()
            .setFooter("Powered By Xeno", client.user.avatarURL())
            if(!res.player.stats.SkyWars) {
                embed.setDescription(`**Skywars**\nCould not retrieve **Skywars** Stats for this user, maybe he/she never joined a Skywars game!`);
                return message.channel.send(embed);
            }
            sEmbed.addFields(
                {name: `**Games Played**`, value: `${res.player.stats.SkyWars.games}`, inline: true},
                {name: `**Wins Solo**`, value: `${res.player.stats.SkyWars.wins_solo}`, inline: true},
                {name: `**Wins Teams**`, value: `${res.player.stats.SkyWars.wins_team}`, inline: true},
                {name: `**Kills**`, value: `${res.player.stats.SkyWars.kills}`, inline: true},
                {name: `**Games Lost**`, value: `${res.player.stats.SkyWars.losses}`, inline: true},
                {name: `**Deaths**`, value: `${res.player.stats.SkyWars.deaths}`, inline: true}
            )

            message.channel.send(sEmbed);
        } catch(err) {

            if(message.delatable) {
                message.delete
            }

            message.channel.send(`Sorry, I coundn't find a Hypixel user by the name of \`\`${args[0]}\`\``)
            .then(msg => {msg.delete({ timeout: 5000 })});

        }

    }
}
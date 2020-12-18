const { MessageEmbed } = require("discord.js")
const util = require("minecraft-server-util");

module.exports = {
    name: "sstatus",
    category: "games",
    description: "Returns the status of the mentionned server",
    usage: "hstatus <server address>",
    run: async(client, message, args) => {

        let ip = args[0];

        let usage = new MessageEmbed()
            .setColor(process.env.color)

        if(!ip) {
            usage.addField("Missing Server Address", "Usage: hstatus <server address>")
            message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
            return;
        }

        let image = `https://eu.mc-api.net/v3/server/favicon/${ip}`;

        util.status(ip, { port: 25565, enableSRV: true, timeout: 5000, protocolVersion: 47 })
        .then((response) => {

            let embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter("Powered By Xeno", client.user.avatarURL())
            .setAuthor('Server Status', image)
            .addFields(
                { name: "Server Address", value: response.host, inline: true },
                { name: "Port", value: response.host, inline: true },
                { name: '\u200B', value: '\u200B', inline: true },
                { name: 'Online Players', value: response.onlinePlayers, inline: true },
                { name: "Max Players", value: response.maxPlayers, inline: true },
                { name: '\u200B', value: '\u200B', inline: true },
                { name: 'Server Version', value: response.version, inline: true }
            )

            message.channel.send(embed)

        }).catch((error) => {

            console.error(error)
            message.channel.send(`An error occurred while executing this command. Make sure that the IP provided is valid.`)

        })

    } 
}
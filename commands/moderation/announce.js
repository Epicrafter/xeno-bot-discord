const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "announce", 
    category: "moderation",
    description: "Creates an announcement in the specified channel",
    usage: "announce <channel  id> <message>",
    run: async (client, message, args) => {

        let id = args[0];

        let annoucement = args.slice(1).join(" ");

        let usage = new MessageEmbed()
            .setColor(process.env.embedcolor)

        if(!message.member.hasPermission("MANAGE_MESSAGES")) {
            usage.addField("Missing Permission", "Only users with the \`\`MANAGE_MESSAGES\`\` permission can use this command")
            message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
            .then(message.delete())
            return;
        }

        if(!id) {
            usage.addField("Missing Channel ID", "Usage: announce <channel id> <message>")
            message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
            return
        }

        if(!annoucement) {
            usage.addField("Missing Annoucement Message", "Usage: announce <channel id> <message>")
            message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
            return;
        }

        client.channels.cache.get(id).send(annoucement);

    }
} 
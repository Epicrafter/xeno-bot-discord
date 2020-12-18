const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "length",
    category: "utilities",
    description: "Calculates the length of the provided text",
    usage: "length <text>",
    run: async(client, message, args) => {
        
        let msgl = args.join(" ");

        let usage = new MessageEmbed()
            .setColor(process.env.embedcolor)
        .addField("Missing Text", "Usage: length <text>")

        if(!msgl) {
            usage.addField("Missing Text", "Usage: length <text>")
            message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
            return;
        }

        message.channel.send(`Text length: \`\`${msgl.length}\`\``)

    }
}
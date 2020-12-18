const  { MessageEmbed } = require("discord.js");
const figlet = require("figlet");

module.exports = {
    name: "asciify",
    category: "fun",
    description: "Turns text into ascii art",
    usage: "asciify <text>",
    run: async (client, message, args) => {

        const text = args.join(" ");

        let usage = new MessageEmbed()
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter("Powered By Xeno", client.user.avatarURL())
        .addField("Missing Text", "Usage: asciify <text>")

        if(!text) {
            usage.addField("Missing Text", "Usage: asciify <text>")
            message.channel.send(usage)
                .then(msg => {msg.delete({ timeout: 5000 })})
            return;
        }

        const bigText = figlet.textSync(text, {
            font: 'Ghost',
            horizontalLayout: 'universal smushing',
            verticalLayour: 'universal smushing'
        })

        message.channel.send(`\`\`\`${bigText}\`\`\``);

    }
}
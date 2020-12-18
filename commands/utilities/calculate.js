const { MessageEmbed } = require('discord.js');
const { evaluate } = require('mathjs');

module.exports = {
    name: "calc",
    category: "utilities",
    description: "Calculates something for you",
    usage: "calc <math expression>",
    run: async(client, message, args) => {

        let expression = args.join(" ");
        let result = evaluate(expression);

        let usage = new MessageEmbed()
            .setColor(process.env.embedcolor)

        if(!expression) {
            usage.addField("Missing Math Expression", "Usage: calc <expression>")
            message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
            return;
        }

        let embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter("Powered By Xeno", `${client.user.avatarURL()}`)
        .setDescription(`\`\`\`${args.join(" ")} = ${result}\`\`\``)

        message.channel.send(embed)

    }
} 
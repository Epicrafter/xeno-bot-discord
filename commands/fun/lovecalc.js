const { MessageEmbed, MessageAttachment } = require("discord.js");

module.exports = {
    name: "lovecalc",
    category: "fun",
    descritpion: "Calculates the amount of Love between 2 users",
    usage: "lovecalc <@member> [@member]",
    run: async(client, message, args) => {

        let member = message.mentions.members.first();
        let member2 = message.mentions.members.last();
        let love = Math.floor(Math.random() * 101);

        let usage = new MessageEmbed()
            .setColor(process.env.embedcolor)

        if(!member) {
            usage.addField("Missing Member Mention", "Usage: lovecalc <@member> [@member]")
            message.channel.send(usage)
                .then(msg => {msg.delete({ timeout: 5000 })})
            return;
        }

        if(!args[1]) {
            message.channel.send(`**${message.author.username}** + ** ${member.user.username}** = ${love}% of Love ❤`)
        } else if(member2) {
            message.channel.send(`**${member.user.username}** + ** ${member2.user.username}** = ${love}% of Love ❤`)
        }

    }
}
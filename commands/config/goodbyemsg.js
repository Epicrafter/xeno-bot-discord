const db = require("quick.db");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "goodbyemsg",
    category: "config",
    definition: "Set a custom goodbye message",
    usage: "goodbyemsg <custom message>",
    run: async(client, message, args) => {

        let msg = args.join(" ");

        let usage = new MessageEmbed()
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter("Powered By Xeno", client.user.avatarURL())
        if(!message)usage.addField("Missing Channel", "Usage: goodbyemsg <custom message>\n Note: use \`\`-\`\` to replace it by the member")
        if(!message.member.hasPermission("MANAGE_CHANNELS"))usage.addField("Missing Permission", "You can't use this command")

        if(!message) {
            message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
        } else if(!message.member.hasPermission("MANAGE_CHANNELS")) {
            message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
        } else {

            db.set(`goodbyemsg_${message.guild.id}`, msg);
            let customMessage = msg.replace(/-/, `member`)
            message.channel.send(`Goodbye message set too: \`\`${customMessage}\`\``);

        }

    }
}
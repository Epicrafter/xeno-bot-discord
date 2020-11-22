const db = require("quick.db");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "welcomemsg",
    category: "config",
    description: "Set a custom welcome message",
    usage: "welcomemsg <custom message>",
    run: async(client, message, args) => {

        let msg = args.join(" ");

        let usage = new MessageEmbed()
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter("Powered By Xeno", client.user.avatarURL())
        if(!msg)usage.addField("Missing Channel", "Usage: welcomemsg <custom message>\n Note: use \`\`-\`\` to replace it by the member")
        if(!message.member.hasPermission("MANAGE_CHANNELS"))usage.addField("Missing Permission", "You can't use this command")

        if(!msg) {
            message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
        } else if(!message.member.hasPermission("MANAGE_CHANNELS")) {
            message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
        } else {

            db.set(`welcomemsg_${message.guild.id}`, msg);
            let customMessage = msg.replace(/-/, `member`)
            message.channel.send(`Welcome message set too: \`\`${customMessage}\`\``);

        }

    }
}
const db = require("quick.db");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "welcome",
    category: "config",
    description: "Set if you want welcome messages to be activated on your server",
    usage: "welcome <on/off>",
    run: async(client, message, args) => {

        let OnOff = args[0];

        let usage = new MessageEmbed()
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter("Powered By Xeno", client.user.avatarURL)

        if(!message.member.hasPermission("MANAGE_MESSAGES")) {
            usage.addField("Missing Permission", "``MANAGE_MESSAGES``")
            return message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
        } else if(OnOff != 'on' && OnOff != 'off') {
            usage.addField("Usage:", "welcome <on/off>")
            return message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
        } else {

            db.set(`welcome_${message.guild.id}`, OnOff);
            message.channel.send(`Welcome messages are now turned \`\`${OnOff}\`\` on this server`);

        }

    }
}
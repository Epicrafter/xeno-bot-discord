const { Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: "support",
    category: "utilities",
    description: "Bot usefull links",
    usage: "support",
    run: async (client, message, args) => {

        let inviteEmbed = new MessageEmbed()
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter("Powered By Xeno", client.user.avatarURL())
        .setDescription(`To add the bot to your server [click here](https://discord.com/api/oauth2/authorize?client_id=505454012481667072&permissions=2147483639&scope=applications.commands%20bot). To join our discord server [click here](https://discord.gg/XVyw2Jd)`)

        message.channel.send(inviteEmbed);
    }
}
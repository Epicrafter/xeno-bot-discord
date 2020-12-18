const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "support",
    category: "information",
    description: "Returns Xeno Bot related links",
    usage: "support",
    run: async(client, message, args) => {

        let inviteLink = 'https://discord.com/api/oauth2/authorize?client_id=505454012481667072&permissions=2147483639&scope=applications.commands%20bot';
        let supportLink = 'https://discord.gg/XVyw2Jd';

        let embed = new MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(`Xeno Bot`, client.user.avatarURL())
            .setDescription(`To add the bot to your server [click here](${inviteLink}]). To join our discord server [click here](${supportLink}).`)

        message.channel.send(embed)

    }
}
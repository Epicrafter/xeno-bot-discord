const { MessageEmbed } = require("discord.js");
const mongoose = require("mongoose");
const Staff = require("../../models/staff");

module.exports = {
    name: "addstaff",
    category: "owner",
    description: "Adds the mentionned to the Staff list",
    usage: "addstaff <@member>",
    run: async(client, message, args) => {

        let botOwner = message.author.id == '342333088573161472';
        let member = message.mentions.members.first();

        let usage = new MessageEmbed()
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter("Powered By Xeno", client.user.avatarURL())

        if(!botOwner) {
            usage.addField("Unauthorized Access", "Only the \`\`BOT OWNER\`\` can execute this command")
            message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
            return;
        }

        const newGuild = new Staff({
            _id: mongoose.Types.ObjectId(),
            userID: member.user.id,
            userName: member.user.username,
            userTag: member.user.discriminator
        })

        newGuild.save()
        .then(result => console.log(result))
        .catch(err => console.error(err));

        let staff = new MessageEmbed()
        .setColor("RANDOM")
        .setTimestamp() 
        .setFooter("Powered By Xeno", client.user.avatarURL())
        .addField(`New Staff Member`, [

            `**• User ID**: ${member.user.id}`,
            `**• Username**: ${member.user.username}`,
            `**• User Tag**: ${member.user.username}${member.user.discriminator}`

        ])

        message.channel.send(staff)

    }
}
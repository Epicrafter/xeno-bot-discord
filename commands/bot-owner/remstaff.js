const { MessageEmbed } = require("discord.js");
const mongoose = require("mongoose");
const Staff = require("../../models/staff");

module.exports = {
    name: "remstaff",
    category: "owner",
    description: "Adds the mentionned user to the Staff list",
    usage: "remstaff <@user>",
    run: async(client, message, args) => {

        let botOwner = message.author.id == '342333088573161472';
        let member = message.mentions.members.first();

        let usage = new MessageEmbed()
            .setColor(process.env.embedcolor)

        if(!botOwner) {
            usage.addField("Unauthorized Access", "Only the \`\`BOT OWNER\`\` can execute this command")
            message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
            return;
        }

        const staffMember = Staff.findOne({
            userID: member.user.id
        })

        await staffMember.deleteOne({
            userID: member.user.id,
        }, (err) => {

            if(err) console.error(err);

        })

        let staff = new MessageEmbed()
        .setColor("RANDOM")
        .setTimestamp() 
        .setFooter("Powered By Xeno", client.user.avatarURL())
        .addField(`Staff Member Removed`, [

            `**• User ID**: ${member.user.id}`,
            `**• Username**: ${member.user.username}`,
            `**• User Tag**: ${member.user.username}${member.user.discriminator}`

        ])

        message.channel.send(staff)

    }
}
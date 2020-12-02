const { MessageEmbed } = require('discord.js');
const Database = require('easy.database');
const db = new Database("staff", "users");

module.exports = {
    name: "addstaff",
    category: "beta commands",
    description: "Add's a member to the Staff list.",
    usage: "addstaff <@member>",
    run: async(client, message, args) => {

        let botOwner = message.author.id == '342333088573161472';
        let staffMember = message.mentions.members.first();

        let usage = new MessageEmbed()
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter("Powered By Xeno", client.user.avatarURL())

        if(!botOwner) {
            usage.addField("Missing Permission", "Only the ``BOT OWNER`` can execute this command")
            message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
            return;
        }

        if(!staffMember) {
            usage.addField("Missing Argument", "Usage: addstaff <@member>")
            message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
            return;
        }

        try {

            db.set(`_staff_${staffMember.user.id}`, staffMember.user.id);
            message.channel.send(`( ${staffMember.user.id} | ${staffMember.user.username}${staffMember.user.tag} ) has successfully been added to the \`\`Staff\`\` list.`);

        } catch(err) {
            
            message.channel.send(`An error occurred: \`\`${err}\`\``)

        }

    }
}
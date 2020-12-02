const { MessageEmbed } = require('discord.js');
const Database = require('easy.database');
const db = new Database("staff", "users");

module.exports = {
    name: "checkstaff",
    category: "beta commands",
    description: "Checks if a user is a Staff member.",
    usage: "checkstaff <@member>",
    run: async(client, message, args) => {

        let botOwner = message.author.id == '342333088573161472';
        let member = message.mentions.members.first();

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

        if(!member) {
            
            usage.addField("Missing Argument", "Usage: checkstaff <@member>")
            message.channel.send(usage)
            .then(msg => (msg.delete({ timeout: 5000 })))
            return;
        }


            if(!db.get(`_staff_${member.user.id}`)) {
                
                message.channel.send(`( ${member.user.id} | ${member.user.username}${member.user.tag} ) is not a \`\`Staff\`\` member.`)
                return;

            } else {

                message.channel.send(`( ${member.user.id} | ${member.user.username}${member.user.tag} ) is a \`\`Staff\`\` member.`)
                return;

            }

    }
}
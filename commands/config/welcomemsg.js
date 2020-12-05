const { MessageEmbed } = require("discord.js");
const mongoose = require("mongoose");
const WelcomeMsg = require("../../models/message");

module.exports = {
    name: "welcomemsg",
    category: "config",
    description: "Set a custom welcome message",
    usage: "welcomemsg <message>",
    note: "\"-\" will be replaced by @member",
    run: async(client, message, args) => {

        let wMessage = args.join(' ');

        let usage = new MessageEmbed()
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter("Powered By Xeno", client.user.avatarURL())

        if(!message.member.hasPermission("MANAGE_GUILD")) {
            usage.addField("Missing Permission", "Only users with the \`\`MANAGE_GUILD\`\` permssion can use this command.")
            message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
            return;
        }

        if(!wMessage) {
            usage.addField("Missing Welcome Message", "Usage: welcomemsg <message>")
            message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
            return;
        }

        WelcomeMsg.findOne({

            guildID: message.guild.id

        }, async (err, welcomemsg) => {

            if(err) console.error(err);

            if(!welcomemsg) {

                const newGuild = new WelcomeMsg({

                    _id: mongoose.Types.ObjectId(),
                    guildID: message.guild.id,
                    welcomemsg: wMessage,
                    goodbyemsg: null

                }) 

                newGuild.save()
                .then(result => console.log(result))
                .catch(err => console.err(err))

                return message.channel.send(`Welcome message has been set to: \`\`${wMessage}\`\`.`)
            
            } else {

                welcomemsg.updateOne({

                    welcomemsg: wMessage

                })
                .then(result => console.log(result))
                .catch(err => console.error(err))

                return message.channel.send(`Welcome message has been updated to: \`\`${wMessage}\`\`.`)

            }
    
        })
        
    }
}

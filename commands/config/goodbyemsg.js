const { MessageEmbed } = require("discord.js");
const mongoose = require("mongoose");
const GoodbyeMsg = require("../../models/message");

module.exports = {
    name: "goodbyemsg",
    category: "config",
    description: "Set a custom goodbye message",
    usage: "goodbyemsg <message>",
    note: "\"-\" will be replaced by @member",
    run: async(client, message, args) => {

        let gMessage = args.join(' ');

        let usage = new MessageEmbed()
            .setColor(process.env.embedcolor)

        if(!message.member.hasPermission("MANAGE_GUILD")) {
            usage.addField("Missing Permission", "Only users with the \`\`MANAGE_GUILD\`\` permssion can use this command.")
            message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
            return;
        }

        if(!gMessage) {
            usage.addField("Missing Welcome Message", "Usage: goodbye <message>")
            message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
            return;
        }

        GoodbyeMsg.findOne({

            guildID: message.guild.id

        }, async (err, goodbyemsg) => {

            if(err) console.error(err);

            if(!goodbyemsg) {

                const newGuild = new GoodbyeMsg({

                    _id: mongoose.Types.ObjectId(),
                    guildID: message.guild.id,
                    welcomemsg: null,
                    goodbyemsg: gMessage

                }) 

                newGuild.save()
                .then(result => console.log(result))
                .catch(err => console.err(err))

                return message.channel.send(`Welcome message has been set to: \`\`${gMessage}\`\`.`)
            
            } else {

                goodbyemsg.updateOne({

                    goodbyemsg: gMessage

                })
                .then(result => console.log(result))
                .catch(err => console.error(err))

                return message.channel.send(`Welcome message has been updated to: \`\`${gMessage}\`\`.`)

            }
    
        })
        
    }
}

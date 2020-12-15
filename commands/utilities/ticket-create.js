const { MessageEmbed } = require("discord.js");
const mongoose = require("mongoose");
const Guild = require("../../models/guild");
let config = require("../../config.json");

module.exports = {
    name: "ticket-create",
    category: "utilities",
    description: "Creates a ticket",
    usage: "cticker",
    run: async(client, message, args) => {

        try {
            message.delete()
        } catch(err) {
            console.error(err)
        }

        let guildDB = Guild.findOne({ 
            
            guildID: message.guild.id

        }, (err, guild) => {

            if(err) console.error(err);

            if(!guild) {

                const newGuild = new Guild({

                    _id: mongoose.Types.ObjectId(),
                    guildId: message.guild.id,
                    guildName: message.guild.name,
                    prefix: config.PREFIX,
                    ticketCount: 1
    
                })
    
                newGuild.save() 
                .then(result => console.log(result))
                .catch(err => console.log(err)) 
                console.log("new")

            } else {

                guild.updateOne({

                    ticketCount: guild.ticketCount + 1
                    
                })
                .then(result => console.log(result))
                console.log("update")

            }

        })

        let count = await Guild.findOne({

            guildID: message.guild.id
           
        })

        let embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter("Powered By Xeno", client.user.avatarURL())
        .setDescription('Thanks you for creating a ticket!\nSupport will be with you shortly\n\`\`xt!ticket-close\`\` if you wish to close this ticket')

        message.guild.channels.create(
            `ticket-${count.ticketCount}`, {
                type: 'text',
                permissionOverwrites: [

                    {
                        allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
                        id: message.author.id
                    },
                    {
                        deny: ["VIEW_CHANNEL", "SEND_MESSAGES"],
                        id: message.guild.id
                    }

                ]

            }
        )
        .then(channel => channel.send(embed))

    }
} 
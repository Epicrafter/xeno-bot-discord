const { MessageEmbed } = require("discord.js");
const mongoose = require("mongoose");
const Ticket = require("../../models/ticket");
let config = require("../../config.json");

const used = new Map();
const Duration = require("humanize-duration");

module.exports = {
    name: "ticket-create",
    category: "utilities",
    description: "Creates a ticket",
    usage: "ticket-create",
    run: async(client, message, args) => {

        try {
            message.delete()
        } catch(err) {
            console.error(err)
        }

        let cooldown = used.get(message.author.id);

        if(cooldown && !message.member.hasPermission("MANAGE_MESSAGES")) {

            const remaining = Duration(cooldown - Date.now(), { units: ['h', 'm', 's'], round: true })
            return message.channel.send(`You need to wait ${remaining} before using this command again.`)
                .catch(err => console.error(err))

        } else {

            used.set(message.author.id, Date.now() + 3600000);
            setTimeout(() => {
                used.delete(message.author.id)
            }, 3600000)

        }



        Ticket.findOne({

            guildID: message.guild.id

        }, (err, ticket) => {

            if(err) console.error(err);

            if(!ticket) {

                const newTicket = new Ticket({

                    _id: mongoose.Types.ObjectId(),
                    guildID: message.guild.id,
                    ticketCount: 1

                })

                newTicket.save()
                    .then(result => console.log(result))
                    .catch(err => console.log(err))
                console.log("new")

                return message.channel.send(`This server was not in our database! Please retype this command.`)
                    .then(msg => {msg.delete({ timeout: 10000 })})

            } else {

                ticket.updateOne({

                    ticketCount: ticket.ticketCount + 1

                })
                    .then(result => console.log(result))
                console.log("update")

            }

        })

        let count = await Ticket.findOne({

            guildID: message.guild.id

        })

        let embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter("Powered By Xeno", client.user.avatarURL())
            .setDescription(`Thanks you for creating a ticket!\nSupport will be with you shortly\n\`\`x!ticket-close\`\` if you wish to close this ticket`)

        let mention = `<@${message.author.id}>`;

        let createdChannel = await message.guild.channels.create(
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


        client.channels.cache.get(createdChannel.id).send(mention)
            .then(msg => {msg.delete({ timeout: 1000 })})
        client.channels.cache.get(createdChannel.id).send(embed)

    }
} 
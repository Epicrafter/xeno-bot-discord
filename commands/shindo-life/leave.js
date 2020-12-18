const { MessageEmbed } = require("discord.js");
const mongoose = require("mongoose");
const Shindo = require("../../models/shindo-life");

module.exports = {
    name: "leave",
    category: "shindo-life",
    descritpion: "Sert a quitter un pays",
    usage: "leave",
    run: async(client, message, args) => {

        try {
            message.delete()
        } catch(err) {
            console.error(err)
        }

        await Shindo.findOne({

            userID: message.author.id

        }, async (err, shindo) => {

            if(err) console.error(err);

            if(!shindo) {

                let newShindo = new Shindo({

                    userID: message.author.id,
                    village: null,
                    clan: null,
                    villageID: null,
                    clanID: null

                })

                newShindo.save()
                    .then(result => console.log(result))
                    .catch(err => console.log(err))

            }

        })

        const village = await Shindo.findOne({

            userID: message.author.id

        })

        let usage = new MessageEmbed()
            .setColor(process.env.embedcolor)

        const roleID = village.villageID;
        let role = message.guild.roles.cache.find(role => role.id == roleID);

        if(!role) {
            usage.setDescription("Vous n'apartenez a aucun village. Si vous souhaitez en rejoindre un, veuilliez utiliser cette commande: join <konoha|suna|iwa|kumo|kiri>")
            message.channel.send(usage)
                .then(msg => {msg.delete({ timeout: 5000 })})
            return;
        }

        message.member.roles.remove(role)

        let typo;
        if(village.village === 'iwa') typo = 'd\'';
        if(village.village === 'konoha' || args[0] === 'suna' || args[0] === 'kumo' || args[0] === 'kiri') typo = 'de';

        let embed = new MessageEmbed()
            .setColor("363940")
            .setAuthor(`Vous avez quitté le village ${typo} ${village.village}`, message.author.displayAvatarURL({ format: 'png', dynamic: true}))

        message.channel.send(embed)

    }
}
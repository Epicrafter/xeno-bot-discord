const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "status",
    category: "info",
    description: "Returns the status of a specified user",
    usage: "status [@user]",
    run: async(client, message, args) => {

        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.member;

        if (!user.presence.activities.length) {
            const sembed = new MessageEmbed()
                .setAuthor(user.user.username, user.user.displayAvatarURL({ dynamic: true }))
                .setColor("GREEN")
                .setThumbnail(user.user.displayAvatarURL())
                .addField("**No Status**", 'This user does not have any custom status!')
                .setFooter("Powered By Xeno", client.user.avatarURL({ dynamic: true }))
                .setTimestamp()
            message.channel.send(sembed)
            return undefined;
        }

        user.presence.activities.forEach((activity) => {

            if (activity.type === 'PLAYING') {

                let name1 = activity.name;
                let details1 = activity.details;
                let state1 = activity.state;
                let image = user.user.displayAvatarURL({ dynamic: true });

                const sembed = new MessageEmbed()
                    .setAuthor(`${user.user.username}'s Activity`, image)
                    .setColor("RANDOM")
                    .addField("**Type**", "Playing", true)
                    .addField("**App**", `${name1}`, true)
                    .addField("**Details**", `${details1 || "No Details"}`)
                    .addField("**Working on**", `${state1 || "No Details"}`)
                    .setFooter("Powered By Xeno", client.user.avatarURL({ dynamic: true }))

                message.channel.send(sembed);

            } else if (activity.type === 'LISTENING' && activity.name === 'Spotify' && activity.assets !== null) {

                let trackIMG = `https://i.scdn.co/image/${activity.assets.largeImage.slice(8)}`;
                let trackURL = `https://open.spotify.com/track/${activity.syncID}`;

                let trackName = activity.details;
                let trackAuthor = activity.state;
                let trackAlbum = activity.assets.largeText;

                trackAuthor = trackAuthor.replace(/;/g, ",")

                const embed = new MessageEmbed()
                    .setAuthor('Spotify Track Info', 'https://cdn.discordapp.com/emojis/408668371039682560.png')
                    .setColor("GREEN")
                    .setThumbnail(trackIMG)
                    .addField('Song Name', trackName, true)
                    .addField('Album', trackAlbum, true)
                    .addField('Author', trackAuthor, false)
                    .addField('Listen to Track', `[\`${trackURL}\`](trackURL)`, true)
                    .setFooter("Powered By Xeno", client.user.avatarURL({ dynamic: true }))

                message.channel.send(embed);

            }
        })
    
}}


const { MessageEmbed } = require("discord.js");
const get = require("request-promise-native");

module.exports = {
    name: "anime",
    category: "fun",
    description: "Returns information about an anime",
    usage: "anime <anime>",
    run: async (client, message, args) => {

        let anime = args.join(' ');

        let option = {
            url: `https://kitsu.io/api/edge/anime?filter[text]=${anime}`,
            method: `GET`,
            headers: {
              'Content-Type': "application/vnd.api+json",
              'Accept': "application/vnd.api+json"
      
            },
            json: true
          }

        let usage = new MessageEmbed()
            .setColor(process.env.embedcolor)
        
        if(!anime) {
            usage.addField("Missing Anime Name", "Usage: anime <anime>")
            message.channel.send(usage)
                .then(msg => {msg.delete({ timeout: 5000 })})
            return;
        }

        get(option).then(body => {

            try {

                let embed = new MessageEmbed()
                .setColor("RANDOM")
                .setTimestamp()
                .setFooter("Powered By Xeno", client.user.avatarURL())
                .setDescription(body.data[0].attributes.synopsis)
                .setThumbnail(body.data[0].attributes.posterImage.original)
                .addField("Ratings:", body.data[0].attributes.averageRating, true)
                .addField("Total episodes:", body.data[0].attributes.episodeCount, true)
                .setImage(body.data[0].attributes.coverImage.original)

            message.channel.send(embed)

            } catch (err) {

                if(err) message.channel.send("I was unable to find this anime")

            }

        })

    }
}
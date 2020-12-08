const { Message, MessageEmbed } = require('discord.js');
const giphy = require('giphy-api')("vjU03D8UkS9I2XyURKX4SWiq6DxkCyvM");

module.exports = {
    name: "gif",
    category: "fun",
    description: "Returns a gif with the selected theme",
    usage: "gif <gif theme>",
    run: async (client, message, args) => {

        message.delete();

        let gif = args.join(" ");

        let usage = new MessageEmbed()
        .setColor("RANDOM")
        .addField("Missing Gif", "Usage: gif <gif>")

        if(!gif) {
            return message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })});
        }

        giphy.search(gif, function (err, res){
            if(err) console.log(err);

            let id = res.data[0].id
            let image = `https://media.giphy.com/media/${id}/giphy.gif`

            let gifEmbed = new MessageEmbed()
            .setColor("RANDOM")
            .setImage(image)
            .setTimestamp()
            .setFooter("Powered By Xeno", `${client.user.avatarURL()}`)

            message.channel.send(gifEmbed);

        });

    }
}
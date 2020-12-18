const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "among-us",
    category: "games",
    description: "An easier way to play Among Us with your friends",
    usage: "among-us <region> <code>",
    run: async(client, message, args) => {

        try {
            message.delete()
        } catch(err) {
            console.error(err)
        }

        let region = args[0];
        let code = args[1];

        let usage = new MessageEmbed()
            .setColor(process.env.embedcolor)

        if(!region) {
            usage.addField("Missing Server Region", "Please specify a region ['EU', 'NA', 'ASIA']\nUsage: among-us <region> <code>")
            message.channel.send(usage)
                .then(msg => {msg.delete({ timeout: 5000 })})
            return;
        }

        if(!code) {
            usage.addField("Missing Game Code", "Please specify the game code\nUsage: among-us <region> <code>")
            message.channel.send(usage)
                .then(msg => {msg.delete({ timeout: 5000})})
            return;
        }

        if(region != 'EU' && region != 'NA' && region != 'ASIA') {
            usage.addField("Invalid Server Region", "Please specify a valid game region ['EU', 'NA', 'ASIA']\nUsage: among-us <region> <code>")
            message.channel.send(usage)
                .then(msg => {msg.delete({ timeout: 5000 })})
            return;
        }

        if(code.length > 6) {
            usage.addField("Invalid Game Code", "The game code you provided contains more than 6 digits\nUsage: among-us <region> <code>")
            message.channel.send(usage)
                .then(msg => {msg.delete({ timeout: 5000})})
            return;
        }

        if(code.length < 6) {
            usage.addField("Invalid Game Code", "The game code you provided contains less than 6 digits\nUsage: among-us <region> <code>")
            message.channel.send(usage)
                .then(msg => {msg.delete({ timeout: 5000})})
            return;
        }

        let categoryID = message.guild.channels.cache.find(channel => channel.name === 'Among Us');

        if(!categoryID) {

            message.guild.channels.create(`Among Us`, { type: 'category' })
            usage.addField('Missing "Among Us" category', "I couldn't find a category named \"Among Us\". I have created one for you, please retype this command.")
            message.channel.send(usage)
                .then(msg => {msg.delete({ timeout: 20000 })})
            return;

        }

        const joinChannel = await message.guild.channels.create(`Among Us - ${code}`, { type: 'voice', userLimit: 10, parent: categoryID.id })

        const amongus = new MessageEmbed()
            .setColor("363940")
            .setAuthor(`${message.author.username} create a new Among Us game`, message.author.displayAvatarURL({ format: 'jpg' }))
            .setThumbnail('https://i.imgur.com/hwa0u7B.png')
            .setDescription(`**Region**: ${region}\n**Code**: ${code}\n**Voice Channel**: Among Us - ${code}`)

        message.channel.send(amongus)

    }
}
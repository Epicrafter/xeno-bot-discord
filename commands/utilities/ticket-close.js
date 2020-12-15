const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "ticket-close",
    category: "utilities",
    description: "Closes a ticket",
    usage: "ticket-close",
    run: async(client, message, args) => {

        const thisChannel = message.channel.name;
        const deleteChannel = message.guild.channels.cache.find(r => r.name === thisChannel);

        message.channel.send(`This ticket channel will be soon deleted!`)

        setTimeout(() => {
            deleteChannel.delete()
        }, 10000)

    }
}
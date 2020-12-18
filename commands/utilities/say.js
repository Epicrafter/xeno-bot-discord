const { Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: "say",
    category: "utility",
    description: "Make the bot say something",
    usage: "say <message>",
    run: async (client, message, args) => {

        message.delete();

        let say = args.join(" ");

        let usage = new MessageEmbed()
            .setColor(process.env.embedcolor)

        if(!say) {
            usage.addField("Missing Message", "Usage: say <message>")
            message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
            return;
        }

        message.channel.send(say);

    }
} 

const { MessageEmbed } = require("discord.js");
const Duration = require("humanize-duration");

module.exports = {
    name: "lock",
    category: "moderation",
    descritpion: "Locks a channel down",
    usage: "lock <#channel> [time]",
    run: async(client, message, args) => {

        try {
            message.delete()
        } catch(err) {
            console.error(err)
        }

        let channel = message.mentions.channels.first();
        let time = args[1];

        let usage = new MessageEmbed()
            .setColor(process.env.embedcolor)

        if(!message.member.hasPermission("MANAGE_CHANNELS")) {
            usage.addField("Missing Permission", "Only users with the \`\`MANAGE_MESSAGES\`\` permission can use this command")
            message.channel.send(usage)
                .then(msg => {msg.delete({ timeout: 5000 })})
            return;
        }

        if(!channel) {
            usage.addField("Missing Channel", "Usage: lock <#channel>")
            message.channel.send(usage)
                .then(msg => {msg.delete({ timeout: 5000 })})
            return;
        }

        let toLock = client.channels.cache.get(channel.id);

        toLock.updateOverwrite(channel.guild.roles.everyone, { SEND_MESSAGES: false });

        let lockMessage;
        let lockdoneTime = Duration(time, { units: ['h', 'm', 's', 'ms'], round: true })
        let toDeleteTime;

        if(time) lockMessage = `🔒 This channel has been locked down for ${lockdoneTime}`, toDeleteTime = time;
        if(!time) lockMessage = `🔒 This channel has been locked down for an undertimed duration.`, toDeleteTime = 259200000;

        message.channel.send(`🔒 You have successfully locked down <#${channel.id}>.`)
            .then(msg => {msg.delete({ timeout: 5000 })})
        toLock.send(lockMessage)
            .then(msg => {msg.delete({ timeout: toDeleteTime })})

        if(time) {

            setTimeout((msg) => {

                toLock.updateOverwrite(channel.guild.roles.everyone, { SEND_MESSAGES: true });

            }, time)

        }

    }
}
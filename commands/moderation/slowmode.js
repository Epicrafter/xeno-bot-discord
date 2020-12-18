const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "slowmode",
    category: "moderation",
    description: "Changes the slowmode duration for this channel",
    usage: "slowmode <duration> <reason>",
    run: async(client, message, args) => {

        try {
            message.delete()
        } catch(err) {
            console.error(err)
        }

        let channel = message.channel;
        let duration = args[0];
        let reason  = args.slice(1).join(' ');

        if(duration === 'off') {
            duration = 0;
        }

        let usage = new MessageEmbed()
            .setColor(process.env.embedcolor)


        if(!message.member.hasPermission("MANAGE_CHANNELS")) {
            usage.addField("Missing Permission", "Only users with the \`\`MANAGE_CHANNELS\`\` permission can use this command")
            message.channel.send(usage)
                .then(msg => {msg.delete({ timeout: 5000 })})
            return;
        }

        if(!args[0]) {
            usage.addField("Missing Slowmode Duration", "Please provide either a number or the word \"off\"\nUsage: slowmode <duration> <reason>")
            message.channel.send(usage)
                .then(msg => {msg.delete({ timeout: 5000 })})
            return;
        }

        if(!args[1]) {
            usage.addField("Missing Reason", "Please provide a reason\nUsage: slowmode <duration> <reason>")
            message.channel.send(usage)
                .then(msg => {msg.delete({ timeout: 5000 })})
            return;
        }

        if(isNaN(duration)) {
            usage.addField("Invalid Duration", `Please provide either a number or the word \"off\" \n Usage: slowmode <duration> <reason>`)
            message.channel.send(usage)
                .then(msg => {msg.delete({ timeout: 5000 })})
            return;
        }

        channel.setRateLimitPerUser(duration, reason)

        let embed = new MessageEmbed()
            .setColor("363940")
            .setDescription(`The slowmode for this channel has been set to ${duration}`)

        message.channel.send(embed)

    }
}
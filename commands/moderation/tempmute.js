const { MessageEmbed } = require("discord.js");
const ms = require('ms');

module.exports = {
    name: "tempmute",
    category: "moderation",
    description: "Mutes the mentionned user for a specific duration",
    usage: "tempmute <@member> <duration>",
    run: async(client, message, args) => {

        try {
            message.delete();
        } catch(err) {
            console.error(err);
        }

        let member = message.mentions.members.first();
        let time = args[1];
        console.log(member)

        let role = message.guild.roles.cache.find(role => role.name.toLowerCase() === "muted");

        let usage = new MessageEmbed()
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter("Powered By Xeno", client.user.avatarURL())

        if(!message.member.hasPermission("MANAGE_ROLES")) {
            usage.addField("Missing Permission", "Only users with the \`\`MANAGE_ROLES\`\` permission can use this command")
            message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
            return;
        }

        if(!member) {
            usage.addField("Missing Member Mention", "Usage: tempmute <@member> <duration>")
            message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
            return;
        }

        if(member.id === message.author.id) {
            usage.addField("Error", "You can't mute yourself")
            message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
            return;
        }

        if(!time) {
            usage.addField("Missing Mute Duration", "Usage: tempmute <@member> <duration>")
            message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
            return;
        }

        if(!role) {

            try {

                message.channel.send(`Muted role was not found, attempting to create muted role.`)

                let muterole = await message.guild.roles.create({

                    data: {
                        name: 'muted',
                        permissions: []
                    }

                });

                message.guild.channels.cache.filter(c => c.type === 'text').forEach(async (channel, id) => {

                    await channel.createOverwrite(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    })

                });

                message.channel.send(`Muted role has been successfully created.`)

            } catch(err) {

                console.error(err)

            }

        }

        let muted = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted');
        
        if(member.roles.cache.has(muted.id)) return message.channel.send(`**${member.user.username}** is already muted.`)
        await member.roles.add(muted);

        let avatar = member.user.displayAvatarURL({ format: 'jpg', dynamic: true, size: 1024 });

        member.user.send(`You've been **muted** in **${message.guild.name}**\n **Duration:** ${time}`);

        let muteEmbed = new MessageEmbed()
        .setColor("#363940")
        .setAuthor(`${member.user.username}#${member.user.discriminator} has been muted`, avatar)
        .setDescription(`**Duration**: ${time}`)

        message.channel.send(muteEmbed)

        let unmuteEmbed = new MessageEmbed()
        .setColor("#363940")
        .setAuthor(`${member.user.username}#${member.user.discriminator} has been unmuted`, avatar)

        setTimeout(async () => {

            await member.roles.remove(muted)
            member.user.send(`You've been **unmuted** in **${message.guild.name}**`)
            message.channel.send(unmuteEmbed)

        }, ms(time))

    }
}
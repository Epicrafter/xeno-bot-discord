const {  MessageEmbed } = require('discord.js');
const fetch = require("node-fetch");

module.exports = {
    name: "instagram",
    category: "info",
    description: "Returns some information about a Instagram profile",
    usage: "instagram <profile>",
    run: async (client, message, args) => {

        message.channel.send("Sorry this command is temporarily disabled")

        /*const name = args.join(" ");

        let usage = new MessageEmbed()
        .setColor("RANDOM")
        .addField("Missing Profile Name", "Usage: instagram <profile>")

        if(!name) {
            return message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
        }

        const url = `https://www.instagram.com/${name}/?__a=1`;
        const res = await fetch(url).then(url => url.json());

        if(!res.graphql ) {
            return message.channel.send("I coudn't find that user.")
            .then(msg => {msg.delete({ timeout: 5000 })})
        }

        console.log(res)

        const account = res.graphql.user;


        let instaEmbed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${account.full_name}'s Instagram Profile`)
        .setURL(`https://www.instagram.com/${name}/`)
        .setThumbnail(account.profile_pic_url_hd)
        .setTimestamp()
        .setFooter("Powered By Xeno", `${client.user.avatarURL()}`)
        .addFields(
            {
                name: "Full Name:",
                value: account.full_name,
                inline: true
            },
            {
                name: "Username:",
                value: account.username,
                inline: true
            },
            {
                name: "Biography:",
                value: `${account.biography.length == 0 ? "none" : account.biography}`,
                inline: false
            },
            {
                name: "Posts:",
                value: account.edge_owner_to_timeline_media.count.toLocaleString(),
                inline: true
            },
            {
                name: "Followers:",
                value: account.edge_followed_by.count.toLocaleString(),
                inline: true
            },
            {
                name: "Following:",
                value: account.edge_follow.count.toLocaleString(),
                inline: true
            }
        )

        message.channel.send(instaEmbed);*/
    }
}
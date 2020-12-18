const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "autorole",
    category: "shindo-life",
    descritpion: "",
    usage: "autorole",
    run: async (client, message, args) => {

        try {
            message.delete()
        } catch(err) {
            console.error(err)
        }

        let usage = new MessageEmbed()
            .setColor(process.env.embedcolor)

        if(!message.member.hasPermission("MANAGE_GUILD")) {
            usage.addField("Missing Permission", "Only users with the \`\`MANAGE_GUILD\`\` permission can use this command")
            message.channel.send(usage)
                .then(msg => {msg.delete({ timeout: 5000 })})
            return;
        }

        let roles = [
            "Mention De Grind",
            "Mention De Scroll",
            "Mention De Code"
        ];

        let grindRole = message.guild.roles.cache.find(role => role.name === 'Mention De Grind');
        let scrollRole = message.guild.roles.cache.find(role => role.name === 'Mention De Scroll');
        let codeRole = message.guild.roles.cache.find(role => role.name === 'Mention De Code');

        let grindEmbed = new MessageEmbed()
            .setColor("#363940")
            .setTitle(`${roles[0]} - 🌾`)
            .setDescription(`La mention grind permet d'etre informé quand des gens vont farmer in-game afin d'y participer aussi`)

        let scrollEmbed = new MessageEmbed()
            .setColor("#363940")
            .setTitle(`${roles[1]} - 📜`)
            .setDescription(`La mention Scroll permet d'être informé quand des gens ont trouvés des scroll et qu'ils les drop dans un chat`)

        let codeEmbed = new MessageEmbed()
            .setColor("#363940")
            .setTitle(`${roles[2]} - 🔑`)
            .setDescription(`La mention Code permet d'etre informé quand un nouveau code donnant des spins arrive`)

        message.channel.send(grindEmbed)
        message.channel.send(scrollEmbed)
        message.channel.send(codeEmbed)
            .then(message => {
                message.react('🌾').then(r => {
                    message.react('📜').then(r => {
                        message.react('🔑')
                    })
                })
            })

    }
}
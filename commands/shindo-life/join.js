const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "join",
    category: "shindo-life",
    description: "Sert a rejoindre un pays",
    usage: "join <konoha|suna|iwa|kumo|kiri>",
    run: async(client, message, args) => {

        try {
            message.delete()
        } catch(err) {
            console.error(err)
        }

        let village = args[0].toLowerCase();

        let usage = new MessageEmbed()
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter("Powered By Xeno", client.user.avatarURL())

        if(!village) {
            usage.addField("Nom du village manquant", "Usage: join <konoha|suna|iwa|kumo|kiri>")
            message.channel.send(usage)
                .then(msg => {msg.delete({ timeout: 5000 })})
            return;
        }

        if(village != 'konoha' && village != 'suna' && village != 'iwa' && village != 'kumo' && village != 'kiri') {
            usage.addField("Ce village n'existe pas", "Usage: join <konoha|suna|iwa|kumo|kiri>")
            message.channel.send(usage)
                .then(msg => {msg.delete({ timeout: 5000 })})
            return;
        }

        let typo;
        if(args[0] === 'iwa') typo = 'd\'';
        if(args[0] === 'konoha' || args[0] === 'suna' || args[0] === 'kumo' || args[0] === 'kiri') typo = 'de';

        let role = message.guild.roles.cache.find(role => role.name === village)
        if(message.member.roles.cache.some(role => role.name === "konoha" || role.name === "suna" || role.name === "iwa" || role.name === "kumo" || role.name === "kiri")) {

            let already = new MessageEmbed()
                .setColor("RANDOM")
                .setTimestamp()
                .setFooter("Powered By Xeno", client.user.avatarURL())
                .setDescription(`Vous apartenez deja a un village. Si vous souhaitez quitter ce village, veuilliez utiliser cette commande: \`\`x!leave <konoha|suna|iwa|kumo|kiri>\`\``)

            message.channel.send(already)
            return

        }

        message.member.roles.add(role)

        let embed = new MessageEmbed()
            .setColor("363940")
            .setAuthor(`Vous avez rejoint le village ${typo} ${args[0]}`, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))

        message.channel.send(embed)

    }
}

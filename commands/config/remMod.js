const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "remmod",
    category: "config",
    description: "Removes a user from the ``Only Staff`` list.",
    usage: "remmod <user id>",
    run: async(client, message, args) => {

        let id = args[0];
        let isBotOwner = message.author.id == '342333088573161472';

        let usage = new MessageEmbed()
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter("Powered By Xeno", client.user.avatarURL())

        if(!isBotOwner) {
            usage.addField("Missing Permissions", "Only the ``Bot Owner`` can execute this command")
            return message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
        } 
        
        if(!id) {
            usage.addField("Missing ID", "Usage: remmod <user id>") 
            return message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })});
        }

        if(isNaN(id)) {
            usage.addField("Error", "This id is not a number")
            return message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
        }

        db.set(`_mod_${id}`, id);
        message.channel.send(`<@${id}> has been removed from the \`\`Only Staff\`\` list.`)

    }
}
const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "addmod",
    category: "config",
    description: "This command will add a user to the ``Only Staff`` list.",
    usage: "addmod <user id>",
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
            usage.addField("Missing ID", "Usage: addmod <user id>") 
            return message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })});
        }

        if(isNaN(id)) {
            usage.addField("Error", "This id is not a number")
            return message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
        }

        db.set(`_mod_${id}`, id);
        message.channel.send(`<@${id}> has been added to the \`\`Only Staff\`\` list.`)

    }
}
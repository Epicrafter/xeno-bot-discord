const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "setrule",
    category: "config",
    description: "Adds a rule on the ``Shindo Life`` server.",
    usage: "setrule <rule number> <rule>",
    run: async(client, message, args) => {

        let ruleNum = args[0];
        let rule = args.slice(1).join(' ');
        let server = message.guild.id == '376414393249824778'; 

        let usage = new MessageEmbed()
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter("Powered By Xeno", client.user.avatarURL())

        if(!db.get(`_mod_${message.author.id}`)) {
            usage.addField("Missing Permission", "Only ``Only Staff`` members can use this command")
            return message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
        }   

        if(!server) {
            usage.addField("Unauthorized Access", "Only the ``Shindo Life`` server has access to this command")
            return message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
        }

        if(!ruleNum) {
            usage.addField("Missing Rule Number", "Usage: setrule <rule number> <rule>")
            message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })});
        } else if(!rule) {
            usage.addField("Missing Rule", "Usage: setrule <rule number> <rule>")
            message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
        } else {

            let oldRule = db.get(`_article_${ruleNum}`);
        
            let newRule = new MessageEmbed()
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter("Powered By Xeno", client.user.avatarURL())

            if(!db.get(`_article_${ruleNum}`)) {

                newRule
                .addField(`Rule #${ruleNum} has been set too:`, `\`\`\`${rule}\`\`\``)

                db.set(`_article_${ruleNum}`, rule);
                message.channel.send(newRule)

            } else if(db.get(`_article_${ruleNum}`)) {

                newRule
                .addFields(
                    {
                        name: `Rule #${ruleNum} has been updated from:`,
                        value: `\`\`\`${oldRule}\`\`\``,
                        inline: false
                    },
                    {
                        name: `To:`,
                        value: `\`\`\`${rule}\`\`\``,
                        inline: false
                    }
                )

                db.set(`_article_${ruleNum}`, rule);
                message.channel.send(newRule)

            }

        }

    }
}
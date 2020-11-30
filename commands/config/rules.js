const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "rules",
    run: async (client, message, args) => {

        let rule1 = db.get(`_article_1`);
        let rule2 = db.get(`_article_2`);
        let rule3 = db.get(`_article_3`);
        let rule4 = db.get(`_article_4`);
        let rule5 = db.get(`_article_5`);
        let rule6 = db.get(`_article_6`);
        let rule7 = db.get(`_article_7`);

        let server = message.guild.id == '732592546068430939'; 

        let usage = new MessageEmbed()
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter("Powered By Xeno", client.user.avatarURL())

        if(message.guild.id != server) {
            usage.addField("Unauthorized Access", "Only the ``Shindo Life`` server has access to this command")
            return message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
        }

        if(!args[0]) { 

            let embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter("Powered By Xeno", client.user.avatarURL())
            .setImage(`https://i.imgur.com/bUdmJ6x.png`)
            .addFields(
                {
                    name: `Article 1. Le respect et la courtoisie`,
                    value: rule1,
                    inline: false
                },
                {
                    name: `Article 2. Les images`,
                    value: rule2,
                    inline: false
                },
                {
                    name: `Article 3. Le langage`,
                    value: rule3,
                    inline: false
                },
                {
                    name: `Article 4. Les mentions`,
                    value: rule4,
                    inline: false
                },
                {
                    name: `Article 5. Les publicités`,
                    value: rule5,
                    inline: false
                },
                {
                    name: `Article 6. La vie privée`,
                    value: rule6,
                    inline: false
                },
                {
                    name: `Article 7. L’audio`,
                    value: rule7,
                    inline: false
                }
            )

            message.channel.send(embed)

        } else {    

            let title;
            let image;
            let article = db.get(`_article_${args[0]}`)

            if(args[0] === '1') title = 'Article 1. Le respect et la courtoisie';
            if(args[0] === '2') title = 'Article 2. Les images';
            if(args[0] === '3') title = 'Article 3. Le langage';
            if(args[0] === '4') title = 'Article 4. Les mentions';
            if(args[0] === '5') title = 'Article 5. Les publicités';
            if(args[0] === '6') title = 'Article 6. La vie privée';
            if(args[0] === '7') title = 'Article 7. L\'audio';

            if(args[0] === '1') image = 'https://i.imgur.com/5z9d1Tr.png';
            if(args[0] === '2') image = 'https://i.imgur.com/8X6lGXy.png';
            if(args[0] === '3') image = 'https://i.imgur.com/wfuTUu8.png';
            if(args[0] === '4') image = 'https://i.imgur.com/lXX6V7a.png';
            if(args[0] === '5') image = 'https://i.imgur.com/4Hpy9XE.png';
            if(args[0] === '6') image = 'https://i.imgur.com/hfbgZD6.png';
            if(args[0] === '7') image = 'https://i.imgur.com/GxrJ1r2.png';

            let usage = new MessageEmbed()
            .setColor("Random")
            .setTimestamp()
            .setFooter("Powered By Xeno", client.user.avatarURL())

            if(isNaN(args[0])) {
                
                usage.addField(`Error:`, `This is not a number`)
                message.channel.send(usage)
                .then(msg => {msg.delete({ timeout: 5000 })})

            }

            let rule = new MessageEmbed()
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter("Powered By Xeno", client.user.avatarURL())
            .addField(title, article)
            .setImage(image)

            message.channel.send(rule)

        }

    }
}
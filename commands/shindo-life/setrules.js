const { MessageEmbed } = require("discord.js");
const mongoose = require("mongoose");
const Rules = require("../../models/rules");
const Staff = require("../../models/staff");

module.exports = {
    name: "setrule",
    category: "shindo",
    description: "Updates/Adds a rule to the Shindo Life server",
    usage: "setrule <rule number> | <rule title> | <rule image> | <rule>",
    run: async(client, message, args) => {

        message.delete();

        let aArguments = args.join(' ');
        let res = aArguments.split('|');

        let usage = new MessageEmbed()
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter("Powered By Xeno", client.user.avatarURL())

        const checkStaff = Staff.findOne({

            userID: message.author.id

        }, (err, staff) => {

            if(err) console.error(err);
            if(!staff) {

                try { 
                    message.delete(); 
                } catch(err) { 
                    console.error(err) 
                    message.channel.send(`Something went wrong: \`\`${err}\`\``) 
                };

                usage.addField("Missing Permission", "Only \`\`Authorized\`\` members have access to this command.")
                message.channel.send(usage)
                .then(msg => {msg.delete({ timeout: 5000 })})
                return;

            }
        
        })

        if(!res[0]) {
            usage.addField("Missing Rule Number", "Usage: setrule <rule number> | <rule title> | <rule image> | <rule>")
            message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
            return;
        }
        
        if(!res[1]) {
            usage.addField("Missing Rule Title", "Usage: setrule <rule number> | <rule title> | <rule image> | <rule>")
            message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
            return;
        }

        if(!res[2]) {
            usage.addField("Missing Rule Embed Image", "Usage: setrule <rule number> | <rule title> | <rule image> | <rule>")
            message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
            return;
        }

        if(!res[3]) {
            usage.addField("Missing Rule", "Usage: setrule <rule number> | <rule title> | <rule image> | <rule>")
            message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
            return;
        }

        Rules.findOne({

            ruleNumber: res[0]

        }, (err, rules) => {

            if(err) console.error(err);

            if(!rules) {

                const newRule = new Rules({

                    _id: mongoose.Types.ObjectId(),
                    ruleNumber: res[0],
                    ruleTitle: res[1],
                    ruleImage: res[2],
                    rule: res[3]
                    
                })

                newRule.save()
                .then(result => console.log(result))
                .catch(err => console.error(err)) 

            } else {

                Rules.updateOne({
                    ruleTitle: res[1],
                    ruleImage: res[2],
                    rule: res[3]
        
                })

            }

        })

        let embed = new MessageEmbed()  
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter("Powered By Xeno", client.user.avatarURL())
        .addField(`Rule #${res[0]} has been set too:`, `\`\`\`${res[3]}\`\`\``)

        message.channel.send(embed)

    }
}
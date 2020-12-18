const { MessageEmbed } = require("discord.js");
const randomIpv6 = require('random-ipv6');

module.exports = {
    name: "hack",
    category: "bot-owner",
    description: "Hacks a user on the server",
    usage: "hack [@user]",
    run: async (client, message, args) => {


        if(message.deletable) {
            message.delete();
        }

        
        let member = message.mentions.members.first() || message.guild.members.cache.get(userArgs[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === userArgs.slice(0).join(" ") || x.user.username === userArgs[0]) || message.member || message.author;

        function wait(amount){
            return new Promise((resolve, reject)=>{
            setTimeout(()=> { resolve()}, amount * 1000)
            })
       }

       // Generates an email based on the user's username

       let emails = [
        '@gmail.com',
        '@yahoo.com',
        '@outlook.com',
        '@icloud.com',
        '@yandex.com'
        ];
        
        let mUsername = member.user.username;
        let username = await (mUsername.replace(/ /g,''))

        let extension = emails[Math.floor(Math.random() * emails.length)]
        let email = `${username.toLowerCase()}${extension}`;

        // Generates a random password

        let password = Math.random().toString(36).slice(-8);

        // Generate a random IP address

        let ip = (Math.floor(Math.random() * 255) + 1)+"."+(Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255));

        // Generate a random IPv6 address

        let ipv6 = await randomIpv6();

        // Generates a random credit card number

        let cc = Math.floor(100000000000000 + Math.random() * 9000000000000000);

        // Fake tracking messages

        /*message.channel.send(`C:  Users\XenoBot> _`)
        await wait(3);
        message.channel.send(`C:\Users\XenoBot> hack ${member.user.username}`)
        await wait(3);
        message.channel.send(`Obtaining Discord Login Information`)
        await wait(3);
        message.channel.send(`Obtaining IP Address`)
        await wait(3);
        message.channel.send(`Decoding IP Address`)
        await wait(3);
        message.channel.send(`Obtaining IPv6 address`)
        await wait(3);
        message.channel.send(`Decoding IPv6 address`)
        await wait(3);
        message.channel.send(`Obtaining associated credit/debit card`)
        await wait(3);
        message.channel.send(`Reported user for breaking Discord TOS`)
        await wait(3);
        message.channel.send(`Deleted Users Account`)
        await wait(3);
        message.channel.send(`Successfully Hacked ${member.user.username}`)
        await wait(2);
        message.channel.bulkDelete(9, true)*/

        let process = new MessageEmbed()
        .setColor("RANDOM")
        .setDescription("Obtaining Discord Login Information")

        let info = new MessageEmbed()
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter("Powered By Xeno", client.user.avatarURL())
        .addField(`${member.user.username}'s hacked information:`, [
            `\u200b`,
            `**• Email:** ${email}`,
            `**• Password:** ${password}`,
            `**• IP Address:** ${ip}`,
            `**• IPv6 Address:** ${ipv6}`,
            `**• Credit Card Number:** ${cc}`,
            `\u200b`,
            `**• Reported user:** true`,
            `**• Deleted user's account:** true`
        ])

        message.channel.send(process)
        .then(msg => {
            setTimeout(function() {
                msg.edit(process.setDescription("Obtaining IP Address"))
            }, 1000)
            setTimeout(function() {
                msg.edit(process.setDescription("Decoding IP Address"))
            }, 2000)
            setTimeout(function() {
                msg.edit(process.setDescription("Obtaining IPv6 Address"))
            }, 3000)
            setTimeout(function() {
                msg.edit(process.setDescription("Decoding IPv6 Address"))
            }, 4000)
            setTimeout(function() {
                msg.edit(process.setDescription("Obtaining Associated Credit/Debit Card"))
            }, 5000)
            setTimeout(function() {
                msg.edit(process.setDescription("Reported User For Breaking Discord TOS"))
            }, 6000)
            setTimeout(function() {
                msg.edit(process.setDescription("Deleted Users Account"))
            }, 7000)
            setTimeout(function() {
                msg.edit(process.setDescription(`Successfully Hacked ${member.user.username}`))
            }, 8000)
            setTimeout(function() {
                message.channel.send(info)
            }, 9000)
        })

    
}}
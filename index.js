const { Client, Collection, MessageEmbed, MessageAttachment } = require('discord.js');
const { settings } = require('cluster');
const fs = require("fs");

const mongoose = require("mongoose");
const Guild = require("./models/guild");
const config = require("./config.json");
const Message = require("./models/message");

const client = new Client({
    disableEveryone: true
});

client.commands = new Collection();
client.alias = new Collection();
client.categories = fs.readdirSync("./commands/")
client.mongoose = require("./utils/mongoose");

["command"].forEach(handler => {
    require(`./handler/${handler}`)(client);
});

fs.readdir('./events/', (err, files) => {

    if(err) return console.error;

    files.forEach(file => {

        if(!file.endsWith('.js')) return;
        const evt = require(`./events/${file}`);
        let evtName = file.split('.')[0];
        console.log(`Loaded event ${evtName}`);
        client.on(evtName, evt.bind(null, client));

    });

});

client.on("message", async message => {

    if(message.author.bot) return;

    const settings = await Guild.findOne({

        guildID: message.guild.id

    }, (err, guild) => {

        if(err) console.error(err);
        if(!guild) {
            const newGuild = new Guild({

                _id: mongoose.Types.ObjectId(),
                guildID: message.guild.id,
                guildName: message.guild.name,
                prefix: config.PREFIX,
                logChannelID: null,
                welcomeChannelID: null,
                goodbyeChannelID: null,
                welcome: null,
                goodbye: null
                
            })

            newGuild.save()
            .then(result => console.log(result))
            .catch(err => console.error(err))

            return message.channel.send(`This server was not in our database! We have now added it and you should be able to use bot commands.`).then(msg => {msg.delete({ timeout: 10000 })});
        }

    })

    let prefix = settings.prefix;

    if(!message.guild) return;
    if(!message.content.startsWith(prefix)) return;  

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if(cmd.length === 0) return;

    let command = client.commands.get(cmd);
    if(!command) command = client.commands.get(client.aliases.get(cmd));   

    if(command)
    command.run(client, message, args);

})


client.on('ready', () => {

    const activities = [
        `${client.guilds.cache.size} servers!`,
        `${client.channels.cache.size} channels!`,
        `${client.users.cache.size} users!`
    ]

    console.log(`Ready! Connected as ${client.user.username} with prefix x!`);

    let i = 0;

    setInterval(() => {

        client.user.setActivity(`x!help | ${activities[i++ % activities.length]}`, { type: 'WATCHING' })

    }, 15000)

});

client.on("guildMemberAdd", async (member) => {

    const getData = await Guild.findOne({

        guildID: member.guild.id

    }).catch(err => console.error(err));

    const getMessage = await Message.findOne({

        guildID: member.guild.id

    }).catch(err => console.error(err));

    let welcomeChannel = getData.welcomeChannelID;

    let welcomeEmbed = new MessageEmbed()
    .setColor("#55efc4")

    if(getData.welcome === 'on') {

        if(!getMessage.welcomemsg) {

            let welcomemsg = `<@${member.id}> joined the server.`;
            welcomeEmbed.setDescription(welcomemsg)
            client.channels.cache.get(welcomeChannel).send(welcomeEmbed)

        } else {

            let welcomemsg = getMessage.welcomemsg.replace(/-/, `<@${member.id}>`);
            welcomeEmbed.setDescription(welcomemsg)
            client.channels.cache.get(welcomeChannel).send(welcomeEmbed)

        }

    } else if(getData.welcome === 'off'){ 

        return;

    }

    if(member.guild.id == '376414393249824778') {

        let role = member.guild.roles.cache.find(role => role.name.toLowerCase() === "apprenti ninja");
        member.roles.add(role)

    }

})

client.on("guildMemberRemove", async (member) => {

    const getData = await Guild.findOne({

        guildID: member.guild.id

    }).catch(err => console.error(err))

    const getMessage = await Message.findOne({

        guildID: member.guild.id
            
    }).catch(err => console.error(err))

    let goodbyeChannel = getData.goodbyeChannelID;

    let goodbyeEmbed = new MessageEmbed()
    .setColor("#ffeaa7")

    if(getData.goodbye === 'on') {

        if(!getMessage.goodbyemsg) {

            let goodbyemsg = `<@${member.id}> left the server.`;
            goodbyeEmbed.setDescription(goodbyemsg)
            client.channels.cache.get(goodbyeChannel).send(goodbyeEmbed)

        } else {

            console.log(goodbyeChannel)
            let goodbyemsg = getMessage.goodbyemsg.replace(/-/, `<@${member.id}>`);
            goodbyeEmbed.setDescription(goodbyemsg)
            console.log(goodbyemsg)
            client.channels.cache.get(goodbyeChannel).send(goodbyeEmbed)

        }

    } else if(getData.goodbye === 'off') {

        return;

    }

}) 

client.mongoose.init();
client.login(process.env.token);
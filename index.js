const { Client, Collection, MessageEmbed, MessageAttachment } = require('discord.js');
const { settings } = require('cluster');
const fs = require("fs");

const mongoose = require("mongoose");
const Guild = require("./models/guild");
const config = require("./config.json");

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

    if(message.mentions.has('505454012481667072')) {
        return message.channel.send(`My prefix for this server is \`\`${settings.prefix}\`\``)
    }

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

/*client.on("guildMemberAdd", async (member) => {

    if(member.guild.id == '376414393249824778') {

        let wChannel = db.get(`welchannel_${member.guild.id}`);
        let wMessage = db.get(`welcomemsg_${member.guild.id}`);
        let wCustomMessage = wMessage.replace(/-/, `${member.user.username}`);

        const canvas = Canvas.createCanvas(900, 389);
        const ctx = canvas.getContext("2d");

        const background = await Canvas.loadImage("https://i.imgur.com/cufdoc0.jpg");
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height); 

        ctx.font = "25px sans-serif";
        ctx.fillStyle = '#fff';
        ctx.textAlign = "center";
        ctx.fillText(`${wCustomMessage}`, 450, 310);

        ctx.font = "18px sans-serif";
        ctx.fillStyle = "#9e9e9e";
        ctx.textAlign = "center";
        ctx.fillText(`${member.user.tag}`, 450, 340);

        ctx.arc(450, 160, 100, 0, Math.PI * 2, true)
        ctx.lineWidth = 5;
        ctx.strokeStyle = '#fff';
        ctx.stroke();
        ctx.clip();
        const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg', size: 2048, dynamic: true }));
        ctx.drawImage(avatar, 350, 60, 200, 200);

        const attachement = new MessageAttachment(
            canvas.toBuffer(),
            "welcome-image.png"
        )

        client.channels.cache.get(wChannel).send(attachement);

    } else {

        let OnOff = db.get(`welcome_${member.guild.id}`);

        if(OnOff == 'on') {

            let welcomechannel =  db.get(`welchannel_${member.guild.id}`);
            let welcomemsg = db.get(`welcomemsg_${member.guild.id}`);

            let wcustommsg = welcomemsg.replace(/-/, `<@${member.id}>`);

            let embed1 = new MessageEmbed()
            .setColor("#2980b9")
            .setDescription(wcustommsg);
    
            client.channels.cache.get(welcomechannel).send(embed1);

        } else {
            
            return;

        }

    }

})

client.on("guildMemberRemove", (member) => {

    let OnOff = db.get(`goodbye_${member.guild.id}`);

    if(OnOff == 'on') {

        let goodbyechannel = db.get(`goodchannel_${member.guild.id}`);
        let goodbyemsg = db.get(`goodbyemsg_${member.guild.id}`);

        let gcustommsg = goodbyemsg.replace(/-/, `<@${member.id}>`)

        let embed2 = new MessageEmbed()
        .setColor("#c0392b")
        .setDescription(gcustommsg)

        client.channels.cache.get(goodbyechannel).send(embed2)
    
    } else {

        return;

    }

})*/

client.mongoose.init();
client.login(process.env.token);
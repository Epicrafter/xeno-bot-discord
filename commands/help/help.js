const { MessageEmbed } = require("discord.js");
const { string } = require("mathjs");

module.exports = {
    name: "help",
    category: "help",
    description: "Returns all commands, or one specific command info",
    run: async (client, message, args) => {

        let shindoServer = message.guild.id == '376414393249824778';
        let testServer = message.guild.id == '732592546068430939';

        if(args[0]) {
            return getCMD(client, message, args[0])
        } else {
            
            let embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter("Powered By Xeno", client.user.avatarURL())
            .setTitle("Help")
            .setDescription("This is a list of commands you can use. You can get more info about a specific command by using ``help <command>`` ``(e.g. help say)``.")
            .addField("Fun:", "``8ball`` ``advice`` ``anime`` ``asciify`` ``clyde`` ``decrypt`` ``emoji`` ``encrypt`` ``fact`` ``flip`` ``fml`` ``gayrate`` ``hack`` ``howdumb`` ``hug`` ``kill`` ``kiss`` ``lovecalc`` ``meme`` ``morse`` ``oof`` ``pickup`` ``rate`` ``roll`` ``slap`` ``trump`` ``yomama``")
            .addField("Games:", "``sstatus`` ``among-us``")
            .addField("Hypixel:", "``bedwars`` ``skywars`` ``hstatus``")
            .addField("Image Manipulation:", "``achievement`` ``challenge`` ``ph`` ``supreme``")
            .addField("Info:", "``avatar`` ``botinfo`` ``color`` ``corona`` ``length`` ``ping`` ``serverinfo`` ``status`` ``support`` ``userinfo`` ``weather``")
            .addField("Utilities:", "``bugreport`` ``calc`` ``color`` ``dm`` ``gif`` ``bin`` ``report`` ``say`` ``shorten`` ``suggest`` ``ticket-close`` ``ticket-create`` ``translate``")
            .addField("Moderation:", "``announce`` ``ban`` ``kick`` ``lock`` ``mute`` ``purge`` ``resetwarns`` ``slowmode`` ``tempmute`` ``unmute`` ``unlock`` ``warn`` ``warnings``")
            .addField("Configuration:", "``goodbye`` ``goodbyemsg`` ``setleave`` ``setlog`` ``setprefix`` ``setwelcome`` ``welcome`` ``welcomemsg``")
            .addField("Bot Owner:", "``addstaff`` ``checkstaff`` ``eval`` ``remstaff`` ``setgame`` ``spam`` ``stop``")

            if(shindoServer) {
                embed.addField("Shindo Life:", "``autorole`` ``code`` ``join`` ``leave`` ``rules`` ``setrule``")
            }

            if(testServer) {
                embed.addField("Beta Commands:", "none")
            }

            message.channel.send(embed)
        }

    }
}

function getAll(client, message) {

    const embed = new MessageEmbed()
    .setColor("RANDOM")

    const commands = (category) => {
        return client.commands
            .filter(cmd => cmd.category === category)
            .map(cmd => `- \`${cmd.name}\``)   
            .join("\n")
        }

    const info = client.categories
        .map(cat => `**${cat[0].toUpperCase() + cat.slice(1)}** \n${commands(cat)}`)
        .reduce((string, category) => string + "\n" + category)

    return message.channel.send(embed.setDescription(info))

}

function getCMD(client, message, input) {
    
    const embed = new MessageEmbed()

    const cmd = client.commands.get(input.toLowerCase())

    let info = `No information found for command **${input.toLowerCase()}**`

    if(!cmd) {
        return message.channel.send(embed.setColor("RANDOM").setDescription(info))
    }

    if(cmd.name) info = `**Command name:** ${cmd.name}`;
    if(cmd.description) info += `\n**Description:** ${cmd.description}`;
    if(cmd.usage) {
        info += `\n**Usage:** ${cmd.usage}`;
        embed.setFooter(`Syntax: <> = required, [] = optional`);
    }

    return message.channel.send(embed.setColor("RANDOM").setDescription(info))

}
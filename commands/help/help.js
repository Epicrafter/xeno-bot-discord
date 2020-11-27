const { MessageEmbed } = require("discord.js");
const { string } = require("mathjs");

module.exports = {
    name: "help",
    category: "help",
    description: "Returns all commands, or one specific command info",
    run: async (client, message, args) => {

        if(args[0]) {
            return getCMD(client, message, args[0])
        } else {
            
            let embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter("Powered By Xeno", client.user.avatarURL())
            .setTitle("Help")
            .setDescription("This is a list of commands you can use. You can get more info about a specific command by using ``help <command>`` ``(e.g. help say)``.")
            .addField("Fun:", "``8ball`` ``advice`` ``anime`` ``asciify`` ``clyde`` ``decrypt`` ``didumean`` ``emoji`` ``encrypt`` ``fact`` ``flip`` ``fml`` ``gayrate`` ``howdumb`` ``hug`` ``kill`` ``kiss`` ``meme`` ``morse`` ``oof`` ``pickup`` ``rate`` ``roll`` ``slap`` ``trump`` ``yomama`` ")
            .addField("Games:", "``fortnite`` ``server``")
            .addField("Hypixel:", "``bedwars`` ``skywars`` ``hstatus``")
            .addField("Image Manipulation:", "``deepfry`` ``ph`` ``supreme``")
            .addField("Info:", "``avatar`` ``botinfo`` ``checknsfw`` ``color`` ``corona`` ``instagram`` ``length`` ``ping`` ``serverinfo`` ``status`` ``support`` ``userinfo`` ``weather``")
            .addField("Utilities:", "``application`` ``bindyt`` ``calc`` ``dm`` ``gif`` ``bin`` ``report`` ``say`` ``shorten`` ``suggest`` ``translate``")
            /*.addField("Nsfw:", "``hanal`` ``hboobs`` ``hpussy`` ``kitsune`` ``neko``")*/
            .addField("Moderation:", "``announce`` ``ban`` ``giveaway`` ``kick`` ``mute`` ``purge`` ``unmute`` ``spam`` ``warn`` ``warnings`` ``delwarn``")
            .addField("Configuration:", "``bindlog`` ``welcome`` ``bindwelcome`` ``welcomemsg`` ``goodbye`` ``bindgoodbye`` ``goodbyemsg`` ")
            .addField("Bot Owner:", "``eval`` ``spam`` ``setgame`` ``stop``")
            /*.addField("NSFW (Only Premium Users)", "``ass`` ``pussy`` ``tits`` ``4k`` ``nsfw``")*/

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
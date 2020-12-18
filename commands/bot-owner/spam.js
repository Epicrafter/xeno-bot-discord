const { MessageEmbed, Message } = require("discord.js");

module.exports = {
    name: "spam", 
    category: "moderation",
    description: "Spam a user in dm",
    usage: "spam <@user> <message>",
    run: async (client, message, args) => {

      message.delete();

      let dm = args.slice(1).join(" ");
      let isBotOwner = message.author.id == '342333088573161472';
      let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        let usage = new MessageEmbed()
            .setColor(process.env.embedcolor)

      if(!isBotOwner) {
          usage.addField("Missing Permission", "Only the \`\`BOT OWNER\`\` can use this command")
          message.channel.send(usage)
              .then(msg => {msg.delete({ timeout: 5000 })})
          return;
      }

      if(!user) {
          usage.addField("Missing User Mention", "Please mention the user you want to spam\nUsage: spam <@user> <message>")
          message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
          return;
      }

      if(!dm) {
          usage.addField("Missing Message", "Please provide the message you would like to spam\nUsage: spam <@user> <message>")
          message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
          return;
      }

      setInterval (function () {
          user.user.send(dm)
        }, 1);    

  } 
}  
         
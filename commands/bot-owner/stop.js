const { MessageEmbed, Message } = require("discord.js");

module.exports = {
    name: "stop", 
    category: "bot-owner",
    description: "Only Bot Owner Command",
    usage: "stop",
    run: async (client, message, args) => {

      let isBotOwner = message.author.id == '342333088573161472';

        let usage = new MessageEmbed()
            .setColor(process.env.embedcolor)

      if(!isBotOwner) {
          usage.addField("Missing Permission", "Only the \`\`BOT OWNER\`\` can use this command")
          message.channel.send(usage)
            .then(msg => {msg.delete({ timeout: 5000 })})
          return;
      }

      client.destroy();

  }
}
 
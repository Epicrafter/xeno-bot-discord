const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "8ball",
    category: "fun",
    description: "A fortune telling command",
    usage: "8ball <question>",
    run: async(client, message, args) => {

        let question = args.join(" ");

        let usage = new MessageEmbed()
            .setColor(process.env.embedcolor)

        if(!question) {
            usage.addField("Missing Question", "Usage: 8ball <question>")
            message.channel.send(usage)
                .then(msg => {msg.delete({ timeout: 5000 })})
            return;
        }

        const answer = [
            'yes',
            'no',
            'maybe',
            'sort of',
            'can\'t tell',
            'ofc not',
            'probably',
            'yes but no',
            'no but yes',
            'yep',
            'nope',
            'i don\'t think so',
            'well yes but actually no',
            'well no but actually yes',
            'omg yes!',
            'nooooo'
        ];

        message.channel.send(answer[Math.floor(Math.random() * answer.length)]);

    }
}

const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies Pong!"),
    async execute(client, interation) {
        await interation.reply(`Pong! Latency: ${client.ws.ping}ms.`);
    }
}
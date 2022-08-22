const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies Pong!"),
    async execute(interation) {
        await interation.reply("Pong!");
    }
}
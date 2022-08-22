const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("setup")
        .setDescription("PlaceHolder"),
    async execute(interation) {
        //await interation.reply("Pong!");
    }
}
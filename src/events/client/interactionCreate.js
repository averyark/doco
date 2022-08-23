require("dotenv").config();

const chalk = require("chalk");
const { REST } = require("@discordjs/rest");

const { discordToken, dataBaseToken, clientId } = process.env;

module.exports = {
    name: "interactionCreate",
    async execute(client, interaction) {
        if (!interaction.isCommand()) return;

        const command = client.commands.get(interaction.commandName);

        if (!command) return;

        try {
            await command.execute(client, interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({
                content: "There was an error executing this command!",
            });
        }
    }
};
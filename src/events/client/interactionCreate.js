require("dotenv").config();

const chalk = require("chalk");
const { REST } = require("@discordjs/rest");

const { discordToken, dataBaseToken, clientId } = process.env;

const discordjs = require("discord.js");

module.exports = {
    name: "interactionCreate",
    async execute(client, interaction) {
        if (interaction.isCommand()) {
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
        } else if (interaction.isButton()) {
            client.buttons.get(interaction.inter)
        };

    }
};
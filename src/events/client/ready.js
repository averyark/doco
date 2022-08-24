require("dotenv").config();

const chalk = require("chalk");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

const { discordToken, dataBaseToken, clientId } = process.env;

module.exports = {
    name: "ready",
    async execute(client) {
        const guildIds = client.guilds.cache.map((guild) => guild.id);
        const rest = new REST({ version: "9" }).setToken(discordToken);

        for (const guildId of guildIds) {
            rest
                .put(Routes.applicationGuildCommands(clientId, guildId), {
                    body: client.commandsArray,
                })
                .then(() =>
                    console.log(
                        chalk.green("Successfully updated commands for guild " + guildId)
                    )
                )
                .catch(console.error);
        }
    }
};


const fs = require("fs");
const chalk = require("chalk");
const path = require("path");

module.exports = (client) => {
    client.handleCommands = () => {
        const commandsFolderPath = `${__dirname}/../commands`;
        const commandFiles = fs
            .readdirSync(commandsFolderPath)
            .filter((file) => file.endsWith(".js"));

        for (const file of commandFiles) {
            const command = require(`${commandsFolderPath}/${file}`);

            client.commands.set(command.data.name, command);
            client.commandsArray.push(command.data.toJSON());

            console.log(chalk.bgWhite(chalk.black(`Loaded command ${command.data.name}`)));
        }
    }
}
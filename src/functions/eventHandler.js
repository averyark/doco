const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

const { connection } = require("mongoose");

module.exports = async (client) => {
    client.handleEvents = async () => {
        const eventFolders = fs.readdirSync(path.join(__dirname, "..", "events"));

        for (const folder of eventFolders) {
            const eventsPath = path.join(__dirname, "../events/", folder);
            console.log(eventsPath) // debug
            const eventFiles = fs
                .readdirSync(eventsPath)
                .filter((file) => file.endsWith(".js"));

            switch (folder) {
                case "database":
                    for (const file of eventFiles) {
                        const filePath = path.join(eventsPath, file);
                        const eventFile = require(filePath);
                        if (eventFile.once) {
                            connection.once(eventFile.name, (...args) => eventFile.execute(...args));
                        } else {
                            connection.on(eventFile.name, (...args) => eventFile.execute(...args));
                        }
                        console.log(chalk.bgWhite(chalk.black(`Loaded moongose event ${eventFile.name}`)));
                    }
                    break;

                case "client":
                    for (const file of eventFiles) {
                        const filePath = path.join(eventsPath, file);
                        const eventFile = require(filePath);
                        if (eventFile.once) {
                            client.once(eventFile.name, (...args) => eventFile.execute(client, ...args));
                        } else {
                            client.on(eventFile.name, (...args) => eventFile.execute(client, ...args));
                        }
                        console.log(chalk.bgWhite(chalk.black(`Loaded client event ${eventFile.name}`)));
                    }
                    break;

                default:
                    break;
            }
        }
    }
}

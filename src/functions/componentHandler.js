//    FileName    > componentHandler.js
//    Author      > AveryArk
//    Contact     > Twitter: https://twitter.com/averyark_
//    Created     > 23/08/2022

const fs = require("fs");
const chalk = require("chalk");
const path = require("path");

module.exports = (client) => {
    client.handleComponents = () => {
        const componentsFolderPath = `${__dirname}/../components`;
        const componentFolders = fs
            .readdirSync(componentsFolderPath)

        for (const folder of componentFolders) {
            const componentFiles = fs
                .readdirSync(commandsFolderPath)
                .filter((file) => file.endsWith(".js"));

            const { buttons } = client;

            switch (folder) {
                case "buttons":
                    for (const file of componentFiles) {
                        const button = require(`${componentsFolderPath}/${folder}/${file}`);

                        buttons.set(button.data.name, button);

                        console.log(chalk.bgWhite(chalk.black(`Loaded button ${button.data.customId}`)));
                    }
                    break;
                // case "selectMenus":
                //     for (const file of componentFiles) {
                //         const selectMenu = require(`${componentsFolderPath}/${folder}/${file}`);

                //         buttons.set(selectMenu.data.customId, selectMenu);

                //         console.log(chalk.bgWhite(chalk.black(`Loaded select menu ${selectMenu.data.customId}`)));
                //     }
                //     break;
                default:
                    break;
            }


            console.log(chalk.bgWhite(chalk.black(`Loaded component ${command.data.name}`)));
        }
    }
}


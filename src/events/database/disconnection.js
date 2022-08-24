const chalk = require("chalk");


module.exports = {
    name: "disconnected",
    execute() {
        console.log(chalk.rgb(220, 220, 0)("Disconnected from the database!"));
    }
};
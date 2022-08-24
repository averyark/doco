require("dotenv").config();

const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const fs = require("fs");
const { connect } = require("mongoose");
const chalk = require("chalk");
const path = require("path");

const { discordToken, databaseToken } = process.env;

const client = new Client({
    intents: GatewayIntentBits.Guilds,
});

client.commands = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();
client.modals = new Collection();
client.commandsArray = [];

const functionsPath = path.join(__dirname, "functions");
const functionFiles = fs
    .readdirSync(functionsPath)
    .filter((file) => file.endsWith(".js"));

for (const file of functionFiles) {
    const filePath = path.join(functionsPath, file);
    require(filePath)(client);
}

client.handleCommands()
client.handleEvents()
client.login(discordToken);

(async () => {
    await connect(databaseToken).catch(console.error);
})();

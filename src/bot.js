require('dotenv').config();


const { REST } = require("@discordjs/rest");
const { isContextMenuApplicationCommandInteration } = require("discord-api-types/utils/v9")
const { Routes } = require("discord-api-types/v9")
const { Client, Collection, GatewayIntentBits} = require("discord.js");
const fs = require("fs");
const { connect } = require("mongoose");
const chalk = require("chalk");


const { discordToken, dataBaseToken, clientId } = process.env

const client = new Client(
    { 
        intents: GatewayIntentBits.Guilds

    }
);
const path = require("path")

const commands = [];
client.commands = new Collection();

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath)

    client.commands.set(command.data.name, command);
    commands.push(command.data.toJSON());

}

client.on("ready", (stream) => {
    const guildIds = client.guilds.cache.map(guild => guild.id);

    const rest = new REST({version: "9"}).setToken(discordToken);
    for (const guildId of guildIds) {
        rest.put(Routes.applicationGuildCommands(clientId, guildId), {body: commands})
            .then(() => console.log(chalk.green("Successfully updated commands for guild " + guildId)))
            .catch(console.error)
            
    }
})

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;
    
    const command = client.commands.get(interaction.commandName);

    if (!command) return;
    
    try
    {
        await command.execute(interaction);
    }
    catch(error)
    {
        console.error(error)
        await interaction.reply({content: "There was an error executing this command!"})
    }
}),

client.login(discordToken)
// (async () => {
//      await connect(dataBaseToken).catch(console.error);
// }) ();
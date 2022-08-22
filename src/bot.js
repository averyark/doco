require('dotenv').config();


const { REST } = require("@discordjs/rest");
const { isContextMenuApplicationCommandInteration } = require("discord-api-types/utils/v9")
const { Routes } = require("discord-api-types/v9")
const { token } = process.env
const { Client, Collection, GatewayIntentBits} = require("discord.js");
const fs = require("fs");

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
    const guild_ids = client.guilds.cache.map(guild => guild.id);

    const rest = new REST({version: "9"}).setToken(process.env.token);
    for (const guildId of guild_ids) {
        rest.put(Routes.applicationGuildCommands(process.env.client_id, guildId), {body: commands})
            .then(() => console.log("Successfully updated commands for guild " + guildId))
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

client.login(process.env.token)
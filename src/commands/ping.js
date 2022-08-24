//    FileName    > ping.js
//    Author      > AveryArk
//    Contact     > Twitter: https://twitter.com/averyark_
//    Created     > 23/08/2022


const { SlashCommandBuilder, PermissionFlagsBits, PermissionBitField } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with pong and the latency of the bot/client."),
    async execute(client, interaction) {
        const message = await interaction.deferReply({ fetchReply: true });

        const newMessage = `Pong! APY Latency: \`${client.ws.ping}\` ms. Client Latency: \`${message.craetedTimestamp - interaction.createdTimestamp}\` ms.`;
        // await interaction.reply(`Pong! Latency: ${client.ws.ping} ms.`);
        await interaction.editReply({ content: newMessage });
    }
}
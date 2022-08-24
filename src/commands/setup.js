//    FileName    > database.js
//    Author      > AveryArk
//    Contact     > Twitter: https://twitter.com/averyark_
//    Created     > 23/08/2022

const Guild = require("../schemes/guild");
const { SlashCommandBuilder, PermissionFlagsBits, PermissionBitField, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js")
const mongoose = require("mongoose");


module.exports = {
    data: new SlashCommandBuilder()
        .setName("setup")
        .setDescription("Setups the bot."),
    async execute(client, interaction) {
        let guildProfile = await Guild.findOne({ guildId: interaction.guild.id });
        if (!guildProfile) {
            guildProfile = await new Guild({
                _id: mongoose.Types.ObjectId(),
                guildId: interaction.guild.id,
                prefix: "!",
                whitelistRoles: {},
                blacklistRoles: {},
            });
            guildProfile.save().catch((err) => console.log(err));
            const message = await interaction.deferReply({ fetchReply: true });

        } else {
            const message = await interaction.deferReply({ fetchReply: true });
            message.edit({ content: "The bot is already setup for this server, do you want to redo the process?" });

            const row = new ActionRowBuilder()
                .addComponents()

            const cancel = new ButtonBuilder()
            cancel.setLabel("Cancel")
            cancel.setStyle(ButtonStyle.Danger)

            const confirm = new ButtonBuilder()
            confirm.setLabel("Confirm")

        }
    }
}
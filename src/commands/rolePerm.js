//    FileName    > rolePerm.js
//    Author      > AveryArk
//    Contact     > Twitter: https://twitter.com/averyark_
//    Created     > 23/08/2022

const { SlashCommandBuilder, PermissionFlagsBits, PermissionBitField } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("roleperm")
        .setDescription("Configure ")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(client, interaction) {

    }
}
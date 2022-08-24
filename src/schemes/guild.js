const { Schema, model } = require("mongoose");
const guildScheme = new Scheme({
    _id: Schema.Types.ObjectId,
    guildId: String,
    prefix: String,
    whitelistRoles: Schema.Types.Array,
    blacklistRoles: Schema.Types.Array,
});

module.exports = model("Guild", guildScheme, "guilds");
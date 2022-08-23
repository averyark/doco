const { Schema, model } = requrie("mongoose")
const guildScheme = new Scheme({
    __id: Schema.Types.ObjectId,
    guildId: String,
    prefix: String,
});

module.exports = model("Guild", guildScheme, "guilds");
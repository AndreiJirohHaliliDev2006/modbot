const Log = require('../../Log');
const GuildConfig = require('../../config/GuildConfig');
const util = require('../../util');

exports.event = async (options, member) => {
    let result = await options.database.query('SELECT * FROM moderations WHERE action = \'mute\' AND active = TRUE AND userid = ? AND guildid = ?',[member.id,member.guild.id]);
    if (result) {
        let guildConfig = await GuildConfig.get(member.guild.id);
        await member.roles.add(guildConfig.mutedRole);
        await Log.logEmbed(member.guild,{
            title: `Restored mute | ${util.escapeFormatting(member.user.tag)}`,
            description: `Mute ID: ${result.id}`,
            footer: {text:`ID: ${member.id}`}
        });
    }
};

import { ICommand } from "wokcommands";
import DiscordJS, { GuildMember } from "discord.js"

export default {
    category: 'Administration',
    description: 'Ban a fucking user.',
    slash: true,
    permissions: ["BAN_MEMBERS"],
    minArgs: 1,
    testOnly: true,
    expectedArgs: '<user> <reason>',
    expectedArgsTypes: ["USER", "STRING"],
    callback: ({ interaction, args }) => {
        const user = interaction.options.getMember("user") as GuildMember;
        const reason = interaction.options.getString("reason")!;

        if (interaction.memberPermissions?.has("BAN_MEMBERS")) {
            if (interaction.guild?.members.fetch(user)) {
                const gmember = interaction.guild?.members.fetch(user)
                if (user.permissions.has("ADMINISTRATOR")) {
                    interaction.reply({
                        content: "Can't ban Members with the Administrator Permission.",
                        ephemeral: true
                    })
                } else if (user.user.bot) {
                    interaction.reply({
                        content: "Can't ban a Bot. You have to do it manually.",
                        ephemeral: true
                    })
                } else if (reason == null) {
                    user.user.send({
                        content: `You were banned from ${user.guild.name}.`
                    })
                    user.ban()
                    interaction.reply({
                        content: `Member ${user.user.tag} was banned successfully.`
                    })
                } else {
                    user.user.send({
                        content: `You were banned from ${user.guild.name} for the following reason: ${reason}.`
                    })
                    user.ban({
                        reason: reason
                    })
                    interaction.reply({
                        content: `Member ${user.user.tag} was banned successfully with the following reason: ${reason}`
                    })
                }
            } else {
                interaction.reply({
                    content: "Mentioned User is not Member of this guild",
                    ephemeral: true
                })
            }
        } else {
            interaction.reply({
                content: "You can't ban users.",
                ephemeral: true
            })
        }
    }
} as ICommand
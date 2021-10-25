import { ICommand } from "wokcommands";

export default {
    category: 'Administration',
    description: 'Clears the Chat with the given amount, else default is 20',
    permissions: ["MANAGE_MESSAGES"],
    maxArgs: 1,
    expectedArgs: '<amount>',
    slash: true,
    testOnly: true,
    callback: async ({ interaction, channel, args }) => {
        const amount = parseInt(args.shift()!)
        const { size } = await channel.bulkDelete(amount, true)
        const reply = `Deleted ${size} message(s).`
        interaction.reply({
            content: reply,
            ephemeral: true
        })
    }
} as ICommand
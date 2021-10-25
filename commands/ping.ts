import { ICommand } from "wokcommands";

export default {
    category: 'Testing',
    description: 'get Botping to Discord',
    slash: true,
    testOnly: true,
    callback: ({ interaction, client }) => {
        interaction.reply({
            content: "My ping to Discord's API is " + client.ws.ping + "ms",
            ephemeral: true
        })
    }
} as ICommand
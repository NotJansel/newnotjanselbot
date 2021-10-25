import DiscordJS, { Channel, Guild, GuildMember, Intents, Message, WebSocketManager } from "discord.js";
import dotenv from "dotenv";
import path from "path";
import WOKCommands from 'wokcommands';
dotenv.config();

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ],
});

client.on("ready", () => {
    console.log("The bot is logged in as " + client.user?.username);
    client.user?.setActivity("to the Pre-Release state", { type: "LISTENING" });
    client.user?.setPresence({ status: "idle" });

    new WOKCommands(client, {
        commandsDir: path.join(__dirname, 'commands'),
        typeScript: true,
        testServers: ['788545943061528577', '852162148879958056', '810212310508503091'],
        botOwners: ['596106961691607040']
    })
});

client.on('messageCreate', async (message) => {
    if (message.content.toLowerCase().includes('discord.gg' || 'discordapp.com/invite/')) {
        if (!message.member?.permissions.has("ADMINISTRATOR")) {

            if (message.member?.id === '596106961691607040') return;
            let person = message.author.id;
            message.delete()
            message.channel.send(`<@${person}> Link Deleted:\n**Invite links are not permitted on this server**`)

        }
    }
})

client.login(process.env.TOKEN);

const { Client, Events, GatewayIntentBits } = require('discord.js');
const express = require('express');
const app = express();
const port = 3000;
require('dotenv').config();
 
app.get('/', function(request, response){ response.send(`Monitor is active. Local: http://localhost:${port}`); });
app.listen(port, () => console.log());


const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.MessageContent
    ]
});


client.once(Events.ClientReady, () => {
    console.log(`Bot  ${client.user.tag} runned!`);

    try {
        client.application.commands.create({
            name: 'claim',
            description: 'just run this command to check if bot is working.',
            options: []
        });
        console.log('Command created successfully.');
    } catch (error) {
        console.log('Error.');
    }

});


client.on(Events.InteractionCreate, async (interaction) => {
    try {
        if (interaction.commandName == 'claim') {
            await interaction.reply({content: `Command run successfully. Now need to wait some time. Hope it works, Magog.`, ephemeral: true});
            return;
        }
    } catch (error) {
        await interaction.reply({content: `Something went wrong while executing command`, ephemeral: true});
    }
});

client.login(process.env.TOKEN);
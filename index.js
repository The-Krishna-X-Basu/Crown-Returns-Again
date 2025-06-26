// === 1. IMPORTS AND CONFIG ===
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const express = require('express');
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const http = require('http');

// === 2. EXPRESS SETUP (REQUIRED FOR UPTIMEROBOT) ===
const app = express();

app.get('/', (req, res) => {
  res.send('Bot is online, ISJ on top 🚀');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Express server running on port ${PORT}`);
});

// Ping self to keep bot alive (for Replit/Pike)
setInterval(() => {
  http.get('https://933df008-5019-419e-a50a-3e2aaacd5bed-00-1gfawi708teha.pike.replit.dev/');
}, 280000); // Every 4 mins 40 secs

// === 3. CLIENT SETUP ===
const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

// === 4. COMMAND HANDLER ===
client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);

  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command);
    console.log(`✅ Loaded command: ${command.data.name}`);
  } else {
    console.log(`⚠️ Command at ${filePath} is missing "data" or "execute" property.`);
  }
}

// === 5. BOT STATUS ===
client.once('ready', () => {
  console.log(`🤖 Logged in as ${client.user.tag}`);
  client.user.setPresence({
    activities: [{
      name: 'Made by BasuXKrishna - Coding never fails',
      type: 0 // Playing
    }],
    status: 'online'
  });
});

// === 6. INTERACTION HANDLER ===
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(`❌ Error executing ${interaction.commandName}:`, error);

    const reply = {
      content: 'There was an error while executing this command!',
      ephemeral: true
    };

    if (interaction.replied || interaction.deferred) {
      await interaction.followUp(reply);
    } else {
      await interaction.reply(reply);
    }
  }
});

// === 7. LOGIN ===
client.login(process.env.TOKEN);
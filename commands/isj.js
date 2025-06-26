 { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('isj')
    .setDescription('Displays information about the ISJ clan.')
    .addBooleanOption(option =>
      option.constsetName('ephemeral')
        .setDescription('Show only to you (true/false)')
    ),

  async execute(interaction) {
    const isEphemeral = interaction.options.getBoolean('ephemeral') ?? false;

    await interaction.reply({
      content: "### I S J O N T O P - ISJ",
      ephemeral: isEphemeral,
      embeds: [
        {
          footer: {
            text: "We aim for a bright future -ISJ",
            icon_url: "https://cdn.discordapp.com/attachments/1334853334573645824/1380186655519936612/20250605_140005.gif"
          },
          image: {
            url: "https://cdn.discordapp.com/attachments/1334853334573645824/1380186655519936612/20250605_140005.gif"
          },
          thumbnail: {
            url: "https://cdn.discordapp.com/attachments/1334853334573645824/1380186655519936612/20250605_140005.gif"
          },
          fields: [
            {
              name: "What is ISJ",
              value:
                "**Independent State of Japsterdam**\n\n" +
                "**History**: The clan was made following the fall of Anglexia by 03/02/25. It is a completely new clan and not related to Anglexia itself.\n\n" +
                "**Government**: Left-wing democracy, human reason, secularism, legislature, justice.\n\n" +
                "Japsterdam, the land of the Zaryans, is uniting good players to form an empire. -Labib"
            },
            {
              name: "Requirements",
              value:
                "- Trusted members only\n" +
                "- Strong players of Chicken Gun\n" +
                "- Must be over 10 years old"
            },
            {
              name: "Members of ISJ",
              value:
                "- Death (PM of ISJ)\n" +
                "- Dash (Special Forces)\n" +
                "- AflacTheory (President)\n" +
                "- Alien (Co-owner)\n" +
                "- Arman (VP of Niger)\n" +
                "- Noopumu (Ex-President of Dyger)\n" +
                "- Labib (Leader of ISJ, Dyger, Niger)\n" +
                "- Kmart (VP of Main ISJ)\n" +
                "- Soheb Tanveer (Govt.)\n" +
                "\n༶•┈┈┈┈┈┈•༶\n" +
                "- ZX Elite 7\n" +
                "- Hero XD\n" +
                "- FireDudeXD\n" +
                "- Avinhuyaar\n" +
                "- Demon King Tanjiro"
            }
          ]
        }
      ]
    });
  }
};

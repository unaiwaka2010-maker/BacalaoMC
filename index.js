import { Client, GatewayIntentBits } from "discord.js";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const TOKEN = process.env.TOKEN;

client.once("ready", () => {
  console.log(`✅ Bot conectado como ${client.user.tag}`);
});

client.on("messageCreate", async (msg) => {
  if (msg.content !== "!verify") return;
  if (!msg.guild) return;

  const role = msg.guild.roles.cache.find(r => r.name === "Verificado");
  if (!role) return msg.reply("❌ Rol 'Verificado' no existe");

  await msg.member.roles.add(role);
  msg.reply("🐟 Verificado correctamente. Ya puedes entrar a BacalaoMC");
});

client.login(TOKEN);

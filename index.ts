import { Client, Intents, MessageEmbed } from "discord.js";
import mongoose from "mongoose";

import dotenv from "dotenv";
import { cardSearch } from "./commands/cardSearch";
dotenv.config();

mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => console.log(`MongoDB connected`))
  .catch((error) => console.log(error.message));

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", () => {
  console.log("Bot has connected");
});

client.on("messageCreate", async (message) => {
  cardSearch(message);
});

client.login(process.env.TOKEN);

import { Message } from "discord.js";
import Card, { ICard } from "../models/Card";
import { buildCardProfile } from "../utils/card";
import dotenv from "dotenv";

dotenv.config();

export const cardSearch = async (message: Message) => {
  const regexp = /<(.+?)>/g;
  const matches: RegExpMatchArray[] | null = [
    ...message.content.matchAll(regexp),
  ];

  for (const m of matches) {
    try {
      const query = {
        name: {
          $regex: m[1],
          $options: "i",
        },
      };
      const cards: ICard[] = await Card.find(query);
      if (cards.length) {
        const card: ICard = cards[0];
        message.channel.send({ embeds: [buildCardProfile(card)] });
      } else {
        message.reply(`No record matching the name '${m[1]}'`);
      }
    } catch (error) {
      console.log(error);
    }
  }
};

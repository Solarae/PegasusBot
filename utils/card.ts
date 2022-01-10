import { ColorResolvable, Message, MessageEmbed } from "discord.js";
import { ICard } from "../models/Card";
import dotenv from "dotenv";

dotenv.config();

const CARD_IMAGES_CLOUD_URL: string =
  process.env.CARD_IMAGES_CLOUD_URL || "http://pics.alphakretin.com";

const IMG_EXTENSION: string = process.env.CARD_IMAGES_CLOUD_URL ? "jpg" : "png";

interface cardTypes {
  isMonster: boolean;
  isNormal: boolean;
  isRitual: boolean;
  isFusion: boolean;
  isXYZ: boolean;
  isSynchro: boolean;
  isPendulum: boolean;
  isLink: boolean;
  isSpell: boolean;
  isTrap: boolean;
}

export const buildCardProfile = (card: ICard): MessageEmbed => {
  const type: string = card.type.replace(" Card", "");
  const types: string[] = type.split(" ");

  const cardTypes: cardTypes = getTypes(types);

  var description: string = "";
  if (card.archetype) description += `**Archetype:** ${card.archetype}\n`;
  description += `**Status**: OCG: ${card.banlist_info.ban_ocg} / TCG: ${card.banlist_info.ban_tcg}\n`;
  description += `**Type:** ${card.race}/` + type.replace(" ", "/") + " ";

  if (cardTypes.isMonster) {
    description += `**Attribute:** ${card.attribute}\n`;
    if (!cardTypes.isLink) description += `**Level/Rank:** ${card.level} `;
    description += `**ATK:** ${card.atk} `;
    if (!cardTypes.isLink) description += `**DEF:** ${card.def} `;
    if (cardTypes.isPendulum) description += `**Scale:** ${card.scale} `;
    if (cardTypes.isLink) {
      description += `**Link:** ${card.linkval} `;
      description += `**Arrows:** ${card.linkmarkers.join(",")}`;
    }
  }

  description += "\n\n";
  var desc = card.desc;
  
  if (cardTypes.isPendulum) desc = desc.replace(/\] /g, "]\n");
  description += `**Card Description**\n${desc}`;

  const embed = new MessageEmbed();
  embed.setTitle(card.name);
  embed.setURL(`https://db.ygoprodeck.com/card/?search=${card.id}`);
  embed.setColor(getCardColor(cardTypes));

  embed.setDescription(description);
  embed.setThumbnail(`${CARD_IMAGES_CLOUD_URL}/${card.id}.${IMG_EXTENSION}`);

  return embed;
};

const getTypes = (types: string[]): cardTypes => {
  const cardTypes: cardTypes = {
    isMonster: false,
    isNormal: false,
    isRitual: false,
    isFusion: false,
    isXYZ: false,
    isSynchro: false,
    isPendulum: false,
    isLink: false,
    isSpell: false,
    isTrap: false,
  };

  for (const t of types) {
    if (t === "Monster") cardTypes.isMonster = true;
    else if (t === "Normal") cardTypes.isNormal = true;
    else if (t === "Ritual") cardTypes.isRitual = true;
    else if (t === "Fusion") cardTypes.isFusion = true;
    else if (t === "Synchro") cardTypes.isSynchro = true;
    else if (t === "XYZ") cardTypes.isXYZ = true;
    else if (t === "Pendulum") cardTypes.isPendulum = true;
    else if (t === "Link") cardTypes.isLink = true;
    else if (t === "Spell") cardTypes.isSpell = true;
    else if (t === "Trap") cardTypes.isTrap = true;
  }
  return cardTypes;
};

const getCardColor = (cardTypes: cardTypes): ColorResolvable => {
  if (cardTypes.isNormal) return "#FDE68A";
  else if (cardTypes.isRitual) return "#9DB5CC";
  else if (cardTypes.isFusion) return "#A086B7";
  else if (cardTypes.isSynchro) return "WHITE";
  else if (cardTypes.isXYZ) return "#000";
  else if (cardTypes.isLink) return "#00008B";
  else if (cardTypes.isSpell) return "#1D9E74";
  else if (cardTypes.isTrap) return "PURPLE";
  else return "#ff8b53";
};

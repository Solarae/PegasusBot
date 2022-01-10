import mongoose from "mongoose";

export interface ICard extends mongoose.Document {
  id: number;
  name: string;
  type: string;
  desc: string;
  atk: number;
  def: number;
  level: number;
  race: string;
  attribute: string;
  archetype: string;
  scale: number;
  linkval: number;
  linkmarkers: string[];
  card_sets: {
    set_name: string;
    set_code: string;
    set_rarity: string;
    set_rarity_code: string;
    set_price: string;
  }[];
  banlist_info: {
    ban_tcg: string;
    ban_ocg: string;
    ban_goat: string;
  };
  card_images: {
    id: string;
    image_url: string;
    image_url_small: string;
  }[];
  card_prices: {
    cardmarket_price: string;
    tcgplayer_price: string;
    ebay_price: string;
    amazon_price: string;
    coolstuffinc_price: string;
  }[];
}

const cardSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  name: {
    type: String,
    unique: true,
  },
  type: {
    type: String,
  },
  desc: {
    type: String,
  },
  atk: {
    type: Number,
  },
  def: {
    type: Number,
  },
  level: {
    type: Number,
  },
  race: {
    type: String,
  },
  attribute: {
    type: String,
  },
  archetype: {
    type: String,
  },
  scale: {
    type: Number,
  },
  linkval: {
    type: Number,
  },
  linkmarkers: {
    type: [
      {
        type: String,
        _id: false,
      },
    ],
  },
  card_sets: [
    {
      set_name: {
        type: String,
      },
      set_code: {
        type: String,
      },
      set_rarity: {
        type: String,
      },
      set_rarity_code: {
        type: String,
      },
      set_price: {
        type: String,
      },
      _id: false,
    },
  ],
  banlist_info: {
    ban_tcg: {
      type: String,
      default: "Unlimited",
    },
    ban_ocg: {
      type: String,
      default: "Unlimited",
    },
    ban_goat: {
      type: String,
    },
    _id: false,
  },
  card_images: [
    {
      id: {
        type: String,
      },
      image_url: {
        type: String,
      },
      image_url_small: {
        type: String,
      },
      _id: false,
    },
  ],
  card_prices: [
    {
      cardmarket_price: {
        type: String,
      },
      tcgplayer_price: {
        type: String,
      },
      ebay_price: {
        type: String,
      },
      amazon_price: {
        type: String,
      },
      coolstuffinc_price: {
        type: String,
      },
      _id: false,
    },
  ],
});

const Card = mongoose.model<ICard>("Card", cardSchema);

export default Card;

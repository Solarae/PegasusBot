import mongoose from "mongoose";
import Card, { ICard } from "./models/Card";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

import { upload } from "./upload"

mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => console.log(`MongoDB connected`))
  .catch((error) => console.log(error.message));

const populateDB = async () => {
  const startTime = Date.now()
  const currentCards: ICard[] = await Card.find();
  const response = await axios.get(
    "https://db.ygoprodeck.com/api/v7/cardinfo.php"
  );
  const cards = response.data.data;
  for (const card of cards) {
    try {
      const currentCard: ICard | undefined = currentCards.find(
        (c) => c.id === card.id
      );
      if (currentCard) {
        await Card.findByIdAndUpdate(currentCard._id, card);
      } else {
        await new Card(card).save();
      }
      const card_images = card.card_images;
      for (const card_image of card_images) {
        await upload({
          url: card_image.image_url,
          bucket: process.env.S3_BUCKET_NAME!,
          onConflict: "keepExisting"
        });
      }
    } catch (error) {
      console.log("Error");
    }
  }
  console.log(`Database successfuly updated after ${Date.now() - startTime}ms`);
};

(async () => {
  await populateDB();
  mongoose.disconnect()
})();

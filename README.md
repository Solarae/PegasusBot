# [Pegasus Bot](https://discord.com/api/oauth2/authorize?client_id=928762649674674216&permissions=274878023680&scope=applications.commands%20bot)

A Discord bot for looking up cards and other useful information about the _Yu-Gi-Oh! Trading Card Game_ and _Official Card Game_

## Documentation

Usage:
```
<card_name>
```

This command is used to search for a card, and display a card profile in a Discord Rich Embed, with detailed information about the card such as

- Name
  - Also an URL leading to db.ygoprodeck.com which provides more detailed information about the card
- Card Image
- Archetype
- Card's banlist limit (OCG/TCG)
- Type of Card
- Monster Stats
  - Race (Warrior, Spellcaster, and etc)
  - Attribute
  - ATK
  - DEF
  - Rank/Level
  - Scale
  - Linkval
  - Linkmarkers
- Card Effect Description

Example
![screenshot](https://raw.githubusercontent.com/Solarae/PegasusBot/main/readme_images/card_search.png)

Other Command Features
* Inline Search - Search card inline
![screenshot](https://raw.githubusercontent.com/Solarae/PegasusBot/main/readme_images/inline_search.png)

* Partial Search - Returns card whose name matches the query and is the shortest of all possible matches
![screenshot](https://raw.githubusercontent.com/Solarae/PegasusBot/main/readme_images/partial_search.png)

* Simultaneous Search - Search multiple cards at the same time
![screenshot](https://raw.githubusercontent.com/Solarae/PegasusBot/main/readme_images/simult_search.png)


## Discord permissions


Please make sure you use an [invite link](https://discord.com/api/oauth2/authorize?client_id=928762649674674216&permissions=274878023680&scope=applications.commands%20bot)
that automatically grants the following permissions.

- Send Messages
- Send Messages in Threads
- Embed Links: The bot displays card information using Discord Rich Embed.
- Attach Files: The bot attaches card images in the card information embed.
- Read Message History

## Getting Started

### Prerequisites

- Node.js
- NPM

### Installing

To start this application

1. Install NPM packages
   ```sh
   npm install
   ```
2. [Create MongoDB Atlas database](https://www.mongodb.com)

3. [Setup bot application and invite link](https://discord.com/developers/applications)

- NOTE: If you do not want to host the card images on a S3 bucket, skip step 4 and comment out the lines 33-38 in update-DB.ts
  ```
  # Comment this out as it will try to upload images to the S3 bucket
  for (const card_image of card_images) {
        await upload({
          url: card_image.image_url,
          bucket: "industrial-illusions",
          onConflict: "keepExisting"
        });
  ```

4. [Create a AWS S3 Bucket to host card images](https://docs.aws.amazon.com/AmazonS3/latest/userguide/creating-bucket.html)

5. Create an .env file
   ```
   touch .env
   ```
6. Enter your key in the .env file
   ```
   TOKEN=YOUR_BOT_TOKEN
   MONGO_URI=YOUR_API_KEY
   # Ignore this line if you skipped step 4
   CARD_IMAGES_CLOUD_URL=YOUR_S3_BUCKET_URL
   ```
7. Open a terminal and run the following command to compile from .ts to .js
   ```
   npm run tsc
   ```
8. Open another terminal and populate your database
   ```
   node update-DB.js
   ```
9. Turn your bot online by running
   ```
   npm run start
   ```

## Deployment
The bot is deployed on AWS EC2. There is no good step by step tutorial on it, but a good resource is the following [link](https://dev.to/abdr__rahman/deploy-a-nodejs-app-on-aws-ec2-1ao1) with the following adjustments
* On Section **Launch an EC2 instance** Step 6, ignore the following
  ```
  Add another rule that allows all IP addresses to access the instance over the internet on port 80. This rule will be a Custom TCP rule, TCP protocol on port 80, source should be set to Anywhere or 0.0.0.0/0
  ```
  because we aren't using an express server

* On Section **Install NodeJS and Deploy your Application**, replace the following
  ```
  curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash - sudo apt-get install -y nodejs
  ```
  with
  ```
  curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -sudo apt-get install -y nodejs
  ```
  because Discord.js requires [Node.js 16.6.0 or newer](https://discord.js.org/#/docs/discord.js/stable/general/welcome)

Other alternatives are 
* [Repl.it](https://replit.com)
  - [Deploying a bot using Repl.it Tutorial](https://www.youtube.com/watch?v=Gqurhm2QxA0)
* [Heroku](https://www.heroku.com)
  - [Deploying a bot using Heroku Tutorial](https://www.youtube.com/watch?v=OFearuMjI4s)
* [Digital Ocean](https://www.digitalocean.com/try/developer-brand?utm_campaign=amer_brand_kw_en_cpc&utm_adgroup=digitalocean_exact_exact&_keyword=digital%20ocean&_device=c&_adposition=&utm_content=conversion&utm_medium=cpc&utm_source=google&gclid=EAIaIQobChMI1dLjjJut9QIV4jizAB1PjQCCEAAYASAAEgKtL_D_BwE)
  - [Deploying a bot using Digital Ocean Tutorial](https://www.youtube.com/watch?v=lskn1Xr-q8E)


## Learn More

To learn more about Discord.js, take a look at the following resources:

- [Worn Off Keys Discord.JS v13](https://www.youtube.com/playlist?list=PLaxxQQak6D_f4Z5DtQo0b1McgjLVHmE8Q) - A playlist teaching the basics of Discord.JS v13
- [Discord.js Documentation](https://discord.js.org/#/) - Official Discord.js documentation

## License

Distributed under the MIT License.

## Contact

Email: [ronnie.chen.rc@gmail.com](ronnie.chen.rc@gmail.com)

Project Repoistory: [https://github.com/Solarae/PegasusBot](https://github.com/Solarae/PegasusBot)

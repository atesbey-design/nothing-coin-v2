require("dotenv").config({ path: __dirname + "/.env" });
const express = require('express')
const app = express()
const port = process.env.PORT || 4000;
const { twitterClient } = require("./twitterClient.js")

const { runChat } = require("./generate.js");
const CronJob = require("cron").CronJob;



app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

const tweet = async () => {
  try {
    const response = await runChat();
    await twitterClient.v2.tweet(`
    ${response}   \n \n
    @thenotcoin
    \n
    #notcoin
    \n
    join now
    \n
    https://t.me/notcoin_bot?start=r_574604_1997439   
    `);
    console.log("Tweeted!");

  } catch (e) {
    console.log(e)
  }
}

const cronTweet = new CronJob("1 * * * * *", async () => {
  tweet();
});

cronTweet.start();
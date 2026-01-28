const express = require("express");
const axios = require("axios");
const app = express();
app.use(express.json());
const PAGE_TOKEN = process.env.PAGE_TOKEN;
const USER_ID = process.env.USER_ID;
app.post("/gas-alert", async (req, res) => {
  const { mq5, mq6, message } = req.body;
  const text = `Gas leakage detected! Please take precaution when handling the leakage.
Once confirmed, we recommended contacting the Bureau of Fire Protection (BFP) via this number: 09128137795
MQ-5 reading: ${mq5}
MQ-6 reading: ${mq6}
${message}`;
  try {
    await axios.post(
      `https://graph.facebook.com/v18.0/me/messages?access_token=${PAGE_TOKEN}`,
      {
        recipient: { id: USER_ID },
        message: { text }
      }
    );
    res.status(200).send("Messenger alert sent");
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).send("Messenger failed");
  }
});
app.listen(3000, () => console.log("Webhook running"));

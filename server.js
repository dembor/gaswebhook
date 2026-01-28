const express = require("express");
const axios = require("axios");
const app = express();
app.use(express.json());
const PAGE_TOKEN = process.env.PAGE_TOKEN;
const USER_ID = process.env.USER_ID;
app.post("/gas-alert", async (req, res) => {
  const { mq5, mq6, message } = req.body;
  const text = `GAS LEAK DETECTED!
MQ5: ${mq5}
MQ6: ${mq6}
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
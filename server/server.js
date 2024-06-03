const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const client = require("./redis/redis");

dotenv.config();

/* This code block is using an immediately invoked async function expression (IIFE) to connect to a
Redis client. */
(async () => {
  try {
    await client.connect();
    console.log("Redis client connected");
  } catch (error) {
    console.error(error);
  }
})();

const app = express();

client.on("connect", () => {
  console.log("Redis client connected");
});

client.on('ready', () => {
  console.log(client.isReady); // should be true
});
client.on("error", (error) => {
  console.error(error);
});

app.use(cors());

app.use(express.json());

app.use("/api", require("./routes/NewsRoute"));

const port = process.env.PORT || 3600;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

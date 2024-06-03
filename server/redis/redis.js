/* This JavaScript code is creating a Redis client using the `redis` library. */
const redis = require("redis");

const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT
});

module.exports = client;

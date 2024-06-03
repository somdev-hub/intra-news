const axios = require("axios");
const client = require("../redis/redis");

/**
 * The function `newsController` fetches and caches top headlines news data from the News API for India
 * using environment variables and Redis caching.
 * @param res - The `res` parameter in the `newsController` function is the response object that will
 * be used to send the response back to the client making the request. It is typically used to set the
 * status code and send data back in the response body.
 * @returns The `newsController` function returns either the cached news data (if available) or the
 * fetched news data from the News API for India. If the cached data is found, it is returned with a
 * status of 200. If there is no cached data, the function fetches the news data from the API, caches
 * it, and then returns the fetched data with a status of 200. If
 */
const newsController = async (_, res) => {
  try {
    const url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${process.env.NEWS_API}`;
    const cache_key = `news:top-headlines:in`;
    const cache_ttl = 3600;

    const news_data = await client.get(cache_key);
    if (news_data) {
      console.log("Cache hit");
      return res.status(200).send(JSON.parse(news_data));
    } else {
      const response = await axios.get(url);
      await client.set(
        cache_key,
        JSON.stringify(response?.data?.articles),
        "EX",
        cache_ttl
      );
      return res.status(200).send(response?.data?.articles);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

/**
 * The function `getTopHeadlinesController` fetches top headlines for different topics from a news API,
 * caches the data for future use, and returns the headlines to the client.
 * @param res - The `res` parameter in the `getTopHeadlinesController` function is the response object
 * that will be used to send the response back to the client making the request. It is typically an
 * instance of the Express response object in Node.js applications. The response object has methods
 * like `res.status()`
 * @returns The `getTopHeadlinesController` function returns either the cached top headlines data if
 * available or fetches the top headlines data from the News API for the specified topics, stores it in
 * the cache, and then returns the data. If there is an error during the process, it returns an
 * "Internal Server Error" response with status code 500.
 */
const getTopHeadlinesController = async (_, res) => {
  const headlinesTopics = ["Politics", "Business", "Sports", "Technology"];
  try {
    const cache_key = `news:top-headlines:in:topics`;
    const cache_ttl = 3600;
    const news_data = await client.get(cache_key);

    if (news_data) {
      // console.log("Cache hit");
      return res.status(200).send(JSON.parse(news_data));
    } else {
      const responseObj = {};
      await Promise.all(
        headlinesTopics.map(async (topic) => {
          const url = `https://newsapi.org/v2/top-headlines?country=in&category=${topic.toLowerCase()}&apiKey=${
            process.env.NEWS_API
          }`;

          const response = await axios.get(url);

          responseObj[topic] = response.data.articles.slice(0, 5);

          return response.data.articles;
        })
      );

      await client.set(cache_key, JSON.stringify(responseObj), "EX", cache_ttl);
      return res.status(200).send(responseObj);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  newsController,
  getTopHeadlinesController
};

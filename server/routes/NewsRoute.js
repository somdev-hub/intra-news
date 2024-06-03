const express = require("express");
const {
  newsController,
  getTopHeadlinesController
} = require("../controllers/NewsController");
const router = express.Router();

/* The line `router.get("/news", newsController);` is setting up a route in the Express router to
handle GET requests to the "/news" endpoint. When a GET request is made to this endpoint, the
`newsController` function from the `NewsController` module will be called to handle the request and
generate a response. This allows the application to respond to GET requests to the "/news" endpoint
by executing the logic defined in the `newsController` function. */
router.get("/news", newsController);

/* This line of code is setting up a route in the Express router for handling GET requests to the
"/top-headlines" endpoint. When a GET request is made to this endpoint, the
`getTopHeadlinesController` function from the `NewsController` module will be called to handle the
request and provide a response. */
router.get("/top-headlines", getTopHeadlinesController);

module.exports = router;

const express = require("express");
const {
  newsController,
  getArticleBodyController,
  getTopHeadlinesController
} = require("../controllers/NewsController");
const router = express.Router();

router.get("/news", newsController);

router.get("/top-headlines", getTopHeadlinesController);

module.exports = router;

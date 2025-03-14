const express = require('express');

const router = express.Router(); 
const {handleGenerateNewShortUrl, handleGetAnalytics, handleRedirtUrl} = require('../controller/url')


router.post("/", handleGenerateNewShortUrl);

router.get("/analytics/:shortId", handleGetAnalytics);

router.get("/:shortId", handleRedirtUrl);

module.exports = router;
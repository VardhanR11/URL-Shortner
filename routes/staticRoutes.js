const express = require('express');
const router = express.Router(); 
const URL = require('../models/db');

router.get("/", async (req, res) =>{
    const allUrls = await URL.find({});
    return res.render("home", {
        url: allUrls,
    });
});

module.exports = router;
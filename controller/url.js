const shortid = require('shortid');
const URL = require('../models/db');
const { models } = require('mongoose');

async function handleGenerateNewShortUrl(req, res) {
    const body = req.body;
    if (!body.url) {
        return res.status(400).json({ error: "URL is required" })
    }
    const shortId = shortid(8);
    await URL.create({
        shortId: shortId,
        redirectURL: body.url,
        visitHistory: [],
    });

    return res.render("home", { 
        id: shortId,
    });

    // return res.status(200).json({ id: shortId })
}


async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    });
}

async function handleRedirtUrl(req, res){
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {
            shortId,
        },
        {
        $push: {
            visitHistory: {
                timeStamp: Date.now()
            },
        }
    });
    return res.redirect(entry.redirectURL);
}

module.exports = {
    handleGenerateNewShortUrl, handleGetAnalytics, handleRedirtUrl
}
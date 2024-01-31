const express = require('express');
const router = express.Router();

const youtubeController = require('../controller/youtube.controller');

router.post('/', youtubeController.get_yt_data);

module.exports = router;

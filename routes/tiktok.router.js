const express = require('express');
const router = express.Router();

const tiktokController = require('../controller/tiktok.controller');

router.post('/', tiktokController.get_tiktok_data);

module.exports = router;

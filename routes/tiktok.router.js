const express = require('express');
const router = express.Router();

const tiktokController = require('../controller/tiktok.controller');

router.post('/', tiktokController.get_tiktok_data);
router.get('/download', tiktokController.get_tiktok_download);

module.exports = router;

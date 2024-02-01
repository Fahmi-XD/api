const { TiktokDL } = require('@tobyg74/tiktok-api-dl');

const tiktok_download = {
    get_tiktok_data: async (req, res) => {
        const { url } = req.body;
        if (url) {
            let data_tiktok;
            await TiktokDL(url, {
                version: 'v1'
            }).then(result => {
                data_tiktok = result;
            });
            res.status(200).json(data_tiktok);
        } else {
            res.status(400).json({
                status: '400'
            });
        }
    }
};

module.exports = tiktok_download;

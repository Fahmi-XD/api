const { TiktokDL } = require('@tobyg74/tiktok-api-dl');

const tiktok_url = 'https://vm.tiktok.com/ZSFdqXYvR/';

const tiktok_download = {
    get_tiktok_data: async (req, res) => {
        let data_tiktok;
        await TiktokDL(tiktok_url, {
            version: 'v1'
        }).then(result => {
            data_tiktok = result;
        });
        res.status(200).json(data_tiktok);
    }
};

module.exports = tiktok_download;

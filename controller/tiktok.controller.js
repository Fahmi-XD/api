const axios = require('axios');
const { TiktokDL } = require('@tobyg74/tiktok-api-dl');

function random_number() {
    const nm = '1234567890';
    let re = '';
    for (let i = 0; i < 8; i++) {
        let rn = Math.floor(Math.random() * 10);
        let hehe = nm.charAt(rn);
        re += hehe;
    }
    return re;
}

async function showVideoMedia(url, res, mediaType) {
    const response = await axios.get(url, { responseType: 'stream' });
    if (mediaType.includes('video')) {
        res.setHeader('Content-Type', 'video/mp4');
    } else if (mediaType.includes('audio')) {
        res.setHeader('Content-Type', 'audio/mp3');
    } else {
        res.setHeader('Content-Type', 'image/jpeg');
    }
    response.data.pipe(res);
}

const tiktok_download = {
    get_tiktok_data: async (req, res) => {
        let { url } = req.body;
        console.log(url);
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
    },

    get_tiktok_download: async (req, res) => {
        const { tiktokUrl, tiktokMediaType } = req.query;
        try {
            await showVideoMedia(tiktokUrl, res, tiktokMediaType);
        } catch (error) {
            console.log('Error' + error);
            res.status(500).send('Internal Server Error');
        }
    }
};

module.exports = tiktok_download;

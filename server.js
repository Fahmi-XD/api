'use strict';
require('dotenv').config();
const express = require('express');
const http = require('http');
const path = require('path');
const cors = require('cors');
const secure = require('ssl-express-www');
const ablySocket = require('ably');
const fileUpload = require('express-fileupload');
const logRouter = require('./routes/login.router');
const postRouter = require('./routes/post.router');
const tiktokRouter = require('./routes/tiktok.router');
const { socket } = require('./socket/index');
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 6060; // Gunakan port default 3000 jika variabel tidak tersedia

app.use(fileUpload());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set('trust proxy', true);
app.set('json spaces', 2);
app.use(cors());
app.use(secure);
/*
app.use((req, res, next) => {
    console.log('Client : ' + req.path);
    next();
});
*/
// socket(ablySocket);
// app.use(express.static('public'));

app.use('/api', logRouter);
app.use('/post', postRouter);
app.use('/tiktok', tiktokRouter);
app.use(
    '/post/media',
    (req, res, next) => {
        const requestedMediaType = req.url.split('.').pop();
        switch (requestedMediaType) {
            case 'jpg':
            case 'jpeg':
                res.set('Content-Type', 'image/jpeg');
                break;
            case 'png':
                res.set('Content-Type', 'image/png');
                break;
            case 'mp4':
                res.set('Content-Type', 'video/mp4');
                break;
        }
        next();
    },
    express.static('database/media')
);

app.get('/', (req, res) => {
    // res.sendFile(path.join(__dirname, 'public', 'index.html'));

    res.json({
        mess: 'Welcome Api V2.4'
    });
});

server.listen(port, () => {
    console.log('Server is Running on Port ' + port);
});

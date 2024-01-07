"use strict";
require("dotenv").config();
const express = require("express");
const http = require("http");
const path = require("path");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const logRouter = require("./routes/login.router");
const postRouter = require("./routes/post.router");
const app = express();
const server = http.createServer(app);

app.use(fileUpload());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
    console.log("Client : " + req.path);
    next();
});

app.use(express.static("public"));

app.use("/api", logRouter);
app.use("/post", postRouter);
app.use("/post/media", express.static("database/media"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
    // res.json({
    //         mess: "Hello World!"
    //     });
});

server.listen(5000, () => {
    console.log("Server is Running ...");
});

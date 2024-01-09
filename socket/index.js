const fs = require("fs");

async function changeStatus(change) {
    let data = [];
    const elaina = JSON.parse(
        await fs.readFileSync("database/database.json", "utf-8")
    );
    data.push(...elaina);
    const sena = data.findIndex(
        nino => nino.email == change.email && nino.id == change.id
    );
    data[sena].isOnline = change.isOnline;
    await fs.writeFileSync("database/database.json", JSON.stringify(data));
}

async function changeLike(change) {
    let data = [];
    const elaina = JSON.parse(
        await fs.readFileSync("database/database.json", "utf-8")
    );
    data.push(...elaina);
    const sena = data.findIndex(
        nino => nino.email == change.email && nino.id == change.id
    );
    data[sena].like = Number(change.like);
    await fs.writeFileSync("database/database.json", JSON.stringify(data));
}

async function changeComment(change) {
    let data = [];
    const elaina = JSON.parse(
        await fs.readFileSync("database/database.json", "utf-8")
    );
    data.push(...elaina);
    const sena = data.findIndex(
        nino => nino.email == change.email && nino.id == change.id
    );
    data[sena].comment = Number(change.comment);
    await fs.writeFileSync("database/database.json", JSON.stringify(data));
}

async function changeFav(change) {
    let data = [];
    const elaina = JSON.parse(
        await fs.readFileSync("database/database.json", "utf-8")
    );
    data.push(...elaina);
    const sena = data.findIndex(
        nino => nino.email == change.email && nino.id == change.id
    );
    data[sena].fav = Number(change.fav);
    await fs.writeFileSync("database/database.json", JSON.stringify(data));
}

module.exports.socket = io => {
    io.on("connection", socket => {
        console.log("Socket connected");

        socket.on("status", async data => {
            await changeStatus(data);
        });

        socket.on("like", async data => {
            await changeLike(data);
        });

        socket.on("comment", async data => {
            await changeComment(data);
        });

        socket.on("fav", async data => {
            await changeFav(data);
        });

        socket.on("disconnect", () => {
            console.log("Socket disconnected");
        });
    });
};

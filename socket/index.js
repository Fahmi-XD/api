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

async function changeUser(change) {
    let data = [];
    const elaina = JSON.parse(
        await fs.readFileSync("database/database.json", "utf-8")
    );
    data.push(...elaina);
    const sena = data.findIndex(
        nino => nino.email == change.email && nino.id == change.id
    );
    data[sena].user = change.user;
    await fs.writeFileSync("database/database.json", JSON.stringify(data));
}

module.exports.socket = async ablySocket => {
    const ably = new ablySocket.Realtime.Promise(
        "uhZEmQ.f5dgdQ:wVpevkmaNelNc_IXU6bDEf6yiqQ5oUVtQEyQHlNVw48"
    );
    await ably.connection.once("connected");
    console.log("Connected Ably successfully");
    const channel = ably.channels.get("post");

    await channel.subscribe("status", async data => {
        await changeStatus(data.data);
    });

    await channel.subscribe("like", async data => {
        await changeLike(data.data);
    });

    await channel.subscribe("comment", async data => {
        await changeComment(data.data);
    });

    await channel.subscribe("fav", async data => {
        await changeFav(data.data);
    });

    await channel.subscribe("user", async data => {
        await changeUser(data.data);
    });
};

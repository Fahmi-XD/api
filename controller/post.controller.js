const axios = require("axios");
const fs = require("fs");

function getTime() {
    const sekarang = new Date();
    const waktu = `${sekarang.getHours()}:${sekarang.getMinutes()}`;
    const tanggal = sekarang.getDate();
    const bulan = sekarang.toLocaleString("default", { month: "long" });
    const tahun = sekarang.getFullYear();
    const format = `${waktu},${tanggal}-${bulan}-${tahun}`;
    return format;
}

function randomNumber(length) {
    const number = "1234567890";
    let acak = "";

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * number.length);
        acak += number.charAt(randomIndex);
    }

    return acak;
}

function RandomChar(length) {
    const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let filename = "";

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        filename += chars.charAt(randomIndex);
    }

    return filename;
}

async function addArray(newData) {
    const randomN = await RandomChar(10);
    const rn = await randomNumber(10);
    const time = await getTime();
    newData.postTime = time;
    const namaMedia =
        newData.postType == "audio/mpeg"
            ? `${randomN}.mp3`
            : newData.postType == "image/png"
            ? `${randomN}.png`
            : newData.postType == "image/jpeg"
            ? `${randomN}.jpg`
            : `${randomN}.mp4`;
    let data = [];
    const caacacay = JSON.parse(
        await fs.readFileSync("database/database.json", "utf-8")
    );
    await fs.writeFileSync(`database/media/${namaMedia}`, newData.postData);
    delete newData.postData;
    data.push(...caacacay, newData);
    newData.namaMedia = namaMedia;
    newData.like = 0;
    newData.comment = 0;
    newData.fav = 0;
    newData.id = String(rn);
    fs.writeFileSync("database/database.json", JSON.stringify(data));
}

async function getArray(email, uid, req) {
    let data = [];
    const diput = JSON.parse(
        await fs.readFileSync("database/database.json", "utf-8")
    );
    data.push(...diput);
    const person = data.filter(hutao => hutao.email === email);
    for (omi of person) {
        if (omi.id === uid) {
            const fullUrl =
                req.protocol + "://" + req.get("host") + "/post/media/";
            omi.mediaUrl = fullUrl + omi.namaMedia;
            return omi;
        }
    }
    return null;
}

async function countArray(email) {
    let data = [];
    const nikki = JSON.parse(
        await fs.readFileSync("database/database.json", "utf-8")
    );
    data.push(...nikki);
    const fil = data.filter(hutao => hutao.email === email);
    return fil.length;
}

async function delArray(email, uid) {
    let data = [];
    const pedo = JSON.parse(
        await fs.readFileSync("database/database.json", "utf-8")
    );
    data.push(...pedo);
    const fil = data.findIndex(
        hutao => hutao.email === email && hutao.id === uid
    );
    const fd = data[fil].namaMedia;
    await fs.unlinkSync(`database/media/${fd}`);
    data.splice(fil, 1);
    await fs.writeFileSync("database/database.json", JSON.stringify(data));
}

async function getAllArray(page) {
    let data = [];
    const anakKecil = JSON.parse(
        await fs.readFileSync("database/database.json", "utf-8")
    );
    data.push(...anakKecil);
    data.sort(
        (a, b) =>
            new Date(
                `${b.postTime.split(",")[1]} ${b.postTime.split(",")[0]}`
            ) -
            new Date(`${a.postTime.split(",")[1]} ${a.postTime.split(",")[0]}`)
    );
    const itemsPerPage = 8;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
}

const clientPost = {
    post: async (req, res) => {
        const { nama, email } = req.body;
        const file = req.files.file;
        if (
            !email ||
            email == "" ||
            !nama ||
            nama == "" ||
            Object.keys(file).length == 0
        ) {
            return res.status(400).json({
                status: 400,
                mess: "Parameter Invalid!",
                data: "Error"
            });
        }
        let Client = {
            postData: file.data,
            nama: nama,
            email: email,
            postType: file.mimetype,
            namaMedia: null,
            postTime: null
        };
        await addArray(Client);
        res.status(200).json({
            status: 200,
            mess: `Sukses posting dan simpan di database dengan nama ${nama}`,
            data: Client
        });
    },

    getPost: async (req, res) => {
        const { email, uid } = req.query;
        if (!email || email == "" || !uid || uid == "") {
            return res.status(400).json({
                status: 400,
                mess: "Parameter Invalid!",
                data: "Error"
            });
        }
        const getData = await getArray(email, uid, req);
        res.status(getData != null ? 200 : 400).json({
            status: getData != null ? 200 : 400,
            mess:
                getData != null
                    ? "Sukses mengambil data postingan"
                    : "Data tidak ada!",
            data: getData != null ? getData : { error: "Not Found" }
        });
    },

    getCountPost: async (req, res) => {
        const email = req.params.email;
        const total = await countArray(email);
        if (!email || email == "") {
            return res.status(400).json({
                status: 400,
                mess: "Parameter tidak ada!",
                data: "Error"
            });
        }
        res.status(total != 0 ? 200 : 400).json({
            status: total != 0 ? 200 : 400,
            mess:
                total != 0 ? "Sukses mengambil jumlah data" : "Data tidak ada!",
            data: total != 0 ? total : { error: "Not Found" }
        });
    },

    deletePost: async (req, res) => {
        const { email, uid } = req.query;
        if (!email || email == "" || !uid || uid == "") {
            return res.status(400).json({
                status: 400,
                mess: "Parameter Invalid!",
                data: "Error"
            });
        }
        await delArray(email, uid);
        res.status(200).json({
            status: 200,
            mess: "Sukses menghapus data",
            data: "Success"
        });
    },

    getAllPost: async (req, res) => {
        const page = req.query.page ? req.query.page : 1;
        const coser = await getAllArray(page);
        res.status(coser.length != 0 ? 200 : 400).json({
            status: coser.length != 0 ? 200 : 400,
            mess:
                coser.length != 0
                    ? "Sukses mendapatkan 8 data postingan"
                    : `Page ${page} tidak ada`,
            data: coser.length != 0 ? coser : "Not Found"
        });
    }
};

module.exports = clientPost;

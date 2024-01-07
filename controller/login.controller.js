const pool = require("../database/index");

async function getAkun(email) {
    const [results] = await pool.query(
        `SELECT * FROM siswa WHERE email = '${email}'`
    );

    return results;
}

async function isValid(email, pass) {
    const [sel] = await getAkun(email);

    if (sel) {
        if (sel.pass === pass) {
            return {
                isValid: true,
                id: sel.id,
                nama: sel.nama,
                email: sel.email,
                pass: sel.pass
            };
        } else {
            return { isValid: false };
        }
    } else {
        return { isValid: false };
    }
}

const controller = {
    login: async (req, res) => {
        const { email, pass } = req.query;

        if (email != "" && pass != "") {
            const log = await isValid(email, pass);

            if (log.isValid) {
                res.json({
                    status: 200,
                    id: log.id,
                    nama: log.nama,
                    email: log.email,
                    pass: log.pass
                });
            } else {
                res.json({
                    status: 400,
                    error: "Nama / Email Salah"
                });
            }
        } else {
            res.json({
                status: 400,
                error: "Nama / Email Salah"
            });
        }
    }
};

module.exports = controller;

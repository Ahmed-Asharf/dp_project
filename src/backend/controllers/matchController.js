const con = require('../connect');
var axios = require('axios');
const nodemailer = require('nodemailer');

let transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "ahmrledsmart77@gmail.com",
        pass: "hdtyrgzpjwxuejcb",
    },
});

const sendResponse = (message, statusCode, res, isStatus) => {
    return res.status(statusCode).json({
        status: isStatus,
        data: {
            tournament: message,
        },
    });
};


exports.getMatches = (req, res) => {
    let sql = `SELECT * FROM GAMESYSTEM.MATCHES`;
    con.query(sql, (err, docs) => {
        if (err) throw err;
        res.set('Access-Control-Expose-Headers', 'X-Total-Count')
        res.set('X-Total-Count', docs.length)
        res.send(docs);
    });
}
exports.getAMatch = (req, res) => {
    let { id } = req.params;
    let sql = `SELECT * FROM GAMESYSTEM.MATCHES where id = ?`;
    let values = [id];
    con.query(sql, values, (err, docs) => {
        if (err) throw err;
        res.set('Access-Control-Expose-Headers', 'X-Total-Count')
        res.set('X-Total-Count', docs.length)
        res.send(docs[0]);
    });
}

exports.addMatch = async (req, res) => {
    const { id, teamA, teamB, tour_id, winner, match_date } = req.body;
    let sql = `INSERT INTO GAMESYSTEM.MATCHES VALUES(?)`;
    let values = [id, teamA, teamB, tour_id, winner, match_date];
    con.query(sql, [values], (err, docs) => {
        if (err) throw err;
    });
    let response = await axios({
        method: "GET",
        url: `http://localhost:4500/teamplayers/${teamA}`
    });
    console.log(response.data);
    for (let x = 0; x < response.data.length; x++) {
        let player = response.data[x];
        let mailOptions = {
            from: "ahmrledsmart77@gmail.com",
            to: player.email,
            text: `Hello From World Of Gaming ${player.userName}! You have a match with Team "${teamB}" on ${match_date}. Gear yourself up!`,
        };
        transport.sendMail(mailOptions);
    }
    response = await axios({
        method: "GET",
        url: `http://localhost:4500/teamplayers/${teamB}`
    });
    for (let x = 0; x < response.data.length; x++) {
        let player = response.data[x];
        let mailOptions = {
            from: "ahmrledsmart77@gmail.com",
            to: player.email,
            subject,
            text: `Hello From World Of Gaming ${player.userName}! You have a match with Team "${teamA}" on ${match_date}. Gear yourself up!`,
        };
        transport.sendMail(mailOptions);
    }
}

exports.updateMatch = (req, res) => {
    const { id } = req.params;
    console.log(req.body);
    const { teamA, teamB, tour_id, winner, match_date } = req.body;
    let sql = `UPDATE GAMESYSTEM.MATCHES SET teamA = ?, teamB = ?, tour_id = ?,  winner = ?, match_date = ? where id = ?`;
    let values = [teamA, teamB, tour_id, winner, match_date, id];
    con.query(sql, values, (err, docs) => {
        if (err) throw err;
    });
}

exports.deleteMatch = (req, res) => {
    let { id } = req.params;
    let sql = `DELETE FROM GAMESYSTEM.MATCHES WHERE id = ?`;
    let values = [id];
    con.query(sql, [values], (err, docs) => {
        if (err) throw err;
    });
}

exports.upcomingMatches = (req, res) => {
    let { tour_id } = req.params;
    let sql = `SELECT * FROM GAMESYSTEM.MATCHES WHERE WINNER IS NULL AND TOUR_ID = ?`;
    let values = [tour_id];
    con.query(sql, [values], (err, docs) => {
        res.send(docs);
    })
}

exports.previousMatches = (req, res) => {
    let { tour_id } = req.params;
    let sql = `SELECT * FROM GAMESYSTEM.MATCHES WHERE WINNER IS NOT NULL AND TOUR_ID = ?`;
    let values = [tour_id];
    con.query(sql, [values], (err, docs) => {
        res.send(docs);
    })
}
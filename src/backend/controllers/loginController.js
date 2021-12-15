const con = require('../connect');

const sendResponse = (message, statusCode, res, isStatus) => {
    return res.status(statusCode).json({
        status: isStatus,
        data: {
            tournament: message,
        },
    });
};

exports.login = (req, res) => {
    let userName = req.body.email;
    let password = req.body.password;
    con.query("SELECT * FROM gamesystem.players", function (err, result, fields) {
        if (err) throw err;
        for (var x = 0; x < result.length; x++) {
            if (result[x].userName == userName && result[x].password == password) {
                console.log("here");
                res.send({ status: "success" });
                return;
            }
        }
        res.send({ status: "failed" });
    });
}
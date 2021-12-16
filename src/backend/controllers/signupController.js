const con = require('../connect');

const sendResponse = (message, statusCode, res, isStatus) => {
    return res.status(statusCode).json({
        status: isStatus,
        data: {
            tournament: message,
        },
    });
};
exports.signup = (req, res) => {
    console.log(req.body);
    let { userName, firstname, lastname, password, phone, email, isBanned } = req.body;
    let id = userName.slice(0, 2) + password.slice(0, 2);
    noOfTournaments = 1;
    isBanned = 0;
    console.log(req.body);
    con.query("INSERT INTO gamesystem_modified.players(firstname, lastname, userName, password, phone, email, isBanned) VALUES('" + firstname + "', '" + lastname + "', '" + userName + "','" + password + "','" + phone + "','" + email + "','" + isBanned + "');", function (err, result, fields) {
        if (err) throw err;
        console.log("new record added to db");
        res.send({ status: "success" });
    });
}
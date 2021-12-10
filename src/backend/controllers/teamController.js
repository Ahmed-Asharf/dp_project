var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

const sendResponse = (message, statusCode, res, isStatus) => {
    return res.status(statusCode).json({
        status: isStatus,
        data: {
            tournament: message,
        },
    });
};

exports.leaderboard = (req, res) => {
    let {id} = req.params;
    let values = [id];
    let sql = `SELECT TEAM_NAME, SCORE FROM GAMESYSTEM.TEAMS WHERE tour_id = ? ORDER BY SCORE DESC`;
    con.query(sql, values, (err, docs)=>{
        if(err) throw err;
        res.send(docs);
    });
}
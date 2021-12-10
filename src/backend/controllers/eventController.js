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

exports.getNumberOfRegisteredPlayers = (req, res) => {
    const { id } = req.params;
    let sql = `SELECT COUNT(id) AS count FROM gamesystem.PLAYERS GROUP BY tour_id HAVING tour_id = ?`;
    let values = [id];
    con.query(sql, values, (err, docs) => {
        if (err) throw err;
        res.send(docs);
        console.log("count sent!");
    });
}

exports.getEvents = (req, res) => {
    con.query("SELECT * FROM gamesystem.TOURNAMENTS WHERE STARTDATE <= NOW()", function (err, result, fields) {
        if (err) throw err;
        res.set('Access-Control-Expose-Headers', 'X-Total-Count')
        res.set('X-Total-Count', result.length)
        res.send(result)
        console.log("Events sent!");
    });
}

exports.deleteEvent = (req, res) => {
    const { id } = req.params;
    let sql = `delete from gamesystem.tournaments where id = ?`;
    con.query(sql, [id], (err, docs) => {
        if (docs.affectedRows === 0 || err) {
            return sendResponse(
                `No tournament found with that '${id}' `,
                404,
                res,
                'fail'
            );
        }
        return sendResponse(null, 204, res, 'success');
    });
    sql = `delete from gamesystem.tour_info where tour_id = ?`;

    con.query(sql, [id], (err, docs) => {
        if (docs.affectedRows === 0 || err) {
            return sendResponse(
                `No tournament found with that '${id}' `,
                404,
                res,
                'fail'
            );
        }
        return sendResponse(null, 204, res, 'success');
    });
}

exports.addEvent = (req, res) => {
    console.log(req.body);
    const { id, STARTDATE, ENDDATE, PRIZE, IMAGE, TAGLINE, description } = req.body;

    let sql = `insert into gamesystem.tournaments(id,startDate,endDate,prize, image, time_added) values (?)`;

    let values = [id, STARTDATE, ENDDATE, PRIZE, IMAGE, Date.now().toString()];
    console.log(values);
    con.query(sql, [values], (err, docs) => {
        if (err) {
            return sendResponse(err.message, 400, res, 'fail');
        }
    });
    sql = `insert into gamesystem.tour_info values (?)`;
    values = [id, description, TAGLINE]
    con.query(sql, [values], (err, docs) => {
        if (err) {
            return sendResponse(err.message, 400, res, 'fail');
        }
        return sendResponse(true, 201, res, 'success');
    });
}

exports.updateEvent = (req, res) => {
    const { startDate, endDate, prize, game_id, IMAGE, DESCRIPTION } = req.body;
    const { id } = req.params;
    let sql = `update gamesystem.tournaments set startDate = ?, endDate = ?, prize = ?, game_id = ?, image = ? where id = ?`;

    let values = [startDate, endDate, prize, game_id, id, IMAGE];

    con.query(sql, values, (err, docs) => {
        if (docs.affectedRows === 0 || err) {
            return sendResponse(false, 400, res, 'fail');
        }
        return sendResponse(true, 200, res, 'success');
    });
    sql = `update gamesystem.tour_info set description = ? where id = ?`;

    values = [DESCRIPTION];

    con.query(sql, values, (err, docs) => {
        if (docs.affectedRows === 0 || err) {
            return sendResponse(false, 400, res, 'fail');
        }
        return sendResponse(true, 200, res, 'success');
    });
}

exports.getEventInfo = (req, res) => {
    const sql = `SELECT * FROM gamesystem.TOURNAMENTS T LEFT OUTER JOIN gamesystem.TOUR_INFO TI ON T.ID = TI.TOUR_ID WHERE T.STARTDATE <= NOW()`;
    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.set('Access-Control-Expose-Headers', 'X-Total-Count')
        res.set('X-Total-Count', result.length)

        res.send(result)
        console.log("Records sent!");
    });
}

exports.getAnEventInfo = (req, res) => {
    const { id } = req.params;
    console.log(id);
    const sql = `SELECT * FROM gamesystem.TOURNAMENTS T LEFT OUTER JOIN gamesystem.TOUR_INFO TI ON T.id = TI.TOUR_ID where T.id = ?`;
    const values = [id];
    con.query(sql, values, function (err, result, fields) {
        if (err) throw err;
        res.set('Access-Control-Expose-Headers', 'X-Total-Count')
        res.set('X-Total-Count', result.length)

        res.send(result)
        console.log("Records sent!");
    });
}

exports.getRecentEvent = (req, res) => {
    const sql = `SELECT * FROM gamesystem.TOURNAMENTS T LEFT OUTER JOIN gamesystem.TOUR_INFO TI ON T.id = TI.TOUR_ID ORDER BY T.TIME_ADDED DESC`;
    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.set('Access-Control-Expose-Headers', 'X-Total-Count')
        res.set('X-Total-Count', result.length)
        res.send([result[0]])
        console.log("Records sent!");
    });
}

exports.getEventOfUser = (req, res) => {
    const { userName } = req.params;
    const sql = `SELECT * FROM GAMESYSTEM.TOURNAMENTS WHERE id = (SELECT tour_id FROM GAMESYSTEM.PLAYERS WHERE userName = ?)`;
    let values = [userName];
    con.query(sql, values, (err, docs) => {
        if(err) throw err;
        res.send(docs);
    });
}

exports.getUpcoming = (req, res) => {
    const sql = `SELECT * FROM gamesystem.TOURNAMENTS T LEFT OUTER JOIN gamesystem.TOUR_INFO TI ON T.ID = TI.TOUR_ID WHERE T.STARTDATE > NOW()`;
    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.set('Access-Control-Expose-Headers', 'X-Total-Count')
        res.set('X-Total-Count', result.length)

        res.send(result)
        console.log("Records sent!");
    });
}
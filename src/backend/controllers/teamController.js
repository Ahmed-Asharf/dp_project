const con = require('../connect');
const nodemailer = require('nodemailer');
var axios = require('axios');


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
exports.deleteTeam = (req, res) => {
    let {id} = req.params;
    let sql = `DELETE FROM gamesystem_modified.TEAMS WHERE id = ?`;
    let values = [id];
    con.query(sql, values, (err, docs)=>{
        if(err) throw err;
        res.send();
    });
}

exports.getTeams = (req, res) => {
    let sql = `SELECT * FROM gamesystem_modified.TEAMS`;
    con.query(sql, (err, docs) => {
        if (err) throw err;
        res.set('Access-Control-Expose-Headers', 'X-Total-Count')
        res.set('X-Total-Count', docs.length)
        res.send(docs);
    });
}
exports.getATeam = (req, res) => {
    const {id} = req.params;
    let sql = `SELECT * FROM gamesystem_modified.TEAMS where id = ?`;
    let values = [id];
    con.query(sql, values, (err, docs) => {
        if (err) throw err;
        res.set('Access-Control-Expose-Headers', 'X-Total-Count')
        res.set('X-Total-Count', docs.length)
        res.send(docs[0]);
    });
}

exports.leaderboard = (req, res) => {
    let { id } = req.params;
    let values = [id];
    let sql = `SELECT TEAM_NAME, SCORE FROM gamesystem_modified.TEAMS WHERE tour_id = ? ORDER BY SCORE DESC`;
    con.query(sql, values, (err, docs) => {
        if (err) throw err;
        res.send(docs);
    });
}

exports.registerTeam = async (req, res) => {
    let team = req.body.teamData;
    console.log(req.body.teamData);
    let team_name = team.team_name;
    let tour_id = team.tour_id;
    let members = team.members;
    //adding a team in team table
    let sql = `INSERT INTO gamesystem_modified.TEAMS(team_name, tour_id) VALUES(?)`;
    let values = [team_name, tour_id];
    con.query(sql, [values], (err, docs) => {
        if (err) throw err;
        let team_id = docs.insertId;
        for (let x = 0; x < members.length; x++) {
            let userName = members[x].name;
            console.log(userName);
            //adding each member in players table

            sql = `UPDATE gamesystem_modified.PLAYERS SET team_id = '${team_id}', tour_id = '${tour_id}'  WHERE userName = '${userName}'`;
            con.query(sql, (err, docs) => {
                if(err) throw err;
                console.log("member added");
            });
        }
    });
    console.log("team added");

    //send email
    let response = await axios({
        method: "GET",
        url: `http://localhost:4500/eventinfo/${tour_id}`
    });
    console.log(response.data);
    let tour_name = response.data.tour_name;
    for(var x = 0; x < members.length; x++){
        let member = members[x];
        let email = member.email;
        let userName = member.name;
        let teamName = team_name;
        let mailOptions = {
            from: "ahmrledsmart77@gmail.com",
            to: email,
            text: `Hello From World Of Gaming ${userName}! You have been registered in the event "${tour_name}" as team "${teamName}". It's high time to showcase your skills!`,
        };+
        
        transport.sendMail(mailOptions);
    }

}


exports.getTeamplayers = (req, res) => {
    let {team_Name} = req.params;
    let sql = `SELECT p.userName, p.email, T.team_name, TOUR.tour_name from gamesystem_modified.PLAYERS p LEFT OUTER JOIN gamesystem_modified.TEAMS T ON P.TEAM_ID = T.ID LEFT OUTER JOIN gamesystem_modified.TOURNAMENTS TOUR ON T.TOUR_ID = TOUR.ID WHERE T.TEAM_NAME = ?`;
    let values = [team_Name];
    con.query(sql, [values], (err, docs) => {
        if(err) throw err;
        res.send(docs);
    })
}

exports.getTeamByName = (req, res) => {
    let {team_Name} = req.params;
    let sql = `SELECT id from gameSystem_modified.teams where team_Name = ?`;
    let values = [team_Name];
    con.query(sql, values, (err, docs)=>{
        res.send(docs);
    });
}
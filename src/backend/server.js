const express = require('express');
var cors = require('cors');
const app = express();
const nodemailer = require('nodemailer');
const con = require('./connect')


con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});


const userController = require('./controllers/userController');
const loginController = require('./controllers/loginController');
const signupController = require('./controllers/signupController');
const eventController = require('./controllers/eventController');
const teamController = require('./controllers/teamController');
const matchController = require('./controllers/matchController');
const { match } = require('assert');
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.urlencoded({ extended: false }));
app.listen(4500, (req, res) => {
  console.log("listening in port 4500...");
});
app.post('/regUserEvent', userController.registerUserInEvent);
app.post('/cancelReg', userController.cancelRegistration);
app.get('/users', userController.getUsers);
app.post('/users', userController.addUser);
app.put('/users/:id', userController.updateUser);
app.get('/users/:id', userController.getAUser);
app.get('/usersName/:userName', userController.getAUserbyName);
app.delete('/users/:id', userController.deleteUser);
app.get('/playerProfile/:name', userController.playerProfile);

app.get('/registeredPlayers/:id', eventController.getNumberOfRegisteredPlayers);
app.get('/events', eventController.getEvents);
app.delete('/eventinfo/:id', eventController.deleteEvent);
app.post('/eventinfo', eventController.addEvent);
app.put('/eventinfo/:id', eventController.updateEvent);
app.get('/eventinfo', eventController.getEventInfo);
app.get('/eventinfo/:id', eventController.getAnEventInfo);
app.get('/recentEvent', eventController.getRecentEvent);
app.get('/event/:userName', eventController.getEventOfUser);
app.get('/upcomingEvents', eventController.getUpcoming);
app.get('/maxplayers/:id', eventController.getMaxplayers);
app.get('/registeredTeams/:id', eventController.getTeams);



app.get('/leaderboard/:id', teamController.leaderboard);
app.get('/teams', teamController.getTeams);
app.post('/registerTeam', teamController.registerTeam);
app.get('/teamplayers/:team_Name', teamController.getTeamplayers);

app.post('/signup', signupController.signup);

app.post('/login', loginController.login)

app.get('/matches', matchController.getMatches);
app.post('/matches', matchController.addMatch);
app.put('/matches/:id', matchController.updateMatch);
app.get('/matches/:id', matchController.getAMatch);
app.delete('/matches/:id', matchController.deleteMatch);
app.get('/previousMatches/:tour_id', matchController.previousMatches);
app.get('/upcomingMatches/:tour_id', matchController.upcomingMatches);
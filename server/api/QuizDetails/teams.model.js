var mongoose = require('mongoose');
const { Schema }= mongoose;

const teamsDetailsMode= Schema({
    teamName: String,
    teamID: String
});

module.exports = mongoose.model('teams', teamsDetailsMode);
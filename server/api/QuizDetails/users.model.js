var mongoose = require('mongoose');
const { Schema } = mongoose;

const quizDetailsMode = Schema({
    tcsUserId: String,
    password: String,
    emailId: String,
    teamName: String,
    userType: Number
});

module.exports = mongoose.model( 'users', quizDetailsMode );
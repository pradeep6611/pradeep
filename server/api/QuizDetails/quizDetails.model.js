var mongoose = require('mongoose');
const { Schema } = mongoose;

var quizDetailsMode = Schema({
    userName: String,
    userId: String,
    module_id: Number,
    answersArray:[{ 
      questionNo: {type: Number},
      questionId: {type: String},
      questionAnswer: {type: String},
      actualAnswer: {type: String},
      isCorrect: {type: Boolean} 
    }],
    result: Number,
    employeeID: { type: Schema.Types.ObjectId, ref: 'users'},
    attemptsArray:[{
      attemptNumber: {type: Number},
      totalQuestionNum: {type: Number},
      correctAnswered: {type: Number},
      percentage: {type: Number}  
    }],
    totalQuestionNum: Number,
    percentage: Number             
});

module.exports = mongoose.model( 'EmployeeQuizDetails', quizDetailsMode );
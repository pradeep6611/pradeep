'use strict';

const express = require('express');
var controller = require('./quizDetails.controller');
var Router  = require('router');
var router = Router();

router.post('/save/QuizData',controller.saveQuizDetails);
router.post('/getData/getQuizData',controller.getQuizDetails);
router.post('/getData/getEmpDetail',controller.getEmpDetail);
router.post('/auth/userAuthentication',controller.userAuthentication);
router.post('/signUp/Create',controller.createSignUp);
router.get('/signUp/duplicateCheck',controller.duplicateCheck);
router.post('/teams/createTeam',controller.createTeam);
router.get('/teams/getTeams',controller.getTeams);

module.exports = router;
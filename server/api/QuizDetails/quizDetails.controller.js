var _ = require('lodash');
var quizDetailTable = require('./quizDetails.model');
var usersTable = require('./users.model');
var teamsTable = require('./teams.model');
var async = require('async');

exports.createSignUp = (req, res) => {
    usersTable.create(req.body, function (err, data) {
        if (err) {
            return res.send(500, { status: "Failed" });
        }
        return res.json(201, { status: "Success" });
    });
}

exports.duplicateCheck = (req, res) => {
    usersTable.find({ tcsUserId: req.query.tcsUserId }, function (err, data) {
        if (err) {
            return res.send(500, { status: "Failed" });
        }
        if (data.length > 0) {
            return res.json(201, { duplicateCheck: true });
        } else {
            return res.json(201, { duplicateCheck: false });
        }

    });
}

exports.getEmpDetail = (req, res) => {
    usersTable.find({ _id: req.body.empID }).lean().populate().exec(function (err, empDetail) {
        if (err) {
            return res.send(200, { teamName: "null" });
        }
        var sendDetail = empDetail[0];
        delete sendDetail.password;
        return res.json(201, sendDetail);


    });
}

exports.userAuthentication = (req, res) => {
    usersTable.find({ tcsUserId: req.body.body.userId, password: req.body.body.password }).lean().exec(function (err, userData) {
        var userDetails = userData;
        if (userDetails.length > 0) {
            var sendObj = userDetails[0];
            sendObj.validUser = true;
            if(sendObj.password){
                delete sendObj.password;
            }
            return res.json(201, sendObj);
        } else {
            return res.json(201, { validUser: false });
        }

    });
}

exports.saveQuizDetails = (req, res) => {

    quizDetailTable.find({ employeeID: req.body.employeeID, module_id: req.body.module_id }).lean().exec(function (err, dbData) {
        if (err) {
            return res.send(500, err);
        }
        if (dbData.length > 0) {
            var updateobj = req.body;
            if (updateobj._id) {
                delete updateobj._id;
            }
            quizDetailTable.updateOne({ _id: dbData[0]._id }, { $set: updateobj }, function (err, data) {
                if (err) {
                    return res.send(500, err);
                }
                quizDetailTable.find({ employeeID: req.body.employeeID }).lean().exec(function (err, dbData) {
                    return res.json(201, dbData);
                });
            });
        } else {
            var updateobj = req.body;
            if (updateobj._id) {
                delete updateobj._id;
            }
            quizDetailTable.create(req.body, function (err, data) {
                if (err) {
                    return res.send(500, err);
                }
                quizDetailTable.find({ employeeID: req.body.employeeID }).lean().exec(function (err, dbData) {
                    return res.json(201, dbData);
                });
            });
        }
    });
}

exports.getQuizDetails = (req, res) => {
    quizDetailTable.find({ employeeID: req.body.empID }).lean().exec(function (err, dbData) {
        return res.json(201, dbData);
    });
}

exports.createTeam = (req, res) => {
    var teamsObject = [{ teamName: "Data Services", teamID: "005" }, { teamName: "B2B Support", teamID: "006" }, { teamName: "GRS Support", teamID: "007" }, { teamName: "OLS Support", teamID: "008" }, { teamName: "PMS Support", teamID: "009" }, { teamName: "HCM Support", teamID: "010" }]
    teamsTable.find({}).lean().exec(function (err, teamsData) {
        if (teamsData.length > 0) {
            return res.json(201, { status: "Success" });
        } else {
            async.eachSeries(teamsObject, function (eachData, callback) {
                teamsTable.create(eachData, function (err, data) {
                    callback(null);
                });
            }, function (err) {
                return res.json(201, { status: "Success" });
            });
        }

    });
}

exports.getTeams = (req, res) => {
    teamsTable.find({}).lean().exec(function (err, teamsData) {
        return res.json(201, teamsData);
    });
}

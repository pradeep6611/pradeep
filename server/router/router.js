'use strict';
var path =require('path');

module.exports=(app)=>{

 app.use('/api/QuizDetails',require('../api/QuizDetails'))

//  app.route('/*').get((req,res,next)=>{
//     console.log('coming')
//     res.sendFile(app.get('appPath') + '/dist/mean/index.html');
//  });

}

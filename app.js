
// https://medium.com/of-all-things-tech-progress/5-steps-to-build-a-rest-api-in-node-js-with-mongodb-e1f2113a39bd

var express = require('express');
var app = express();
var router = require('./router');
var logger = require('morgan');

var jsonparser = require('body-parser').json;
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/QA');
const db = mongoose.connection;

db.on('error', err => {
  console.log('Error connecting Database');
});

db.on('open', () => {
  console.log('DB Connected successsfully !!!');
});

app.use(jsonparser());
app.use(logger('dev'));
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept'
//   );
//   if (req.method === 'Options') {
//     res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE');
//     return res.status(200).json({});
//   }
// });

app.get('/',function(req, res) {
    console.log('please use /questions API');
    res.end('Hello .. ');
});
app.use('/questions', router);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
});

app.listen(3000, function() {
    console.log('Started listening on 3000');
})
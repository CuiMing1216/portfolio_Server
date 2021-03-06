var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//
var cors = require('cors');
var dotenv = require('dotenv');
//

var mongoose = require('mongoose');
var post_page = require('./routes/post_page');
var result_page = require('./routes/result_page');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var trackRouter = require('./routes/track');
var resumeRouter = require('./routes/resume');

var app = express();

dotenv.config({ path: path.resolve(__dirname, '.env') });

mongoose
  .connect(process.env.MONGODB_URL, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .catch(err => console.error(err));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/post_page', post_page);
app.use('/result_page', result_page);
app.use('/track', trackRouter);
app.use('/resume', resumeRouter);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;

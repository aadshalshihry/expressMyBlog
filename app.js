import createError from 'http-errors';
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import sassMiddleware from 'node-sass-middleware';
// import Promise from "bluebird";
import session from 'express-session';

import passport from 'passport';
import passportConfig from './passport';
import flash from 'connect-flash';

// Import Routers
import indexRouter from './routes/index.router';
import authRouter from './routes/auth.router';
import userRouter from './routes/users.router';
import postRouter from './routes/posts.router';
import config from "./utils/hbsConfig";

// import utlis
import hbsConfig from './utils/hbsConfig';

// Init express
const app = express();
global.appRoot = path.resolve(__dirname);

// asgin mongoose.Proimse either to global or to bluebird
mongoose.Promise = global.Promise;
// connect and init mongoose
const db = mongoose.connect('mongodb://localhost/expressMyBlog')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbsConfig();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}));

app.use(express.static(path.join(__dirname, 'public')));

// Config express session
const MongoStore = require('connect-mongo')(session);
app.use(session({
    secret: 'tut',
    saveUninitialized: false,
    resave: false,
    ttl: 1, // = 14 days. Default
    autoRemove: 'interval',
    autoRemoveInterval: 1, // In minutes. Default
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    })
}));

// Config passport
passportConfig(passport);

app.use(passport.initialize());
app.use(passport.session());

// Config flash
app.use(flash());

// Router
indexRouter(app);
authRouter(app, passport);
userRouter(app);
postRouter(app);


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

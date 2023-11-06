const bodyParser = require('body-parser');
const express = require('express');
const hrRouter = require('../routes/hrRoutes');
const customLogger = require('../middlewares/customLogger');
const { globalErrorHandler, notFound } = require('../middlewares/errorHandler');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const HR = require('../model/hrSchema');

const app = express();

app.use(customLogger);
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: 'I am getting there',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Passport Configuration
// passport.use(
//   new LocalStrategy({usernameField: 'email'},function (username, password, done) {
//     User.findOne({ username: username }, function (err, user) {
//       if (err) {
//         return done(err);
//       }
//       if (!user) {
//         return done(null, false);
//       }
//       if (!user.verifyPassword(password)) {
//         return done(null, false);
//       }
//       return done(null, user);
//     });
//   })
// );
passport.use(HR.createStrategy())


passport.serializeUser(HR.serializeUser());

passport.deserializeUser(HR.deserializeUser());

// Routes
const endpoint = 'api/v1/hr';
app.use('/api/v1/hrs/', hrRouter);

app.use(notFound);
app.use(globalErrorHandler);

module.exports = app;

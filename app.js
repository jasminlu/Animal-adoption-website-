var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mysql = require('mysql');
var dbConnectionPool = mysql.createPool({
    host: '127.0.0.1',
    database: 'wdcpa'
});

var app = express();
const port = 8000;

app.use(function(req,res,next){
    req.pool = dbConnectionPool;
    next();
});

var sessionStore = new MySQLStore({}, dbConnectionPool);
app.use(session({
    secret: 'hellosecret',
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        httpOnly: false,
        secure: false,
        maxAge: (24*60*60*1000)
    }
}))

// var nodemailer = require("nodemailer");

// let transporter = nodemailer.createTransport({
//   host: "smtp.ethereal.email",
//   port: 587,
//   secure: false,
//   auth: {
//     user: "carolyn.west@ethereal.email",
//     pass: "DskDHSj6XjFWk1p1mT",
//   },
// });

// app.post('/send', function(req, res, next) {
//   let info = transporter.sendMail({
//     from: '"WDCPA" <carolyn.west@ethereal.email>',
//     to: req.body.email,
//     subject: "Welcome to WDCPA Emails",
//     text: "Thank you for signing up to email notifications!",
//     html: "<b>Thank you for signing up to email notifications!</b>",
//   });

//   transporter.sendMail(info, (error, info) => {
//     if (error) {
//         return console.log(error);
//     }
//     console.log('Message sent: %s', info.messageId);
//     console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
//     res.render('contact', {msg: 'Email has been sent'});
// });
// })

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//userInfo cookies
app.use('/', indexRouter);
app.use('/', usersRouter);

// app.post('/login', (req, res) => {
//     const { username, password } = req.body;
//     const query = 'SELECT * FROM user WHERE email = ? AND hash = ?';
//     db.query(query, [username, password], (err, results) => {
//         if (err) throw err;
//         console.log(results);
//         if (results.length > 0) {
//             const userId = results[0].userID;
//             //req.cookie('userID', userId, { httpOnly: true, path: '/' });
//             req.session.userID=userId;
//             console.log(req.session.userID);
//             res.send({ success: true });
//         } else {
//             res.send({ success: false });
//         }
//     });
// });

// app.get('/profile', (req, res) => {
//     const userId = req.session.userID;
//     if (userId) {
//         const query = 'SELECT * FROM user WHERE userID = ?';
//         db.query(query, [userId], (err, results) => {
//             if (err) throw err;
//             if (results.length > 0) {
//                 res.send(results[0]);
//                 console.log('get request');
//                 res.redirect('/userinfo');
//             } else {
//                 res.send({ error: 'User not found' });
//             }
//         });
//     } else {
//         res.send({ error: 'Not authenticated' });
//     }
// });


app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

module.exports = app;

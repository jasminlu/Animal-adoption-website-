var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/',function(req,res){
  req.protocol.getConnection(function(err,connection){
    if (err) {
      res.sendStatus(500);
      return;
    }
  });
});

/* RSVPS */
var rsvpcount = 0;
router.post('/rsvps', function(req, res, next) {
  rsvpcount++;
  var userid = 6;
  var eventid = 0;
  if (req.body == '1') {
    eventid = 1;
  } else if (req.body == '2') {
    eventid = 2;
  } else if (req.body == '3') {
    eventid = 3;
  } else if (req.body == '4') {
    eventid = 4;
  } else if (req.body == '5') {
    eventid = 5;
  } else {
    eventid = 5;
  }
  console.log('Received data:', req.body); // Log the received data
  req.pool.getConnection(function(err, connection) {
    if (err) {
      console.error('Error getting connection:', err);
      res.sendStatus(500);
      return;
    }
    const query = "INSERT INTO rsvp (userID, eventID) VALUES (?, ?)";
    connection.query(query, [userid, eventid], function(err, result) {
      connection.release();
      if (err) {
        console.error('Error executing query:', err);
        res.sendStatus(500);
        return;
      }
      res.sendStatus(200); // Send success status
    });
  });
});

/* FOSTERING */
var fostercount = 0;
router.post('/animals', function(req, res, next) {
  fostercount++;
  var userid = 6;
  if (req.body == '1') {
    animalid = 1;
  } else if (req.body == '2') {
    animalid = 2;
  } else if (req.body == '3') {
    animalid = 3;
  } else {
    animalid = 4;
  }
  console.log('Received data:', req.body); // Log the received data
  req.pool.getConnection(function(err, connection) {
    if (err) {
      console.error('Error getting connection:', err);
      res.sendStatus(500);
      return;
    }
    const query = "INSERT INTO foster (userID, animalID, active, endTime) VALUES (?, ?, ?, null)";
    connection.query(query, [userid, animalid, true, null], function(err, result) {
      connection.release();
      if (err) {
        console.error('Error executing query:', err);
        res.sendStatus(500);
        return;
      }
      res.sendStatus(200); // Send success status
    });
  });
});

/* EMAILING */
var nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "carolyn.west@ethereal.email",
    pass: "DskDHSj6XjFWk1p1mT",
  },
});

router.post('/send', function(req, res, next) {
  let info = transporter.sendMail({
    from: '"WDCPA" <carolyn.west@ethereal.email>',
    to: req.body.email,
    subject: "Welcome to WDCPA Emails",
    text: "Thank you for signing up to email notifications!",
    html: "<b>Thank you for signing up to email notifications!</b>",
  });
  res.send();
})

const bcrpyt = require('bcrypt');
const saltRounds = 10;

// Sign up
router.post('/signup', function(req, res, next) {
  const { firstName, lastName, location, phone, email, password } = req.body;

  console.log('Received data:', req.body); // Log the received data

  // Hash the password
  bcrpyt.genSalt(saltRounds, (err, salt) => {
    if (err) {
      console.error("Error generating salt:", err);
      res.sendStatus(500);
      return;
    }

    bcrpyt.hash(password, salt, (err, hash) => {
      if (err) {
        console.error("Error hashing password:", err);
        res.sendStatus(500);
        return;
      }
      // Connection
      req.pool.getConnection(function(err, connection) {
        if (err) {
          console.error('Error getting connection:', err);
          res.sendStatus(500);
          return;
        }
        const query = "INSERT INTO user (firstName, lastName, locationID, phone, email, hash) VALUES (?, ?, ?, ?, ?, ?)";
        connection.query(query, [firstName, lastName, location, phone, email, hash], function(err, result) {
          connection.release();

          if (err) {
            console.error('Error executing query:', err);
            res.sendStatus(500);
            return;
          }

          console.log('User registered successfully:', result);
          res.sendStatus(200); // Send success status
        });
      });
    });
  });
});

router.post('/login', function(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  // Get connection from the pool
  req.pool.getConnection(function(err, connection) {
    if (err) {
      console.error('Error getting connection:', err);
      res.sendStatus(500);
      return;
    }

    // Query to get the hashed password
    const query = "SELECT hash, userID FROM user WHERE email = ?";
    connection.query(query, [email], function(err, results) {
      connection.release();

      if (err) {
        console.error('Error executing query:', err);
        res.sendStatus(500);
        return;
      }

      if (results.length === 0) {
        // No user found with that email
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const hashedPassword = results[0].hash;
      const userId = results[0].userID;

      // Compare the provided password with the hashed password
      bcrpyt.compare(password, hashedPassword, (err, result) => {
        if (err) {
          console.error('Error comparing passwords:', err);
          res.sendStatus(500);
          return;
        }
        if (result) {
          // Passwords match, authentication successful
          console.log('Passwords match! User authenticated.');
          req.session.userID=userId;
          console.log(req.session.userID);
          res.sendStatus(200);
        } else {
          // Passwords do not match
          console.log('Passwords do not match! Authentication failed.');
          res.status(401).json({ message: "Invalid email or password" });
        }
      });
    });
  });
});

//This is the personal info for profile pages.
router.get('/personal', function(req, res, next) {
  if (!req.session.userID) {
    return res.status(401).json({ message: "You are not logged in" });
  }

  const userId = req.session.userID;
  req.pool.getConnection(function(err, connection) {
    if (err) {
      console.error('Error getting connection:', err);
      res.sendStatus(500);
      return;
    }
    var query = "SELECT firstName, lastName, bio FROM user WHERE userID = ?";
    connection.query(query, [userId], function(err, rows, fields) {
      connection.release();
      if (err) {
        console.error('Error executing query:', err);
        res.sendStatus(500);
        return;
      }
      if (rows.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      const personalHTML = rows.map((post) => {
        return `
          <p>Name: ${post.firstName} ${post.lastName}</p>
          <p>Bio: ${post.bio}</p>
          <hr>
        `;
      }).join('');
      res.send(personalHTML); // Send only the HTML content
    });
  });
});

//Check if admin, manager or user
router.get('/checker', function(req, res, next) {
  if (!req.session.userID) {
    return res.status(401).json({ message: "You are not logged in" });
  }

  const userId = req.session.userID;
  req.pool.getConnection(function(err, connection) {
    if (err) {
      console.error('Error getting connection:', err);
      res.sendStatus(500);
      return;
    }
    var query = "SELECT posID FROM user WHERE userID = ?";
    connection.query(query, [userId], function(err, rows, fields) {
      connection.release();
      if (err) {
        console.error('Error executing query:', err);
        res.sendStatus(500);
        return;
      }
      if (rows.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      const posID = rows[0].posID;
      if (posID === 1) {
        res.redirect('/admininfo.html');
      } else if (posID === 2) {
        res.redirect('/managerinfo.html');
      } else {
        res.redirect('/userinfo.html'); // Redirect users to their own page
      }
    });
  });
});


//log out
router.get('/logout', function(req, res, next) {
  req.session.destroy(function(err) {
    if (err) {
      console.error('Error destroying session:', err);
      res.sendStatus(500);
      return;
    }
    res.clearCookie('connect.sid');
    res.redirect('/');
  });
});

router.get('/profile', (req, res) => {
  const userId = req.session.userID;
  if (userId) {
      const query = 'SELECT * FROM user WHERE userID = ?';
      db.query(query, [userId], (err, results) => {
          if (err) throw err;
          if (results.length > 0) {
              res.send(results[0]);
              console.log('get request');
              res.redirect('/userinfo');
          } else {
              res.send({ error: 'User not found' });
          }
      });
  } else {
      res.send({ error: 'Not authenticated' });
  }
});

//darkmode cookies

router.get('/cookie', function(req,res,next){

  res.cookie();
  res.send();
  next();
})

//Create Posts
router.post('/posts', function(req, res, next) {
  const { userID, postTitle, message, privatepub } = req.body;

  console.log('Received data:', req.body); // Log the received data

  // Connection
  req.pool.getConnection(function(err, connection) {
    if (err) {
      console.error('Error getting connection:', err);
      res.sendStatus(500);
      return;
    }
    const query = "INSERT INTO post (userID, postTitle, message, private) VALUES (?, ?, ?, ?)";
    connection.query(query, [userID, postTitle, message, privatepub], function(err, result) {
      connection.release();

      if (err) {
        console.error('Error executing query:', err);
        res.sendStatus(500);
        return;
      }

      console.log('Posted successfully:', result);
      res.sendStatus(200); // Send success status
    });
  });
});

//Create Events
router.post('/events', function(req, res, next) {
  const { eventName, description, location, dateTime, rsvp, eventType } = req.body;

  console.log('Received data:', req.body); // Log the received data

  // Connection
  req.pool.getConnection(function(err, connection) {
    if (err) {
      console.error('Error getting connection:', err);
      res.sendStatus(500);
      return;
    }
    const query = "INSERT INTO events (eventName, description, locationID, dateTime, rsvpRequired, eventTypeID) VALUES (?, ?, ?, ?, ?, ?)";
    connection.query(query, [eventName, description, location, dateTime, rsvp, eventType], function(err, result) {
      connection.release();

      if (err) {
        console.error('Error executing query:', err);
        res.sendStatus(500);
        return;
      }

      console.log('Posted successfully:', result);
      res.sendStatus(200); // Send success status
    });
  });
});

//Create New Admin
router.post('/admin', function(req, res, next) {
  const { position, userID } = req.body;

  console.log('Received data:', req.body); // Log the received data

  // Connection
  req.pool.getConnection(function(err, connection) {
    if (err) {
      console.error('Error getting connection:', err);
      res.sendStatus(500);
      return;
    }
    const query = "UPDATE user SET posID = ? WHERE userID = ?";
    connection.query(query, [position, userID], function(err, result) {
      connection.release();

      if (err) {
        console.error('Error executing query:', err);
        res.sendStatus(500);
        return;
      }

      console.log('Changed successfully:', result);
      res.sendStatus(200); // Send success status
    });
  });
});

//Get Users
router.get('/displayuser', function(req, res, next) {
  req.pool.getConnection(function(err, connection) {
    if (err) {
      console.error('Error getting connection:', err);
      res.sendStatus(500);
      return;
    }
    var query = "SELECT firstName, lastName, userID FROM user";
    connection.query(query, function(err, rows, fields) {
      connection.release();
      if (err) {
        console.error('Error executing query:', err);
        res.sendStatus(500);
        return;
      }
      res.json({ rows });
    });
  });
});

//Delete User
router.post('/deleteUser', function(req, res, next) {
  const { userID } = req.body;

  console.log('Received data:', req.body); // Log the received data

  // Connection
  req.pool.getConnection(function(err, connection) {
    if (err) {
      console.error('Error getting connection:', err);
      res.sendStatus(500);
      return;
    }
    const query = "DELETE FROM user WHERE userID = ?";
    connection.query(query, [userID], function(err, result) {
      connection.release();

      if (err) {
        console.error('Error executing query:', err);
        res.sendStatus(500);
        return;
      }

      console.log('Changed successfully:', result);
      res.sendStatus(200); // Send success status
    });
  });
});

//Delete RSVP
router.post('/deleteRSVP', function(req, res, next) {
  const { rspvID } = req.body;

  console.log('Received data:', req.body); // Log the received data

  // Connection
  req.pool.getConnection(function(err, connection) {
    if (err) {
      console.error('Error getting connection:', err);
      res.sendStatus(500);
      return;
    }
    const query = "DELETE FROM rsvp WHERE rspvID = ?";
    connection.query(query, [rspvID], function(err, result) {
      connection.release();

      if (err) {
        console.error('Error executing query:', err);
        res.sendStatus(500);
        return;
      }

      console.log('Deleted successfully:', result);
      res.sendStatus(200); // Send success status
    });
  });
});


//Get Users for managers
router.get('/displayman', function(req, res, next) {
  req.pool.getConnection(function(err, connection) {
    if (err) {
      console.error('Error getting connection:', err);
      res.sendStatus(500);
      return;
    }
    var query = "SELECT firstName, lastName, userID FROM user";
    connection.query(query, function(err, rows, fields) {
      connection.release();
      if (err) {
        console.error('Error executing query:', err);
        res.sendStatus(500);
        return;
      }
      res.json({ rows });
    });
  });
});

//Get RSVP
router.get('/rspvusers', function(req, res, next) {
  req.pool.getConnection(function(err, connection) {
    if (err) {
      console.error('Error getting connection:', err);
      res.sendStatus(500);
      return;
    }
    var query = "SELECT r.rspvID, e.eventName, u.firstName, u.lastName FROM rsvp r JOIN events e ON r.eventID = e.eventID JOIN user u ON r.userID = u.userID;";
    //var query = "SELECT user.firstName, user.lastName, user.userID FROM user JOIN rsvp ON user.rsvpID = rsvp.rspvID;";
    connection.query(query, function(err, rows, fields) {
      connection.release();
      if (err) {
        console.error('Error executing query:', err);
        res.sendStatus(500);
        return;
      }
      res.json({ rows });
    });
  });
});

//Posts
router.get('/userinfo', function(req, res, next) {
  req.pool.getConnection(function(err, connection) {
    if (err) {
      console.error('Error getting connection:', err);
      res.sendStatus(500);
      return;
    }
    var query = "SELECT postTitle, message FROM post";
    connection.query(query, function(err, rows, fields) {
      connection.release();
      if (err) {
        console.error('Error executing query:', err);
        res.sendStatus(500);
        return;
      }
      const postsHtml = rows.map((post) => {
        return `
          <h3>${post.postTitle}</h3>
          <p>${post.message}</p>
          <hr>
        `;
      }).join('');
      res.send(postsHtml); // Send only the HTML content
    });
  });
});

//Posts
// router.get('/personal', function(req, res, next) {
//   req.pool.getConnection(function(err, connection) {
//     if (err) {
//       console.error('Error getting connection:', err);
//       res.sendStatus(500);
//       return;
//     }
//     var query = "SELECT firstName, lastName, position, bio FROM user";
//     connection.query(query, function(err, rows, fields) {
//       connection.release();
//       if (err) {
//         console.error('Error executing query:', err);
//         res.sendStatus(500);
//         return;
//       }
//       const postsHtml = rows.map((post) => {
//         return `
//           <p>Name: ${user.firstName} ${user.lastName}</p>
//           <p>Position: ${pos.pos}</p>
//           <p>Bio: ${user.bio}</p>
//           <hr>
//         `;
//       }).join('');
//       res.send(postsHtml); // Send only the HTML content
//     });
//   });
// });

module.exports = router;
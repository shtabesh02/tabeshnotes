// backend/routes/index.js
// const express = require('express');
// const router = express.Router();

const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const { restoreUser } = require("../../utils/auth.js");

const apiRouter = require('./api');

router.use(restoreUser);
router.use('/api', apiRouter);

// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null

  router.use('/session', sessionRouter);
  
  router.use('/users', usersRouter);
  
  router.post('/test', (req, res) => {
    res.json({ requestBody: req.body });
  });
  

// Test Route
// router.get('/hello/world', function(req, res) {
//   res.cookie('XSRF-TOKEN', req.csrfToken());
//   res.send('Hello World!');
// });


// Add a XSRF-TOKEN cookie
router.get("/api/csrf/restore", (req, res) => {
    const csrfToken = req.csrfToken();
    res.cookie("XSRF-TOKEN", csrfToken);
    res.status(200).json({
      'XSRF-Token': csrfToken
    });
  });
  
module.exports = router;
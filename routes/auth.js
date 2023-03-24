'use strict';

const express = require('express');

const authCtrl = require('../controllers/Authendication');

const router = express.Router();

// signup new user
router.route('/signup').post(authCtrl.createUser)
router.route('/login').post(authCtrl.login)



module.exports = router;

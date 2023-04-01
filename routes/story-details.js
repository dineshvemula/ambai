'use strict';

const express = require('express');

const storyDetailsCtrl = require('../controllers/Story/story-details');
const { checkToken } = require("../services/auth");

const router = express.Router();

router.route('/')
    .post(checkToken, storyDetailsCtrl.createStoryDetails)
    .get(checkToken, storyDetailsCtrl.getStoryDetails)

module.exports = router;

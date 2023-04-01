'use strict';

const express = require('express');

const storyTypeCtrl = require('../controllers/Story/story-type');
const { checkToken } = require("../services/auth");

const router = express.Router();

router.route('/')

    // create story type
    .post(checkToken, storyTypeCtrl.createStoryType)
    .get(checkToken, storyTypeCtrl.getStoryType)

module.exports = router;

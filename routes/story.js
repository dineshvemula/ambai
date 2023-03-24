'use strict';

const express = require('express');

const storyCtrl = require('../controllers/Story');

const router = express.Router();

router.route('/')

    // create story
    .post(storyCtrl.createStory)

module.exports = router;

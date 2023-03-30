'use strict';

const express = require('express');

const storyTypeCtrl = require('../controllers/Story/story-type');

const router = express.Router();

router.route('/')

    // create story type
    .post(storyTypeCtrl.createStoryType)

module.exports = router;

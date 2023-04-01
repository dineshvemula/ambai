'use strict';

const express = require('express');

const storyCtrl = require('../controllers/Story');

const router = express.Router();

router.route('/')

    // create story
    .post(storyCtrl.createStory)
    .get(storyCtrl.getStories)
router.route('/:id')
    .get(storyCtrl.getStories)

module.exports = router;

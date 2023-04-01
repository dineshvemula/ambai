'use strict';

const express = require('express');

const storyCtrl = require('../controllers/Story');
const { checkToken } = require("../services/auth");

const router = express.Router();

router.route('/')

    // create story
    .post(checkToken, storyCtrl.createStory)
    .get(checkToken, storyCtrl.getStories)
router.route('/:id')
    .get(checkToken, storyCtrl.getStoryById)

module.exports = router;

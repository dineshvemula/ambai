'use strict';

const express = require('express');

const storyDetailsCtrl = require('../controllers/Story/story-details');

const router = express.Router();

router.route('/')
    .post(storyDetailsCtrl.createStoryDetails)
    .get(storyDetailsCtrl.getStoryDetails)

module.exports = router;

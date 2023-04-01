'use strict';

const express = require('express');

const storyEpisodeCtrl = require('../controllers/Story/story-episode');

const router = express.Router();

router.route('/')
    .post(storyEpisodeCtrl.createEpisode)

router.route('/:story_id/:episode_no')
    .get(storyEpisodeCtrl.getEpisodes)

module.exports = router;

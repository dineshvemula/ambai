'use strict';

const express = require('express');

const storyEpisodeCtrl = require('../controllers/Story/story-episode');
const { checkToken } = require("../services/auth");


const router = express.Router();

router.route('/')
    .post(checkToken, storyEpisodeCtrl.createEpisode)

router.route('/:story_id')
    .get(checkToken, storyEpisodeCtrl.getEpisodes)

module.exports = router;

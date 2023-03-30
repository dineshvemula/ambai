'use strict';

const express = require('express');

const tagCtrl = require('../controllers/Tags');

const router = express.Router();

router.route('/')

    // create story
    .post(tagCtrl.createMasterTag)
    .get(tagCtrl.getAllMasterTag);

router.route('/:id')
    .get(tagCtrl.getMasterTagById)
    .put(tagCtrl.updateMasterTag);

module.exports = router;

'use strict';

const express = require('express');

const tagCtrl = require('../controllers/Tags');
const { checkToken } = require("../services/auth");


const router = express.Router();

router.route('/')

    // create story
    .post(checkToken, tagCtrl.createMasterTag)
    .get(checkToken, tagCtrl.getAllMasterTag);

router.route('/:id')
    .get(checkToken, tagCtrl.getMasterTagById)
    .put(checkToken, tagCtrl.updateMasterTag);

module.exports = router;

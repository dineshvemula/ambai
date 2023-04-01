'use strict';

const express = require('express');

const categoryCtrl = require('../controllers/Category');
const { checkToken } = require("../services/auth");
const router = express.Router();

router.route('/')

    // create story
    .post(checkToken, categoryCtrl.createMasterCategory)
    .get(checkToken, categoryCtrl.getAllMasterCategories);

router.route('/:id')
    .get(checkToken, categoryCtrl.getMasterCategoryById)
    .put(checkToken, categoryCtrl.updateMasterCategory);

module.exports = router;

'use strict';

const express = require('express');

const categoryCtrl = require('../controllers/Category');

const router = express.Router();

router.route('/')

    // create story
    .post(categoryCtrl.createMasterCategory)
    .get(categoryCtrl.getAllMasterCategories);

router.route('/:id')
    .get(categoryCtrl.getMasterCategoryById)
    .put(categoryCtrl.updateMasterCategory);

module.exports = router;

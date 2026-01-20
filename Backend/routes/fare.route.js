const express = require('express');
const router = express.Router();
const { calculateRideFare } = require('../controllers/fare.controller');

router.get('/fare', calculateRideFare);

module.exports = router;
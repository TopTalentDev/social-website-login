const express = require('express');
const authController = require('../controllers/auth');

const router = express.Router();

router.post('/google', authController.glogin);
router.post('/facebook', authController.flogin);
router.post('/twitter', authController.tlogin);

module.exports = router;

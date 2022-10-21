const express = require('express');
const authController = require('../controllers/auth');

const router = express.Router();

router.post('/google', authController.glogin);
router.post('/facebook', authController.flogin);

module.exports = router;

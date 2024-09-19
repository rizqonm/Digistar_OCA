const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');

router.post('/register', adminController.register);
router.post('/login', adminController.loginAdmin);

module.exports = router;
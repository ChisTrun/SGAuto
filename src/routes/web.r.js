const express = require('express');
const router = express.Router();
const webController = require('../controllers/web.c')

router.get('/',webController.index);
router.get('/login',webController.login);
router.get('/admin',webController.admin);

module.exports = router;
const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

// user
router.get('/signup', authController.signup_get);
router.post('/signup', authController.signup_post);
router.get('/login', authController.login_get);
router.post('/login', authController.login_post);
router.get('/logout', authController.logout_get);

// item
router.get('/listing', authController.listing_get);
router.get('/item/:_id', authController.item_get);
router.get('/create', authController.item_create_page);
router.post('/item', authController.item_post);

// category
router.get('/category', authController.category_get_all);
router.get('/category/:_id', authController.category_get);
router.post('/category', authController.category_post);

module.exports = router;
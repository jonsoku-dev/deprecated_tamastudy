const express = require('express');
const categoryController = require('../controllers/category.controller');
const { isLoggedIn, isAdmin } = require('../middlewares/auth');
const router = express.Router({ mergeParams: true });

// /api/post/category/create
router.post('/create', isLoggedIn, categoryController.createCatrgory);
// /api/post/category/all
router.get('/all', categoryController.getCatrgoryList);
// /api/post/category/:categoryId/delete
router.delete(
  '/:categoryId/delete',
  isLoggedIn,
  categoryController.deleteCatrgory
);

module.exports = router;

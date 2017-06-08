var express = require('express');
var router = express.Router();
module.exports = router;

var categoryController = require('../controllers/category');
var postController = require('../controllers/post');
var userController = require('../controllers/user');


router.route('/get/all/posts')
  .get(postController.getAllPosts);

router.route('/get/all/categories')
  .get(categoryController.getAllCategories);

router.route('/get/post/byCategory/:category_name')
  .get(postController.getPostsByCategory);

router.route('/get/category/byCategoryType/:category_type')
  .get(categoryController.categoryByCategoryType);

router.route('/add/post')
  .post(postController.newPost);

router.route('/add/category')
  .post(categoryController.postCategory);

router.route('/post/comment')
  .post(postController.postComment);

var mongoose = require('mongoose');
var Category = require('../models/category');
var User = require('../models/users');

//post a new category
exports.postCategory = function(req, res, next){
  var category_name = req.body.category_name;
  var type = req.body.category_type;
  var created_by = req.body.created_by;
  var username = req.body.username;
  var email = req.body.email;


  Category.findOne({category_name:category_name}, function(err, category){
      if(err){
        res.status(404);
        res.send(err);
      }
      if(category){
        res.status(404);
        res.json({
            "message": "caetgory already exists"
        })
      }else{
          var category = new Category({
            category_name: category_name,
            type: type,
            created_by: created_by
          });

          category.save(function(err, category){
            if(err){
              res.json({
                        "error": "invalid_request",
                        "error_description": err
                    })
            }
            res.status(200);
            res.json({
              "success": true,
              "message": "Category added successfully",
              "channel": category
            })
          })
          User.findOne({username:username, email:email}, function(err, user){
              if(err){
                res.status(500);
                res.send(err);
              }
              if(user){
                user.categories.push(category_name);
              }else{
                var user = new User({
                  username: username,
                  email: email,
                  categories: category_name
                })
              }

              user.save(function(err, user){
                if(err){
                  res.json({
                            "error": "invalid_request",
                            "error_description": err
                        })
                }
              })
          })
      }

  })
}

//to get all category from db
exports.getAllCategories = function(req, res, body){
  Category.find({}, function(err, categories){
      if(err){
        res.json({
                  "error": "invalid_request",
                  "error_description": err
              })
      }
      var category_typeArray = [];
      var count;
      if(categories){
          categories.forEach(category => {
            count = 0;
            category_typeArray.forEach(elem => {
              if(elem == category.type){
                  count++;
                }
              });
            if(count == 0){
              category_typeArray.push(category.type);
            }
          });

          res.json({
            "message": "Categories",
            "Categories": category_typeArray
          })
      }
  })
}

exports.categoryByCategoryType = function(req, res, next){
  var category_type = req.params.category_type;
  Category.find({type: category_type}, function(err, category){
    if(err){
        res.status(400);
        res.send(err);
    }
    var categoryArray = [];
    category.forEach(elem => {
      categoryArray.push(elem.category_name);
    });
    if(category){
      res.json({
                "category type": category_type,
                "categories": categoryArray
            })
    }else {
      res.json({
                "message": "not such type category exists"
            })
    }
  })
}

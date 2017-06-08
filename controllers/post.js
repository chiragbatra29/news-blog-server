var mongoose = require('mongoose');
var Post = require('../models/posts');
var User = require('../models/users');
var Category = require('../models/category');


//To make a new post to already existing category
exports.newPost = function(req, res, next){
  var username = req.body.username;
  var email = req.body.email;
  var category_type = req.body.category_type;
  var category_name = req.body.category_name;
  var post_name = req.body.post_name;
  var content = req.body.content;

  Post.findOne({post_name:post_name}, function(err, post){
      if(err){
        res.status(400);
        res.send(err);
      }
      if(post){
        res.status(404);
        res.json({
            "message": "post already exists"
        });
      }else {
          var post = new Post({
            post_name: post_name,
            category_name: category_name,
            content: content
          })
          post.save(function(err, post){
            if(err){
              res.json({
                        "error": "invalid_request",
                        "error_description": err
                    })
            }
            res.status(200);
            res.json({
              "success": true,
              "message": "post added successfully",
              "channel": post
            })
          })

          User.findOne({username: username, email:email}, function(err, user){
              if(err){
                res.status(400);
                res.send(err);
              }
              if(user){
                user.posts.push(post_name);
              }else{
                  var user = new User({
                    username: username,
                    email: email,
                    posts: post_name
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

          Category.findOne({category_name:category_name}, function(err, category){
              if(err){
                  res.status(400);
                  res.send(err);
              }
              if(category){
                  category.posts.push(post_name);
              }
              category.save(function(err, category){
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

//to get all posts present in all categories
exports.getAllPosts = function(req, res, body){
  Post.find({}, function(err, posts){
    if(err){
      res.json({
                "error": "invalid_request",
                "error_description": err
            })
    }
    if(posts){
      res.json({
        "message": "Posts",
        "Posts": posts
      })
    }else {
      res.json({
        "message": "No Post exist"
      })
    }
  })
}

//to post comment on a particular post
exports.postComment = function(req, res, body){
  var username = req.body.username;
  var email = req.body.email;
  var post_name = req.body.post_name;
  var comment = req.body.comment;

  Post.findOne({post_name:post_name}, function(err, post){
      if(err){
        res.status(400);
        res.send(err);
      }
      if(post){
        var commentArray = {
          username: username,
          email:email,
          comment: comment,
        }
        post.comments.push(commentArray);
        post.save(function(err, post){
          if(err){
            res.json({
                      "error": "invalid_request",
                      "error_description": err
                  })
          }
          res.status(200);
          res.json({
            "success": true,
            "message": "post added successfully",
            "channel": post
          })
        })
      }

      User.findOne({username:username, email:email}, function(err, user){
          if(err){
            res.status(400);
            res.send(err);
          }
          var commentArray = {
            post_name:post_name,
            comment: comment
          }
          if(user){
            user.comments.push(commentArray);
          }else{
              var user = new User({
                username: username,
                email: email,
                comments:commentArray
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
  })
}

//to get posts by category
exports.getPostsByCategory = function(req, res, next){
  var category_name = req.params.category_name;
  Post.find({category_name: category_name}, function(err, posts){
    if(err){
        res.status(400);
        res.send(err);
    }
    if(posts){
      res.json({
                "category": category_name,
                "posts": posts
            })
    }else {
      res.json({
                "message": "not such category exists"
            })
    }
  }).sort({"created_at": -1}).exec();
}

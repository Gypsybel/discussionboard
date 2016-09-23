var mongoose = require('mongoose');

var User = mongoose.model('User');
var Topic = mongoose.model('Topic');
var Answer = mongoose.model('Answer');
var Category = mongoose.model('Category');
var Comment = mongoose.model('Comment');

module.exports = {

  register: function(req,res){
		var user = new User(req.body);
		user.save(function(err){
			if (err){
				res.status(500).send("Users did not save");
			}
      else{
  			req.session.user = req.body;
        res.sendStatus(200);
			}
		});
	},

	login: function (req, res) {
    console.log(req.body);
		User.findOne({email: req.body.email}).exec(function (err, user) {
      if(user == null){
        res.status(400).send("Login Failed")
      }
			else if(req.body.password == user.password){
				req.session.user = user;
				res.json(user);
			}
		})
	},

  logout: function (req, res) {
    req.session.destroy();
    res.redirect('/');
  },

  getUsers: function(req, res){
    User.find({}).exec(function(err, users){
      if(err){
        res.status(500).send('There was a problem retrieving all users')
      }
      else{
        res.json(users);
      }
    })
  },
  loggedinuser: function(req, res){
    res.json(req.session.user);
  },


  getCategories: function(req, res){
    Category.find({}).exec(function(err, categories){
      if(err){
        console.log("had trouble finding categories" + err);
      }
      else{
        res.json(categories);
      }
    })
  },

  newTopic: function(req, res){
    var newtopic = new Topic({title:req.body.title, description:req.body.description, categories:req.body.category, users:req.session.user._id});
    newtopic.save(function(err){
      if(err){
        console.log("had trouble making a new topic" + err);
      }
      else {
        console.log("successfully made topic");
      }
    });
  },

  getTopics: function(req, res){
    Topic.find({}).populate('categories').populate('users').exec(function(err, topics){
      if(err){
        console.log("had trouble finding topics" + err);
      }
      else{
        res.json(topics);
      }
    })
  },



  findTopic: function(req, res){
       Topic.findOne({_id:req.params.id}).populate('categories').populate('users').populate({path:'answers', populate: {path:'users', model:'User'}}).populate({path:'answers', populate: {path:'comments', model:'Comment'}}).exec(function(err, topic){
      if(err){
        console.log("had trouble finding the topic" + err);
      }
      else{
        console.log(topic);
        res.json(topic);
      }
    })
  },

  postAnswer: function(req, res){
    var answer = new Answer(req.body);
    answer.users = req.session.user._id;
    Topic.update({_id: req.body.topics}, {$push: {answers: answer._id} }).exec(function(err){
      if(err){
        console.log(err);
      }
      else{
        console.log('The topic was updated with the answer ID');
      }
    })
    console.log(answer);
    answer.save(function(err){
      if(err){
        console.log(err);
      }
      else{
        res.status(200).send(req.body.topics);
      }
    })
  },

  postComment: function(req, res){
    var comment = new Comment(req.body);
    comment.users = req.session.user._id;
    Answer.update({_id:req.body.answer}, {$push: {comments: comment._id}});
    console.log(comment);
    comment.save(function(err){
      if(err){
        console.log(err);
      }
      else{
        console.log('The comment was posted baby!')
      }
    })
  }

  // deleteProduct: function(req, res){
  //   Products.remove({_id:req.params.id}, function(err){
  //     if(err){
  //       res.status(500).send('Tried to delete a Product but failed')
  //     }
  //     else{
  //       res.sendStatus(200);
  //     }
  //   })
  // },

}

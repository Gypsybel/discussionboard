var discussionRoutes = require('../controllers/discussionController.js');
module.exports = function(app){
  app.post('/register', discussionRoutes.register);
  app.post('/login', discussionRoutes.login);
  // app.get('/newcategory/:category', discussionRoutes.newCategory);
  app.get('/categories', discussionRoutes.getCategories);
  app.use(userAuth);
  // app.get('/customers', discussionRoutes.getCustomers);

  // app.delete('/product/:id', discussionRoutes.deleteProduct);
  app.get('/topics', discussionRoutes.getTopics);
  app.post('/topics', discussionRoutes.newTopic);
  app.get('/logout', discussionRoutes.logout);
  app.get('/loggedinuser', discussionRoutes.loggedinuser);
  app.get('/findtopic/:id', discussionRoutes.findTopic);
  app.post('/postanswer', discussionRoutes.postAnswer);
  app.post('/postcomment', discussionRoutes.postComment);
}
function userAuth(req,res,next){
  if (req.session.user){
    next();
  }else{
    res.sendStatus(401);
  }
}

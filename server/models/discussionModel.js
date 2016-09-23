var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  birthday: Date,
  created_at: Date

});
mongoose.model('User', UserSchema);
//
var CategorySchema = new mongoose.Schema({
  category: String
});
mongoose.model('Category', CategorySchema)
//
var TopicSchema = new mongoose.Schema({
  title: String,
  description: String,
  categories: {type: Schema.Types.ObjectId, ref: 'Category'},
  users: {type: Schema.Types.ObjectId, ref: 'User'},
  answers: [{type: Schema.Types.ObjectId, ref: 'Answer'}]
});
mongoose.model('Topic', TopicSchema)
//
var AnswerSchema = new mongoose.Schema({
  content: String,
  like: Array,
  users: {type: Schema.Types.ObjectId, ref: 'User'},
  comments: [{type:Schema.Types.ObjectId, ref:'Comment'}],
  topics: {type: Schema.Types.ObjectId, ref:'Topic'}
});
mongoose.model('Answer', AnswerSchema)
//
var CommentSchema = new mongoose.Schema({
  content: String,
  users: [{type: Schema.Types.ObjectId, ref: 'User'}],
  answer: [{type: Schema.Types.ObjectId, ref: 'Answer'}]
});
mongoose.model('Comment', CommentSchema)

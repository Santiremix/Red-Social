const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const PostSchema = new mongoose.Schema({
    userId: { type: ObjectId, ref: 'User' },
    username: {
        type: String,
        required: [true, 'Indique su nombre de usuario'],
      },
    body: {
        type: String,
        required: [true, 'El Post ha de tener un contenido'],
      },
    comments: [{
        userId: { type: ObjectId, ref: 'User' },
        username: { type: String, ref: 'User' },
        comment: String,
    }],
    likes: [{ type: ObjectId }],


}, { timestamps: true });

PostSchema.methods.toJSON = function() {
  const post = this._doc;
  delete post.createdAt;
  delete post.updatedAt;
  delete post.__v;
  return post;
}

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;

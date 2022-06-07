const mongoose = require('mongoose');
const { stringify } = require('nodemon/lib/utils');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const CommentSchema = new mongoose.Schema({
   
    userId: { type: ObjectId, ref: 'User' },
    username: { type: String, ref: 'User' },
    postId: { type: ObjectId, ref: 'Post'},
    comment: String

}, { timestamps: true });

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
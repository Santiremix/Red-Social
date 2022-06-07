const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const PostSchema = new mongoose.Schema({
    userId: { type: ObjectId, ref: 'User' },
    username: String,
    body: String,
    comments: [{
        userId: { type: ObjectId, ref: 'User' },
        username: { type: String, ref: 'User' },
        comment: String,
    }],
    likes: [{ type: ObjectId }],


}, { timestamps: true });

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;

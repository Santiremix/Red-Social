const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;


const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    role: String,
    confirmed: Boolean,
    tokens: [],
    postIds: [{ type: ObjectId, ref: 'Post' }],
}, { timestamps: true });

UserSchema.methods.toJSON = function() {
    const user = this._doc;
    delete user.tokens;
    delete user.password;
    delete user.createdAt;
    return user;
}


const User = mongoose.model('User', UserSchema);

module.exports = User;
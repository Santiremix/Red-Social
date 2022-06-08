const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Por favor indica tu nombre'],
      },
      email: {
        type: String,
        unique: true,
        match: [/.+\@.+\..+/, 'El correo introducido no es válido'],
        required: [true, 'Por favor indica un correo'],
      },
    password: {
        type: String,
        required: [true, 'Has de tener una contraseña'],
      },
    role: String,
    confirmed: Boolean,
    tokens: [],
    postId: [{ type: ObjectId, ref: 'Post' }],

}, { timestamps: true });

UserSchema.methods.toJSON = function() {
    const user = this._doc;
    delete user.tokens;
    delete user.password;
    delete user.createdAt;
    delete user.updatedAt;
    delete user.__v;
    return user;
}

const User = mongoose.model('User', UserSchema);

module.exports = User;
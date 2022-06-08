const Post = require("../models/Post");
const User = require('../models/User');
const Comment = require('../models/Comment')

const CommentController ={
    async insertComment(req, res) {
        try {
          const comment = await Comment.create({ ...req.body, userId: req.user._id, postId: req.params._id });
          await Post.findByIdAndUpdate(req.params._id, {
            $push: { comments: {
                ...req.body,
                username: req.user.username
              }, 
            },
          });
          res.status(201).send(comment);
        } catch (error) {
          console.error(error);
          res
            .status(500)
            .send({ msg: 'Ha ocurrido un problema creando el comentario.' });
        }
      },

      async deleteComment(req, res) {
        try {
            const comment = await Comment.findByIdAndDelete(req.params._id)
            res.send({ msg: 'Comentario eliminado con éxito.' })
        } catch (error) {
            console.error(error)
            res.status(500).send({ msg: 'Ha habido un problema al borrar el comentario' })
        }
    },

}

module.exports = CommentController;
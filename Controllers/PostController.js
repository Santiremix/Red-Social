const Post = require("../models/Post");
const User = require('../models/User');

const PostController ={

    async create(req,res){
        try {
          const post = await Post.create({
            username: req.user.username,
            body: req.body.body, 
            userId: req.user._id 
          })
            await User.findByIdAndUpdate(req.user._id, { $push: { postIds: post._id } })
            res.status(201).send(post)
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: 'Ha habido un problema al crear el post' })
        }
    },

    async getAll(req, res) {
        try {
          const { page = 1, limit = 10 } = req.query;
          const post = await Post.find()
            .limit(limit * 1)
            .skip((page - 1) * limit);
          res.send(post);
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Ha habido un problema para obtener los posts' })
        }
    },

    async getById(req, res) {
        try {
            const post = await Post.findById(req.params._id)
            res.send(post)
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Ha habido un problema al buscar el post' })
        }
    },

    async getPostsByName(req, res) {
        try {
          if (req.params.username.length>20){
            return res.status(400).send('Busqueda demasiado larga')
          }
          const username = new RegExp(req.params.username, "i");
          const post = await Post.find({username});
          res.send(post);
        } catch (error) {
          console.log(error);
          res.status(500).send({ message: 'Ha habido un problema al buscar el post' })
        }
      },

      async delete(req, res) {
        try {
            const post = await Post.findByIdAndDelete(req.params._id)
            res.send({ post, message: 'Post eliminado con éxito.' })
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: 'Ha habido un problema al borrar el post' })
        }
    },

    async update(req, res) {
        try {
          const post = await Post.findByIdAndUpdate(req.params._id, req.body, { new: true })
          res.send({ message: "Post actualizado correctamente!", post });
        } catch (error) {
          console.error(error);
          res.status(500).send({ message: 'Ha habido un problema al actualizar el post' })
        }
      },

      async insertComment(req, res) {
        try {
          const post = await Post.findByIdAndUpdate(
            req.params._id,
            { $push: { comments: { ...req.body, userId: req.user._id, username: req.user.username } } },
            { new: true }
          );
          res.send(post);
        } catch (error) {
          console.error(error);
          res.status(500).send({ message: "Ha habido un problema con tu comentario" });
        }
      },
    
}

module.exports = PostController;

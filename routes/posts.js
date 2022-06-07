const express = require('express');
const router = express.Router()
const PostController = require('../Controllers/PostController');
const { authentication, isAdmin } = require("../middlewares/authentication");


router.post('/', authentication, PostController.create)
router.get('/', PostController.getAll)
router.get('/id/:_id', PostController.getById)
router.get('/name/:username', PostController.getPostsByName)
router.delete('/:_id', PostController.delete)
router.put('/:_id', PostController.update)
router.put('/like/:_id', authentication, PostController.like)
router.put('/dislike/:_id', authentication, PostController.dislike)




module.exports = router; 
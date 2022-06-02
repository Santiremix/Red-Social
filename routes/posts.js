const express = require('express');
const router = express.Router()
const PostController = require('../controllers/PostController');
const { authentication, isAdmin } = require("../middlewares/authentication");


router.post('/', authentication, PostController.create)
router.get('/', PostController.getAll)
router.get('/id/:_id',PostController.getById)
router.get('/name/:username', authentication, isAdmin, PostController.getPostsByName)
router.delete('/:_id', authentication, isAdmin, PostController.delete)
router.put('/:_id', authentication, isAdmin, PostController.update)
router.put('/reviews/:_id', PostController.insertComment)


module.exports = router; 
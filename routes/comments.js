const express = require('express');
const router = express.Router()
const CommentController = require('../controllers/CommentController');
const { authentication, isAdmin } = require("../middlewares/authentication");

router.put('/comment/:_id',authentication, CommentController.insertComment)
router.delete('/deleteComment/:id',authentication, CommentController.deleteComment)


module.exports = router; 
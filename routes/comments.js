const express = require('express');
const router = express.Router()
const CommentController = require('../Controllers/CommentController');
const { authentication, isAdmin } = require("../middlewares/authentication");

router.put('/comment/:_id',authentication, CommentController.insertComment)
router.delete('/deleteComment/:id',authentication, CommentController.deleteComment)
router.put('/commentUpdate/:_id',authentication, CommentController.update)


module.exports = router; 
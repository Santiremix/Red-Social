const express = require('express');
const router = express.Router()
const UserController = require('../Controllers/UserController');
const { authentication, isAdmin } = require("../middlewares/authentication");


router.post('/', UserController.register)
router.get('/confirm/:emailToken', UserController.confirm);
router.post('/login', UserController.login)
router.delete('/logout', authentication, UserController.logout)
router.delete('/deleteMyself', authentication, UserController.deleteMyself)
router.delete('/deleteUser/:id', authentication, isAdmin, UserController.deleteUserByAdmin)

router.get('/info', authentication, UserController.getInfo)


module.exports = router; 
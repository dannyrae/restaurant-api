const express = require('express')
const { signup, login } = require('../controllers/user.controller')

const router = express.Router()

router.route('/signup')
    .post(signup)

router.route('/login')
    .post(login)
    

// router.route('/users/:id')
//     .patch(updateUserInfo)
//     .delete(deleteUser)

module.exports = router
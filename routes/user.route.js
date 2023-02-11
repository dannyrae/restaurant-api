const express = require('express')
const { createUser, getUsers, getUser, deleteUser, updateUserInfo } = require('../controllers/user.controller')

const router = express.Router()

router.route('/users')
    .get(getUsers)
    .post(createUser)

router.route('/users/:id')
    .get(getUser)
    .patch(updateUserInfo)
    .delete(deleteUser)

module.exports = router
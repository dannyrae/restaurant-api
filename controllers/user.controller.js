const Joi = require('joi')
const User = require('../models/user.model')
const { validateSignup } = require('../validation')


const createUser = async (req, res, next) => {
    try {
      const {error, value} = validateSignup(req.body)

      if (error) {
        console.log(error)
        return res.send(error.details)
      }
  
      const { firstname, lastname, username, email } = req.body

        const user = await User.findOne({ email })

        if (user) return res.status(400).json({ status: false, message: "User already exists!" })
    
        const newUser = new User({
          firstname,
          lastname,
          username,
          email
        })

        const createdUser = await newUser.save()
        return res.status(201).json({
          status: true,
          data: createdUser
        })
      } catch (err) {
        next(err)
      }
}

const getUsers = async (req, res, next) => {
    try {
        const user = await User.find({})
                                .sort({firstname: 1, lastname: 1})

        const result = user.length

        return res.status(201).json({
            status: true,
            result,
            data: user
          })
    } catch (err) {
        next(err)
    }
}

const getUser = async (req, res, next) => {
    try {
      const { id } = req.params
      const user = await User.findById(id)

      return res.status(201).json({
        status: true,
        data: user,
      })
    } catch (err) {
      next(err)
    }
}

const updateUserInfo = async (req, res, next) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)
        Object.assign(user, req.body)
        await user.save()
        res.status(200).json({status: true, user})
    
      } catch (err) {
        next(err)
      }
}

const deleteUser = async (req, res, next) => {
    try {
      const { id } = req.params
      const user = await User.findById(id)
  
      await user.remove()
      res.status(200).json({status: true, message: "user deleted successfully!"})
  
    } catch (err) {
      next(err)
    }
  }

module.exports = {
    createUser,
    getUsers,
    getUser,
    updateUserInfo,
    deleteUser
  }
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
let jwt = require('jsonwebtoken')
require('dotenv').config()

const signup = async (req, res, next) => {
    try {
		let user = await User.findOne({ email: req.body.email })
        if (user) return res.status(400).json({ status: false, message: "User already exists!" })

		let hashedPassword = await bcrypt.hash(req.body.password, 10)
		let newUser = new User({
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			username: req.body.username,
			email: req.body.email,
			password: hashedPassword
		})

		newUser = await newUser.save()
		const {password, ...others} = newUser._doc

        return res.status(201).json({
          status: true,
          data: others
        })

    } catch (err) {
			next(err)
		}
};

const login = async (req, res, next) => {
		try {
			let user = await User.findOne({username: req.body.username})
			if (!user) return res.status(400).send('Invalid Email or Password.')
		
			const validPassword = await bcrypt.compare(req.body.password, user.password);
			if (!validPassword) return res.status(400).send('Invalid Email or Password.')

			let token = jwt.sign({ id: user.id, username: user.username, email: user.email }, process.env.JWT_SECRET, { expiresIn: process.env.EXPIRES_IN })

			const {password, ...others} = user._doc

			return res.status(200).json({
				status: true,
				data: others,
				Token: token
			})
		} catch (err) {
			next(err)
		}
}

module.exports = {
	signup,
	login
}
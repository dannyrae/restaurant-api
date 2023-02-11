const express = require('express')
require('dotenv').config()
const {connectDB} = require('./config/db.config')
const userRoute = require('./routes/user.route')

const app = express()

const PORT = process.env.PORT || 4000
app.use(express.json())

connectDB()

// middlewares
app.use('/api/v1/', userRoute)

app.get('/', (req, res) => {
    res.send('Testing server')
})

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))
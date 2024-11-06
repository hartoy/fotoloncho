const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')
const articlesRoutes = require('./routes/articles')
const authRoutes = require('./routes/auth')
const templateRoutes = require('./routes/templates')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

const corsOptions = {
  origin: process.env.CLIENT_URL,
  methods: 'GET,POST,PATCH,DELETE',
  credentials: true,
}

app.use(cors(corsOptions))
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Backend is running')
})

app.use('/api/auth', authRoutes)

app.use('/images', express.static(path.join(__dirname, 'images')))

app.use('/api/articles', articlesRoutes)

app.use('/api/templates', templateRoutes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()

const LoginInfo = require('../models/User')

router.post('/login', async (req, res) => {
  const { password } = req.body

  try {
    const loginInfo = await LoginInfo.findOne({ where: { id: 1 } })
    if (!loginInfo) {
      return res.status(404).json({ message: 'No se encontró la información de login' })
    }

    const isPasswordValid = await bcrypt.compare(password, loginInfo.password)

    if (isPasswordValid) {
      return res.status(200).json({ message: 'Login exitoso' })
    } else {
      return res.status(401).json({ message: 'Contraseña incorrecta' })
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error en el servidor' })
  }
})

module.exports = router

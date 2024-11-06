const sequelize = require('./models/index')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')

dotenv.config()

const savePassword = async () => {
  const password = process.env.ADMIN_PASSWORD

  console.log('Importado sequelize:', sequelize)

  if (!password) {
    console.error('Por favor, proporciona una contraseña en el archivo .env')
    return
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    await sequelize.authenticate()
    console.log('Conexión a la base de datos establecida correctamente.')

    await sequelize.query(`INSERT INTO login_info (password) VALUES (?)`, {
      replacements: [hashedPassword],
    })

    console.log('Contraseña guardada correctamente.')
  } catch (error) {
    console.error('Error guardando la contraseña:', error)
  } finally {
    await sequelize.close()
  }
}

savePassword()

const express = require('express')
const router = express.Router()
const Template = require('../models/Template')

// GET ALL TEMPLATES
router.get('/', async (req, res) => {
  try {
    const templates = await Template.findAll()
    res.status(200).json(templates)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los templates' })
  }
})

router.patch('/:id', async (req, res) => {
  const { id } = req.params
  const templateData = req.body

  console.log('Datos recibidos en el backend para actualizar:', templateData)

  try {
    const template = await Template.findByPk(id)
    if (!template) {
      return res.status(404).json({ message: 'Template no encontrado' })
    }

    await template.update(templateData)
    res.status(200).json(template)
  } catch (error) {
    console.error('Error al actualizar el template:', error)
    res.status(500).json({ message: 'Error al actualizar el template' })
  }
})

// GET TEMPLATE BY TYPE
router.get('/type/:templateType', async (req, res) => {
  const { templateType } = req.params

  try {
    const template = await Template.findOne({ where: { template_type: templateType } })

    if (!template) {
      return res.status(404).json({ message: 'Template no encontrado' })
    }

    res.status(200).json(template)
  } catch (error) {
    console.error('Error al obtener el template:', error)
    res.status(500).json({ message: 'Error al obtener el template' })
  }
})

module.exports = router

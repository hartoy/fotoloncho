const express = require('express')
const upload = require('../upload')
const router = express.Router()
const Article = require('../models/Article')
const { Op } = require('sequelize')
const path = require('path')
const fs = require('fs')

// GET ALL ARTICLES
router.get('/', async (req, res) => {
  const { page = 1, limit = 20 } = req.query

  const pageNumber = Math.max(1, parseInt(page, 10))
  const limitNumber = Math.min(Math.max(1, parseInt(limit, 10)), 100)
  const offset = (pageNumber - 1) * limitNumber

  try {
    const articles = await Article.findAndCountAll({
      limit: limitNumber,
      offset: offset,
    })

    res.status(200).json({
      totalItems: articles.count,
      totalPages: Math.ceil(articles.count / limitNumber),
      currentPage: pageNumber,
      data: articles.rows.length > 0 ? articles.rows : [],
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al obtener los artículos.' })
  }
})

// CREATE ARTICLE
router.post('/', upload.single('img'), async (req, res) => {
  try {
    const newArticle = {
      item: req.body.item,
      img: req.file ? `images/${req.file.filename}` : null,
      title: req.body.title,
      aka: req.body.aka || null,
      actor: req.body.actor || null,
      signature: req.body.signature || null,
      year: req.body.year ? parseInt(req.body.year, 10) : null,
      rerelease: req.body.rerelease ? parseInt(req.body.rerelease, 10) : null,
      weight: req.body.weight || null,
      movieType: req.body.movieType || null,
      width: req.body.width ? parseInt(req.body.width, 10) : null,
      height: req.body.height ? parseInt(req.body.height, 10) : null,
      agency: req.body.agency || null,
      origin: req.body.origin || null,
      description: req.body.description || null,
      sku: req.body.sku,
      skuLetter: req.body.skuLetter || null,
      cost: req.body.cost ? parseFloat(req.body.cost) : null,
      color: req.body.color,
      movieNumber: req.body.movieNumber || null,
      price: req.body.price ? parseFloat(req.body.price) : null,
    }

    const requiredFields = ['item', 'img', 'title', 'price', 'weight', 'width', 'height', 'description', 'sku', 'color']
    for (const field of requiredFields) {
      if (!newArticle[field]) {
        return res.status(400).json({ message: `El campo ${field} es obligatorio.` })
      }
    }

    const article = await Article.create(newArticle)
    res.status(201).json(article)
  } catch (error) {
    console.error('Error details:', error)
    res.status(500).json({ message: 'Error al crear el artículo.', error: error.message })
  }
})

//MODIFY ARTICLE
router.patch('/:sku', upload.single('img'), async (req, res) => {
  try {
    const { sku } = req.params

    const article = await Article.findOne({ where: { sku } })
    if (!article) {
      return res.status(404).json({ message: 'Artículo no encontrado.' })
    }

    const updatedData = {
      item: req.body.item || article.item,
      img: req.file ? `images/${req.file.filename}` : article.img,
      title: req.body.title || article.title,
      aka: req.body.aka || null,
      actor: req.body.actor || null,
      signature: req.body.signature || null,
      year: req.body.year ? parseInt(req.body.year, 10) : article.year,
      rerelease: req.body.rerelease ? parseInt(req.body.rerelease, 10) : article.rerelease,
      weight: req.body.weight || article.weight,
      movieType: req.body.movieType || null,
      width: req.body.width ? parseInt(req.body.width, 10) : article.width,
      height: req.body.height ? parseInt(req.body.height, 10) : article.height,
      agency: req.body.agency || null,
      origin: req.body.origin || null,
      description: req.body.description || null,
      sku: req.body.sku || article.sku,
      skuLetter: req.body.skuLetter || null,
      cost: req.body.cost ? parseFloat(req.body.cost) : article.cost,
      color: req.body.color || article.color,
      movieNumber: req.body.movieNumber || null,
      price: req.body.price ? parseFloat(req.body.price) : article.price,
    }

    await article.update(updatedData)

    res.json(article)
  } catch (error) {
    console.error('Error al actualizar el artículo:', error)
    res.status(500).json({ message: 'Error al actualizar el artículo.', details: error.message })
  }
})

// DELETE ARTICLE BY SKU
router.delete('/:sku', async (req, res) => {
  const { sku } = req.params

  try {
    const article = await Article.findOne({ where: { sku } })
    if (!article) {
      return res.status(404).json({ message: 'Artículo no encontrado.' })
    }

    if (article.img) {
      const imagePath = path.join(__dirname, '..', article.img)
      try {
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath)
        }
      } catch (err) {
        console.error(`Error al eliminar la imagen: ${err.message}`)
        return res.status(500).json({ message: 'Error al eliminar la imagen asociada al artículo.' })
      }
    }

    await article.destroy()

    res.status(200).json({ message: 'Artículo eliminado correctamente.' })
  } catch (error) {
    console.error('Error al eliminar el artículo:', error)
    res.status(500).json({ message: 'Error al eliminar el artículo.' })
  }
})

// SEARCH BY TITLE
router.get('/search/title', async (req, res) => {
  const { title } = req.query

  if (!title) {
    return res.status(400).json({ message: 'Se requiere un título para buscar.' })
  }

  try {
    const articles = await Article.findAll({
      where: {
        title: {
          [Op.like]: `%${title}%`,
        },
      },
    })

    if (articles.length === 0) {
      return res.status(404).json({ message: 'No se encontraron artículos con ese título.' })
    }

    res.status(200).json(articles)
  } catch (error) {
    console.error('Error details:', error)
    res.status(500).json({ message: 'Error al buscar el artículo por título.' })
  }
})

// SEARCH BY MOVIE-NUMBER
router.get('/search/movieNumber', async (req, res) => {
  const { movieNumber } = req.query

  if (!movieNumber) {
    return res.status(400).json({ message: 'Se requiere un número de película para buscar.' })
  }

  try {
    const articles = await Article.findAll({
      where: {
        movieNumber: movieNumber,
      },
    })

    if (articles.length === 0) {
      return res.status(404).json({ message: 'No se encontraron artículos con ese número de película.' })
    }

    res.status(200).json(articles)
  } catch (error) {
    console.error('Error details:', error)
    res.status(500).json({ message: 'Error al buscar el artículo por número de película.' })
  }
})

//SEARCH BY SKU
router.get('/search/sku', async (req, res) => {
  const { sku } = req.query

  if (!sku) {
    return res.status(400).json({ message: 'Se requiere un SKU para buscar.' })
  }

  try {
    const articles = await Article.findAll({
      where: {
        sku: sku,
      },
    })

    if (articles.length === 0) {
      return res.status(404).json({ message: 'No se encontraron artículos con ese SKU.' })
    }

    res.status(200).json(articles)
  } catch (error) {
    console.error('Error details:', error)
    res.status(500).json({ message: 'Error al buscar el artículo por SKU.' })
  }
})

// CHECK SKU AVAILABILITY
router.get('/checkSkuAvailability', async (req, res) => {
  const { sku } = req.query

  if (!sku) {
    return res.status(400).json({ message: 'El sku es obligatorio para verificar.' })
  }

  try {
    const existingArticle = await Article.findOne({
      where: {
        sku,
      },
    })

    if (existingArticle) {
      return res.status(409).json({ available: false, message: 'El sku ya existe. Cambia el valor.' })
    }

    res.status(200).json({ available: true, message: 'El sku está disponible.' })
  } catch (error) {
    console.error('Error details:', error)
    res.status(500).json({ message: 'Error al verificar la disponibilidad del sku.' })
  }
})

// CHECK MOVIENUMBER AVAILABILITY
router.get('/checkMovieNumberAvailability', async (req, res) => {
  const { movieNumber } = req.query

  // Cambia la validación para que no sea obligatoria
  if (movieNumber) {
    try {
      const existingMovieNumber = await Article.findOne({
        where: {
          movieNumber,
        },
      })

      if (existingMovieNumber) {
        return res.status(409).json({ available: false, message: 'El movieNumber ya existe. Cambia el valor.' })
      }

      res.status(200).json({ available: true, message: 'El movieNumber está disponible.' })
    } catch (error) {
      console.error('Error details:', error)
      return res.status(500).json({ message: 'Error al verificar la disponibilidad del movieNumber.' })
    }
  } else {
    res.status(400).json({ message: 'El movieNumber debe proporcionarse para la verificación.' })
  }
})

module.exports = router

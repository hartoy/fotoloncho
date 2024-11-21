import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL

export const getArticles = async (page = 1, limit = 100) => {
  try {
    const response = await axios.get(`${API_URL}/api/articles?page=${page}&limit=${limit}`)
    return response.data
  } catch (error) {
    throw new Error('Error al obtener los artículos')
  }
}

export const createArticle = async (articleData) => {
  try {
    const formData = new FormData()
    Object.keys(articleData).forEach((key) => {
      formData.append(key, articleData[key])
    })
    const response = await axios.post(`${API_URL}/api/articles`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  } catch (error) {
    throw new Error('Error al crear el artículo')
  }
}

export const updateArticle = async (sku, articleData) => {
  console.log('data que le llega', articleData)
  try {
    const formData = new FormData()
    Object.keys(articleData).forEach((key) => {
      formData.append(key, articleData[key])
    })

    const response = await axios.patch(`${API_URL}/api/articles/${sku}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return response.data
  } catch (error) {
    throw new Error('Error al actualizar el artículo')
  }
}

export const deleteArticle = async (sku) => {
  try {
    const response = await axios.delete(`${API_URL}/api/articles/${sku}`)
    return response.data
  } catch (error) {
    throw new Error('Error al eliminar el artículo')
  }
}

export const searchArticles = async (searchType, query) => {
  try {
    const response = await axios.get(`${API_URL}/api/articles/search/${searchType}`, {
      params: { [searchType]: query },
    })
    return response.data
  } catch (error) {
    throw new Error(`Error al buscar el artículo por ${searchType}`)
  }
}

export const searchArticleBySKU = async (sku) => {
  try {
    const response = await axios.get(`${API_URL}/api/articles/search/sku`, {
      params: { sku },
    })
    return response.data
  } catch (error) {
    throw new Error('Error al buscar el artículo por SKU')
  }
}

export const checkSkuAvailability = async (sku) => {
  try {
    const response = await axios.get(`${API_URL}/api/articles/checkSkuAvailability?sku=${sku}`)
    return response.data
  } catch (error) {
    return { available: false, message: error.response?.data?.message || 'Error al verificar el SKU' }
  }
}

export const checkMovieNumberAvailability = async (movieNumber) => {
  try {
    const response = await axios.get(`${API_URL}/api/articles/checkMovieNumberAvailability?movieNumber=${movieNumber}`)
    return response.data
  } catch (error) {
    return { available: false, message: error.response?.data?.message || 'Error al verificar el Movie Number' }
  }
}

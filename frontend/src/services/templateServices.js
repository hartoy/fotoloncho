import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL

export const getTemplates = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/templates`)
    return response.data
  } catch (error) {
    console.error('Error al obtener los templates:', error)
    throw error
  }
}

export const handleEditTemplate = async (selectedTemplate, formData) => {
  try {
    const response = await axios.patch(`${API_URL}/api/templates/${selectedTemplate.id}`, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    return response.data
  } catch (error) {
    console.error('Error al editar el template:', error)
    throw error
  }
}

export const getTemplateByType = async (templateType) => {
  try {
    const response = await axios.get(`${API_URL}/api/templates/type/${templateType}`)
    return response.data
  } catch (error) {
    console.error(`Error al obtener el template de tipo ${templateType}:`, error)
    throw error
  }
}

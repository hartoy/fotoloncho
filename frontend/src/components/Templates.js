import React, { useState, useEffect } from 'react'
import { getTemplates, handleEditTemplate } from '../services/templateServices'
import { generateTemplateHTML } from './utils/generateTemplateHTML'

const Templates = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [formData, setFormData] = useState({
    first_block: { text: [''] },
    payment_block: { text: [''] },
    ship_info: { text: [''] },
    ship_time: { text: [''] },
  })
  const [templatesData, setTemplatesData] = useState([])

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const templates = await getTemplates()
        setTemplatesData(templates)
      } catch (error) {
        console.error('Error al obtener los templates:', error)
      }
    }
    fetchTemplates()
  }, [])

  const loadTemplateData = (templateType) => {
    const selectedTemplateData = templatesData.find((template) => template.template_type === templateType)
    if (selectedTemplateData) {
      setSelectedTemplate(selectedTemplateData)
      const {
        first_title,
        first_title_url,
        red_title,
        first_block,
        payment_block,
        ship_info,
        ship_time,
        condition_block,
      } = selectedTemplateData

      setFormData({
        first_title: first_title || '',
        first_title_url: first_title_url || '',
        red_title: red_title || '',
        first_block: {
          text: first_block?.text || [],
        },
        payment_block: {
          title: payment_block?.title || '',
          text: payment_block?.text || [],
        },
        ship_info: {
          title: ship_info?.title || '',
          text: ship_info?.text || [],
        },
        ship_time: {
          title: ship_time?.title || '',
          text: ship_time?.text || [],
        },
        condition_block: condition_block
          ? {
              title: condition_block.title || '',
              text: condition_block.text || [],
            }
          : null,
      })
    } else {
      console.warn(`No se encontró la plantilla para el tipo: ${templateType}`)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target

    if (name.includes('.')) {
      const [section, field] = name.split('.')

      setFormData((prevData) => ({
        ...prevData,
        [section]: {
          ...prevData[section],
          [field]: field === 'text' ? value.split('\n') : value,
        },
      }))
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }))
    }
  }

  const editHTML = async () => {
    try {
      await handleEditTemplate(selectedTemplate, formData)
      console.log('Datos modificados y enviados a la base de datos:', formData)

      const element = document.createElement('a')
      const file = new Blob([generateTemplateHTML(formData)], { type: 'text/html' })
      element.href = URL.createObjectURL(file)
      element.download = `${selectedTemplate.template_type}_template.html`
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
    } catch (error) {
      console.error('Error al editar y descargar el template:', error)
    }
  }

  return (
    <div className="pt-1 my-12">
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {[
          'slides',
          'printed-authographs',
          'posters',
          'postcards',
          'photos',
          'photo-reproductions',
          'lobby-cards',
          'autographs',
          'ads',
        ].map((templateType) => (
          <button
            key={templateType}
            onClick={() => loadTemplateData(templateType)}
            className="bg-[#640D5F] text-white p-2 rounded transition duration-200 hover:scale-110 px-7 py-3"
          >
            {templateType.charAt(0).toUpperCase() + templateType.slice(1).replace('-', ' ')}
          </button>
        ))}
      </div>

      {selectedTemplate ? (
        <div>
          <h2 className="text-2xl mb-6 text-center">{`Editar HTML de ${
            selectedTemplate.template_type.charAt(0).toUpperCase() + selectedTemplate.template_type.slice(1)
          }`}</h2>

          <form
            className="mb-8 border-2 border-[#640D5F] rounded-lg p-6 my-6 bg-white"
            onSubmit={(e) => {
              e.preventDefault()
              editHTML()
            }}
          >
            <div className="mb-4">
              <label className="block mb-1 pl-1 font-semibold" htmlFor="first_title">
                Título 1
              </label>
              <input
                type="text"
                name="first_title"
                id="first_title"
                value={formData.first_title || ''}
                onChange={handleInputChange}
                className="border p-2 w-full pl-2 focus:outline-none focus:ring-2 focus:ring-[#640D5F] focus:border-[#640D5F] w-full"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 pl-1 font-semibold" htmlFor="first_title_url">
                URL del enlace de fotos
              </label>
              <input
                type="text"
                name="first_title_url"
                id="first_title_url"
                value={formData.first_title_url || ''}
                onChange={handleInputChange}
                className="border p-2 w-full pl-2 focus:outline-none focus:ring-2 focus:ring-[#640D5F] focus:border-[#640D5F] w-full"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 pl-1 font-semibold" htmlFor="red_title">
                Título Rojo
              </label>
              <input
                type="text"
                name="red_title"
                id="red_title"
                value={formData.red_title || ''}
                onChange={handleInputChange}
                className="border p-2 w-full pl-2 focus:outline-none focus:ring-2 focus:ring-[#640D5F] focus:border-[#640D5F] w-full"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 pl-1 font-semibold" htmlFor="first_block.text">
                Texto del Primer Bloque
              </label>
              <textarea
                name="first_block.text"
                id="first_block.text"
                value={formData.first_block.text ? formData.first_block.text.join('\n') : ''}
                onChange={handleInputChange}
                className="border p-2 w-full pl-2 focus:outline-none focus:ring-2 focus:ring-[#640D5F] focus:border-[#640D5F] w-full"
                rows="7"
              />
            </div>
            {formData.condition_block && (
              <div className="p-2 border-2 border-[#640D5F] rounded-lg my-6">
                <div className="mb-4">
                  <label className="block mb-1 pl-1 font-semibold" htmlFor="condition_block.title">
                    Título de Condición
                  </label>
                  <input
                    type="text"
                    name="condition_block.title"
                    id="condition_block.title"
                    value={formData.condition_block.title || ''}
                    onChange={handleInputChange}
                    className="border p-2 w-full pl-2 focus:outline-none focus:ring-2 focus:ring-[#640D5F] focus:border-[#640D5F] w-full"
                  />
                </div>

                <div className="mb-2">
                  <label className="block mb-1 pl-1 font-semibold" htmlFor="condition_block.text">
                    Texto de Condición
                  </label>
                  <textarea
                    name="condition_block.text"
                    id="condition_block.text"
                    value={formData.condition_block.text ? formData.condition_block.text.join('\n') : ''}
                    onChange={handleInputChange}
                    className="border p-2 w-full pl-2 focus:outline-none focus:ring-2 focus:ring-[#640D5F] focus:border-[#640D5F] w-full"
                    rows="4"
                  />
                </div>
              </div>
            )}
            <div className="p-2 border-2 border-[#640D5F] rounded-lg my-6">
              <div className="mb-4">
                <label className="block my-2 pl-1 font-semibold" htmlFor="payment_block.title">
                  Título del Bloque de Pago
                </label>
                <input
                  type="text"
                  name="payment_block.title"
                  id="payment_block.title"
                  value={formData.payment_block.title || ''}
                  onChange={handleInputChange}
                  className="border p-2 w-full pl-2 focus:outline-none focus:ring-2 focus:ring-[#640D5F] focus:border-[#640D5F] w-full"
                />
              </div>

              <div className="mb-2">
                <label className="block mb-1 pl-1 font-semibold" htmlFor="payment_block.text">
                  Texto del Bloque de Pago
                </label>
                <textarea
                  name="payment_block.text"
                  id="payment_block.text"
                  value={formData.payment_block.text ? formData.payment_block.text.join('\n') : ''}
                  onChange={handleInputChange}
                  className="border p-2 w-full pl-2 focus:outline-none focus:ring-2 focus:ring-[#640D5F] focus:border-[#640D5F] w-full"
                  rows="5"
                />
              </div>
            </div>
            <div className="p-2 border-2 border-[#640D5F] rounded-lg my-6">
              <div className="mb-4">
                <label className="block my-2 pl-1 font-semibold" htmlFor="ship_info.title">
                  Título de Información de Envío
                </label>
                <input
                  type="text"
                  name="ship_info.title"
                  id="ship_info.title"
                  value={formData.ship_info.title || ''}
                  onChange={handleInputChange}
                  className="border p-2 w-full pl-2 focus:outline-none focus:ring-2 focus:ring-[#640D5F] focus:border-[#640D5F] w-full"
                />
              </div>

              <div className="mb-2">
                <label className="block mb-1 pl-1 font-semibold" htmlFor="ship_info.text">
                  Texto de Información de Envío
                </label>
                <textarea
                  name="ship_info.text"
                  id="ship_info.text"
                  value={formData.ship_info.text ? formData.ship_info.text.join('\n') : ''}
                  onChange={handleInputChange}
                  className="border p-2 w-full pl-2 focus:outline-none focus:ring-2 focus:ring-[#640D5F] focus:border-[#640D5F] w-full"
                  rows="3"
                />
              </div>
            </div>
            <div className="p-2 border-2 border-[#640D5F] rounded-lg my-6">
              <div className="mb-4">
                <label className="block my-2 pl-1 font-semibold" htmlFor="ship_time.title">
                  Título de Tiempo de Envío
                </label>
                <input
                  type="text"
                  name="ship_time.title"
                  id="ship_time.title"
                  value={formData.ship_time.title || ''}
                  onChange={handleInputChange}
                  className="border p-2 w-full pl-2 focus:outline-none focus:ring-2 focus:ring-[#640D5F] focus:border-[#640D5F] w-full"
                />
              </div>

              <div className="mb-2">
                <label className="block mb-1 pl-1 font-semibold" htmlFor="ship_time.text">
                  Texto de Tiempo de Envío
                </label>
                <textarea
                  name="ship_time.text"
                  id="ship_time.text"
                  value={formData.ship_time.text ? formData.ship_time.text.join('\n') : ''}
                  onChange={handleInputChange}
                  className="border p-2 w-full pl-2 focus:outline-none focus:ring-2 focus:ring-[#640D5F] focus:border-[#640D5F] w-full"
                  rows="4"
                />
              </div>
            </div>

            <div className="flex items-center justify-center mt-12">
              <button
                type="submit"
                className="bg-[#640D5F] text-white p-2 rounded transition duration-200 hover:scale-110 px-7 py-3 flex items-center justify-center"
              >
                Guardar y Descargar
              </button>
            </div>
          </form>
        </div>
      ) : (
        <p className="text-center">Selecciona una plantilla para editar.</p>
      )}
    </div>
  )
}

export default Templates

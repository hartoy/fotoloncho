import React, { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useNavigate } from 'react-router-dom'
import validationSchema from './utils/validationSchema'
import { processImage } from './utils/imageProcessor'
import {
  createArticle,
  updateArticle,
  checkMovieNumberAvailability,
  checkSkuAvailability,
} from '../services/articleServices'
import { getTemplateByType } from '../services/templateServices'
import { generateHTML } from './utils/generateHTML'
import Spinner from './Spinner'

const MyForm = ({ isEditing, initialValues }) => {
  const [loading, setLoading] = useState(false)
  const [isSlides, setIsSlides] = useState(false)
  const [skuAvailabilityMessage, setSkuAvailabilityMessage] = useState('')
  const [movieNumberAvailabilityMessage, setMovieNumberAvailabilityMessage] = useState('')
  const navigate = useNavigate()

  const handleItemChange = (event) => {
    const selectedItem = event.target.value

    if (selectedItem === 'slides') {
      setIsSlides(true)
    } else {
      setIsSlides(false)
    }
  }

  const handleSkuChange = async (e, setFieldValue, values) => {
    const newSku = e.target.value
    setFieldValue('sku', newSku)
    if (!isEditing || newSku !== initialValues.sku) {
      const { available, message } = await checkSkuAvailability(newSku)
      setSkuAvailabilityMessage(available ? message : 'El sku ya existe. Cambia el valor.')
    } else {
      setSkuAvailabilityMessage('')
    }
  }

  const handleMovieNumberChange = async (e, setFieldValue, values) => {
    const newMovieNumber = e.target.value
    setFieldValue('movieNumber', newMovieNumber)
    if (!isEditing || newMovieNumber !== initialValues.movieNumber) {
      const { available, message } = await checkMovieNumberAvailability(newMovieNumber)
      setMovieNumberAvailabilityMessage(available ? message : 'El movieNumber ya existe. Cambia el valor.')
    } else {
      setMovieNumberAvailabilityMessage('')
    }
  }

  const handleSubmit = async (values) => {
    setLoading(true)
    try {
      const {
        item,
        img,
        title,
        aka,
        actor,
        signature,
        year,
        rerelease,
        weight,
        movieType,
        width,
        height,
        agency,
        origin,
        description,
        sku,
        skuLetter,
        cost,
        color,
        movieNumber,
        price,
      } = values

      let processedImage = null
      if (!isEditing && img) {
        try {
          processedImage = await processImage(img)
          values.img = processedImage
        } catch (error) {
          console.error('Error al procesar la imagen:', error)
        }
      }

      if (isEditing) {
        delete values.img
      }

      const templateData = await getTemplateByType(values.item.toLowerCase())
      const htmlContent = generateHTML(values, templateData)

      const blob = new Blob([htmlContent], { type: 'text/html' })
      const url = URL.createObjectURL(blob)

      const a = document.createElement('a')
      a.href = url
      a.download = `${title}.html`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      if (item === 'slides') {
        console.log('Item is slides')

        values.weight = 'Normal'
        values.height = 1
      }

      if (isEditing) {
        await updateArticle(values.sku, values)
      } else {
        await createArticle(values)
      }

      navigate('/articles')
    } catch (error) {
      console.error('Error en el procesamiento:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {({ setFieldValue, values }) => (
        <Form className="border-2 border-[#640D5F] rounded-lg p-6 my-12 bg-white">
          <div className="mb-4">
            <label className="block mb-1 pl-1 font-semibold">
              Item<span className="text-red-500 pl-2 pt-2 font-extrabold"> *</span>
            </label>
            <Field
              as="select"
              name="item"
              className="border p-2 w-full pl-2 focus:outline-none focus:ring-2 focus:ring-[#640D5F] focus:border-[#640D5F]"
              onChange={(e) => {
                handleItemChange(e)
                setFieldValue('item', e.target.value)
                if (e.target.value === 'slides') {
                  setFieldValue('weight', 'Normal')
                  setFieldValue('height', '1')
                } else {
                  setFieldValue('weight', '')
                  setFieldValue('height', '')
                }
              }}
            >
              <option value="">Selecciona</option>
              <option value="photos">Photos</option>
              <option value="slides">Slides</option>
              <option value="autographs">Autographs</option>
              <option value="posters">Posters</option>
              <option value="postcards">Postcards</option>
              <option value="printed-authographs">Printed Authographs</option>
              <option value="photo-reproductions">Photo Reproductions</option>
              <option value="lobby-cards">Lobby Cards</option>
              <option value="ads">ADS</option>
            </Field>
            <ErrorMessage name="item" component="div" className="text-red-500 pl-2 pt-2 font-semibold" />
          </div>

          <div className="flex mb-4">
            <div className="w-2/5 pr-2">
              {isEditing ? (
                <div className="h-full flex items-center">
                  <p className="text-green-600 pl-2 pt-1 font-semibold">La imagen será la misma.</p>
                </div>
              ) : (
                <>
                  <label className="block mb-1 pl-1 font-semibold">
                    Imagen <span className="text-red-500 pl-2 pt-2 font-extrabold"> *</span>
                  </label>
                  <input
                    name="img"
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                      setFieldValue('img', event.currentTarget.files[0])
                    }}
                    className="border p-[5px] w-full pl-2"
                  />
                  <ErrorMessage name="img" component="div" className="text-red-500 pl-2 pt-2 font-semibold" />
                </>
              )}
            </div>

            <div className="w-2/5 px-2">
              {isEditing ? (
                <div className="h-full flex items-center">
                  <p className="text-green-600 pl-2 pt-1 font-semibold">SKU: {values.sku}</p>
                </div>
              ) : (
                <>
                  <label className="block mb-1 pl-1 font-semibold">
                    SKU <span className="text-red-500 pl-2 pt-2 font-extrabold"> *</span>
                  </label>
                  <Field
                    name="sku"
                    className="border p-2 w-full pl-2 focus:outline-none focus:ring-2 focus:ring-[#640D5F] focus:border-[#640D5F]"
                    onChange={(e) => handleSkuChange(e, setFieldValue, values)}
                  />
                  <ErrorMessage name="sku" component="div" className="text-red-500 pl-2 pt-2 font-semibold" />
                  {skuAvailabilityMessage && (
                    <p
                      className={`pl-2 pt-2 font-semibold ${
                        skuAvailabilityMessage.includes('disponible') ? 'text-green-600' : 'text-red-500'
                      }`}
                    >
                      {skuAvailabilityMessage}
                    </p>
                  )}
                </>
              )}
            </div>

            <div className="w-1/5 pl-2">
              <label className="block mb-1 pl-1 font-semibold">SKU-Letter</label>
              <Field
                as="select"
                name="skuLetter"
                className="border p-2 w-full pl-2 focus:outline-none focus:ring-2 focus:ring-[#640D5F] focus:border-[#640D5F]"
              >
                <option value="">-</option>
                <option value="C">C</option>
                <option value="L">L</option>
                <option value="O">O</option>
                <option value="P">P</option>
              </Field>
              <ErrorMessage name="skuLetter" component="div" className="text-red-500 pl-2 pt-2 font-semibold" />
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-1 pl-1 font-semibold">
              Título<span className="text-red-500 pl-2 pt-2 font-extrabold">*</span>
            </label>
            <Field
              name="title"
              className="border p-2 w-full pl-2 focus:outline-none focus:ring-2 focus:ring-[#640D5F] focus:border-[#640D5F]"
            />
            <ErrorMessage name="title" component="div" className="text-red-500 pl-2 pt-2 font-semibold" />
          </div>

          <div className="mb-4">
            <label className="block mb-1 pl-1 font-semibold">A.K.A.</label>
            <Field
              name="aka"
              className="border p-2 w-full pl-2 focus:outline-none focus:ring-2 focus:ring-[#640D5F] focus:border-[#640D5F]"
            />
            <ErrorMessage name="aka" component="div" className="text-red-500 pl-2 pt-2 font-semibold" />
          </div>

          <div className="flex mb-4">
            <div className="w-1/2 pr-2">
              <label className="block mb-1 pl-1 font-semibold">Actor</label>
              <Field
                name="actor"
                className="border p-2 w-full pl-2 focus:outline-none focus:ring-2 focus:ring-[#640D5F] focus:border-[#640D5F]"
              />
              <ErrorMessage name="actor" component="div" className="text-red-500 pl-2 pt-2 font-semibold" />
            </div>
            <div className="w-1/2 pl-2">
              <label className="block mb-1 pl-1 font-semibold">Agencia/Fotógrafo</label>
              <Field
                name="agency"
                className="border p-2 w-full pl-2 focus:outline-none focus:ring-2 focus:ring-[#640D5F] focus:border-[#640D5F]"
              />
              <ErrorMessage name="agency" component="div" className="text-red-500 pl-2 pt-2 font-semibold" />
            </div>
          </div>

          <div className="flex mb-4">
            <div className="w-7/12 pr-2">
              <label className="block mb-1 pl-1 font-semibold">Año</label>
              <Field
                name="year"
                className="border p-2 w-full pl-2 focus:outline-none focus:ring-2 focus:ring-[#640D5F] focus:border-[#640D5F]"
              />
              <ErrorMessage name="year" component="div" className="text-red-500 pl-2 pt-2 font-semibold" />
            </div>
            <div className="w-7/12 pr-2">
              <label className="block mb-1 pl-1 font-semibold">Re-Release</label>
              <Field
                name="rerelease"
                className="border p-2 w-full pl-2 focus:outline-none focus:ring-2 focus:ring-[#640D5F] focus:border-[#640D5F]"
              />
              <ErrorMessage name="rerelease" component="div" className="text-red-500 pl-2 pt-2 font-semibold" />
            </div>
            <div className="w-5/12 pl-2">
              <label className="block mb-1 pl-1 font-semibold">
                Color<span className="text-red-500 pl-2 pt-2 font-extrabold"> *</span>
              </label>
              <Field
                as="select"
                name="color"
                className="border p-2 w-full pl-2 focus:outline-none focus:ring-2 focus:ring-[#640D5F] focus:border-[#640D5F]"
              >
                <option value="">Selecciona</option>
                <option value="Black and White">Black and White</option>
                <option value="Color">Color</option>
                <option value="Handcolored">Handcolored</option>
              </Field>
              <ErrorMessage name="color" component="div" className="text-red-500 pl-2 pt-2 font-semibold" />
            </div>
          </div>

          <div className="flex mb-4">
            <div className="w-1/2 pr-2">
              <label className="block mb-1 pl-1 font-semibold">Movie Type</label>
              <Field
                as="select"
                name="movieType"
                className="border p-2 w-full pl-2 focus:outline-none focus:ring-2 focus:ring-[#640D5F] focus:border-[#640D5F]"
              >
                <option value="">-</option>
                <option value="Silent">Silent</option>
              </Field>
              <ErrorMessage name="movieType" component="div" className="text-red-500 pl-2 pt-2 font-semibold" />
            </div>

            <div className="w-1/2 pl-2">
              <label className="block mb-1 pl-1 font-semibold">Movie Number</label>
              <Field
                name="movieNumber"
                className="border p-2 w-full pl-2 focus:outline-none focus:ring-2 focus:ring-[#640D5F] focus:border-[#640D5F]"
                onChange={(e) => handleMovieNumberChange(e, setFieldValue, values)}
              />
              <ErrorMessage name="movieNumber" component="div" className="text-red-500 pl-2 pt-2 font-semibold" />
              {movieNumberAvailabilityMessage && (
                <p
                  className={`pl-2 pt-2 font-semibold ${
                    movieNumberAvailabilityMessage.includes('disponible') ? 'text-green-600' : 'text-red-500'
                  }`}
                >
                  {movieNumberAvailabilityMessage}
                </p>
              )}
            </div>
          </div>

          <div className="flex mb-4">
            <div className="w-1/2 pr-2">
              <label className="block mb-1 pl-1 font-semibold">Signature</label>
              <Field
                as="select"
                name="signature"
                className="border p-2 w-full pl-2 focus:outline-none focus:ring-2 focus:ring-[#640D5F] focus:border-[#640D5F]"
              >
                <option value="">-</option>
                <option value="Handsigned">Handsigned</option>
                <option value="Printed">Printed</option>
              </Field>
              <ErrorMessage name="signature" component="div" className="text-red-500 pl-2 pt-2 font-semibold" />
            </div>
            <div className="w-1/2 pl-2">
              <label className="block mb-1 pl-1 font-semibold">Origin</label>
              <Field
                name="origin"
                className="border p-2 w-full pl-2 focus:outline-none focus:ring-2 focus:ring-[#640D5F] focus:border-[#640D5F]"
              />
              <ErrorMessage name="origin" component="div" className="text-red-500 pl-2 pt-2 font-semibold" />
            </div>
          </div>

          <div className="flex mb-4">
            <div className="w-1/3 pr-2">
              <label className={`block mb-1 pl-1 font-semibold ${isSlides ? 'text-gray-400' : ''}`}>
                Weight
                <span className="text-red-500 pl-2 pt-2 font-extrabold"> *</span>
              </label>
              {!isSlides && (
                <Field
                  as="select"
                  name="weight"
                  className={`border p-2 w-full pl-2 focus:outline-none focus:ring-2 focus:ring-[#640D5F] focus:border-[#640D5F]`}
                >
                  <option value="">-</option>
                  <option value="Normal">Normal</option>
                  <option value="Double">Double</option>
                </Field>
              )}
              <ErrorMessage name="weight" component="div" className="text-red-500 pl-2 pt-2 font-semibold" />
            </div>

            <div className="flex w-2/3 pl-2">
              <div className="w-1/2 pr-2">
                <label className="block mb-1 pl-1 font-semibold">
                  {isSlides ? 'Width (milimeters)' : 'Width (pulgadas)'}
                  <span className="text-red-500 pl-2 pt-2 font-extrabold"> *</span>
                </label>
                <Field
                  name="width"
                  type="number"
                  className="border p-2 w-full pl-2 focus:outline-none focus:ring-2 focus:ring-[#640D5F] focus:border-[#640D5F]"
                />
                <ErrorMessage name="width" component="div" className="text-red-500 pl-2 pt-2 font-semibold" />
              </div>

              <div className="w-1/2 pl-2">
                <label className={`block mb-1 pl-1 font-semibold ${isSlides ? 'text-gray-400' : ''}`}>
                  Height ({isSlides ? 'milimeters' : 'pulgadas'})
                  <span className="text-red-500 pl-2 pt-2 font-extrabold"> *</span>
                </label>

                {!isSlides && (
                  <Field
                    name="height"
                    type="number"
                    className="border p-2 w-full pl-2 focus:outline-none focus:ring-2 focus:ring-[#640D5F] focus:border-[#640D5F]"
                  />
                )}

                <ErrorMessage name="height" component="div" className="text-red-500 pl-2 pt-2 font-semibold" />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-1 pl-1 font-semibold">
              Descripción<span className="text-red-500 pl-2 pt-2 font-extrabold"> *</span>
            </label>
            <Field name="description" as="textarea" className="border p-2 w-full pl-2 h-40" />
            <ErrorMessage name="description" component="div" className="text-red-500 pl-2 pt-2 font-semibold" />
          </div>

          <div className="flex mb-4">
            <div className="w-1/2 pr-2">
              <label className="block mb-1 pl-1 font-semibold">
                Precio<span className="text-red-500 pl-2 pt-2 font-extrabold"> *</span>
              </label>
              <Field
                name="price"
                type="number"
                className="border p-2 w-full pl-2 focus:outline-none focus:ring-2 focus:ring-[#640D5F] focus:border-[#640D5F]"
              />
              <ErrorMessage name="price" component="div" className="text-red-500 pl-2 pt-2 font-semibold" />
            </div>
            <div className="w-1/2 pl-2">
              <label className="block mb-1 pl-1 font-semibold">Costo</label>
              <Field
                name="cost"
                type="number"
                className="border p-2 w-full pl-2 focus:outline-none focus:ring-2 focus:ring-[#640D5F] focus:border-[#640D5F]"
              />
              <ErrorMessage name="cost" component="div" className="text-red-500 pl-2 pt-2 font-semibold" />
            </div>
          </div>
          <div className="flex items-center justify-center mt-12">
            <button
              type="submit"
              className="bg-[#640D5F] text-white p-2 rounded transition duration-200 hover:scale-110 px-7 py-3 flex items-center justify-center"
              disabled={loading}
            >
              {loading ? <Spinner /> : isEditing ? 'ACTUALIZAR' : 'CREAR'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default MyForm

import React from 'react'
import Form from '../components/Form'

const FormPage = () => {
  const initialValues = {
    item: '',
    img: null,
    sku: '',
    skuLetter: '',
    title: '',
    aka: '',
    actor: '',
    signature: '',
    year: '',
    rerelease: '',
    weight: '',
    movieType: '',
    width: '',
    height: '',
    agency: '',
    description: '',
    cost: '',
    price: '',
    movieNumber: '',
    origin: '',
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      <Form initialValues={initialValues} />
    </div>
  )
}

export default FormPage

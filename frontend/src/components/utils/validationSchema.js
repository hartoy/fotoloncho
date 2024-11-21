import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  sku: Yup.number().typeError('El SKU solo puede contener números.').required('El SKU es obligatorio.'),
  skuLetter: Yup.string().matches(/^[CLOPS]$/, 'Solo se permiten las letras: C, L, O, P y S'),
  title: Yup.string().max(120, 'Máximo 120 caracteres').required('El título es obligatorio.'),
  aka: Yup.string().max(120, 'Máximo 120 caracteres'),
  item: Yup.string().required('Selecciona un item.'),
  actor: Yup.string().typeError('El actor debe ser solo letras.'),
  agency: Yup.string().typeError('Agency solo puede llevar letras.'),
  year: Yup.string(),
  rerelease: Yup.number().typeError('El re-release debe ser un número.'),
  color: Yup.string().required('Selecciona un color.'),
  movieType: Yup.string(),
  movieNumber: Yup.string()
    .max(12, 'Máximo 12 caracteres.')
    .matches(/^[a-zA-Z0-9-]*$/, 'Solo se permiten letras, números y guiones.'),
  signature: Yup.string(),
  origin: Yup.string().typeError('Origen solo puede llevar letras.'),
  weight: Yup.string().required('Selecciona un peso.'),
  width: Yup.number()
    .required('El ancho es obligatorio.')
    .positive('El ancho debe ser un número positivo.')
    .typeError('El ancho debe ser un número.'),
  height: Yup.number()
    .required('La altura es obligatoria.')
    .positive('La altura debe ser un número positivo.')
    .typeError('La altura debe ser un número.'),
  description: Yup.string().max(2000, 'Máximo 2000 caracteres.'),
  price: Yup.number().required('El precio es obligatorio.').typeError('El precio debe ser un número válido.'),
  cost: Yup.string(),
  img: Yup.mixed().required('La imagen es obligatoria.'),
})

export default validationSchema

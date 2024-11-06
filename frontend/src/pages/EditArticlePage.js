import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Form from '../components/Form'
import { searchArticleBySKU } from '../services/articleServices'
import Spinner from '../components/Spinner'

const EditArticlePage = () => {
  const { sku } = useParams()
  const [article, setArticle] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const convertNullsToEmptyStrings = (obj) => {
    return Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, value === null ? '' : value]))
  }

  useEffect(() => {
    const fetchArticle = async () => {
      setIsLoading(true)
      try {
        const data = await searchArticleBySKU(sku)
        const articleData = data[0]

        const formattedArticle = convertNullsToEmptyStrings(articleData)

        setArticle(formattedArticle)
      } catch (error) {
        console.error('Error al cargar el artículo:', error)
        setError('No se encontró el artículo.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchArticle()
  }, [sku])

  return (
    <div className="max-w-7xl mx-auto px-4">
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <p>{error}</p>
      ) : article ? (
        <Form isEditing={true} initialValues={article} />
      ) : (
        <p>No se encontró el artículo.</p>
      )}
    </div>
  )
}

export default EditArticlePage

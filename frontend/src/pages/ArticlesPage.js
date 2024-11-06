import React, { useState, useEffect } from 'react'
import Article from '../components/Article'
import Spinner from '../components/Spinner'
import { getArticles, deleteArticle, searchArticles } from '../services/articleServices'

const ArticlesPage = () => {
  const [articles, setArticles] = useState([])
  const [filteredArticles, setFilteredArticles] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [searchType, setSearchType] = useState('title')
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await getArticles(page)
        setArticles(response.data)
        setFilteredArticles(response.data)
        setTotalPages(response.totalPages)
      } catch (error) {
        console.error('Error al obtener artículos:', error.message)
        setError('Hubo un problema al cargar los artículos.')
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [page])

  useEffect(() => {
    const fetchFilteredArticles = async () => {
      setLoading(true)
      setError(null)
      try {
        if (searchQuery.trim() === '') {
          setFilteredArticles(articles)
        } else {
          const response = await searchArticles(searchType, searchQuery)
          console.log(`Resultados de la búsqueda por ${searchType}:`, response)
          setFilteredArticles(response)
        }
      } catch (error) {
        console.error(`Error al buscar artículo por ${searchType}:`, error.message)
        setError('No se encontraron resultados para la búsqueda.')
        setFilteredArticles([])
      } finally {
        setLoading(false)
      }
    }

    fetchFilteredArticles()
  }, [searchQuery, articles, searchType])

  const handleSearch = (e) => {
    e.preventDefault()
  }

  const handleEdit = (id) => {
    console.log('Editar artículo con ID:', id)
  }

  const handleDelete = async (sku) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este artículo?')
    if (confirmDelete) {
      setLoading(true)
      try {
        await deleteArticle(sku)
        const updatedArticles = articles.filter((article) => article.sku !== sku)
        setArticles(updatedArticles)
        setFilteredArticles(updatedArticles)
      } catch (error) {
        console.error('Error al eliminar el artículo:', error.message)
        setError('Hubo un problema al eliminar el artículo.')
      } finally {
        setLoading(false)
      }
    }
  }

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1)
  }

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1)
  }

  return (
    <div className="max-w-7xl mx-auto px-6 my-12">
      <h1 className="text-2xl font-bold mb-6 text-center">Stock de Artículos</h1>

      <form onSubmit={handleSearch} className="flex items-center space-x-2 mb-6">
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="border-2 border-[#640D5F] rounded-lg p-2 basis-[10%] bg-white"
        >
          <option value="title">Título</option>
          <option value="sku">SKU</option>
          <option value="movieNumber">Movie Number</option>
        </select>
        <input
          type="text"
          placeholder={`Buscar por ${searchType}`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border-2 border-[#640D5F] rounded-lg p-2 basis-[90%] bg-white"
        />
        <button
          type="submit"
          className="bg-[#640D5F] text-white rounded-lg px-4 py-2 transition duration-200 hover:scale-110"
        >
          Buscar
        </button>
      </form>

      {loading ? (
        <div className="flex flex-col items-center justify-center mt-12">
          <Spinner />
          <span className="mt-6">Cargando artículos</span>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center mt-12">
          <span className="text-red-500 text-2xl font-bold mb-6 text-center mt-20">{error}</span>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article) => (
              <Article
                key={article.id}
                article={article}
                onEdit={handleEdit}
                onDelete={() => handleDelete(article.sku)}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center mt-12">
              <span className="text-2xl font-bold mb-6 text-center mt-20">No se encontraron artículos.</span>
            </div>
          )}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={handlePreviousPage}
              disabled={page === 1}
              className="bg-[#640D5F] text-white rounded-lg px-4 py-2 transition duration-200 hover:scale-110 disabled:opacity-50"
            >
              Anterior
            </button>
            <span className="text-lg font-semibold">
              Página {page} de {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={page === totalPages}
              className="bg-[#640D5F] text-white rounded-lg px-4 py-2 transition duration-200 hover:scale-110 disabled:opacity-50"
            >
              Siguiente
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ArticlesPage

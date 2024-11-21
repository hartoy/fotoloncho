import React from 'react'
import { useNavigate } from 'react-router-dom'

const Article = ({ article, onEdit, onDelete }) => {
  const navigate = useNavigate()

  const handleEdit = () => {
    navigate(`/edit/${article.sku}`)
  }

  const imageUrl = `${process.env.REACT_APP_API_URL}/${article.img}`

  return (
    <div className="bg-white p-6 rounded-lg shadow-md my-2 border-2 border-[#640D5F] transition-transform duration-300 hover:scale-105">
      <div className="flex items-center justify-between">
        <div className="flex items-center  p-2 rounded-lg w-4/5">
          <img
            src={imageUrl}
            alt={article.title}
            className="w-16 h-16 object-cover mr-4 rounded transition-transform duration-300 hover:scale-150"
          />
          <div className="w-full">
            <h3 className="font-semibold text-lg">{article.title}</h3>

            <div className="flex justify-between mt-5 w-4/5">
              <p className="font-semibold transition-transform duration-300 hover:scale-110">
                SKU:
                <span className="font-bold italic text-blue-500 ms-1">
                  {`${article.sku}`} {article.skuLetter && `- ${article.skuLetter}`}
                </span>
              </p>
              {article.movieNumber && (
                <p className="font-semibold transition-transform duration-300 hover:scale-110">
                  Movie Number: <span className="font-bold italic ms-1">{article.movieNumber}</span>
                </p>
              )}
              {article.price && (
                <p className="font-semibold transition-transform duration-300 hover:scale-110">
                  Precio: <span className="font-bold italic ms-1">{article.price}</span>
                </p>
              )}
              {article.cost && (
                <p className="font-semibold transition-transform duration-300 hover:scale-110">
                  Costo: <span className="font-bold italic text-green-600 ms-1">{`${article.cost}`}</span>
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-4 ml-4">
          <button
            onClick={handleEdit}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200 hover:scale-110"
          >
            Editar
          </button>
          <button
            onClick={() => onDelete(article.id)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200 hover:scale-110"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  )
}

export default Article

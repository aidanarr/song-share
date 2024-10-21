import "/src/styles/Artist.scss"
import { useNavigate } from "react-router-dom"
import placeholder from "/src/images/placeholder.jpg"

const Artist = ({ artistData }) => {

  const navigate = useNavigate();

  const handleClickCard = () => {
    navigate("/artist/" + artistData.id)
  }

  const handleImageError = (ev) => {
    ev.target.src = placeholder
  }

  return (
    <div>
        <article onClick={handleClickCard} className="artist-card">
          <i className="fa-solid fa-music artist-card__music"></i>
          <img className="artist-card__img" src={artistData.img ? artistData.img : placeholder} onError={handleImageError} />
          <div className="card-text">
          <p className="artist-card__title">{artistData.name}</p>
          </div>
        </article>
    </div>
  )
}

export default Artist
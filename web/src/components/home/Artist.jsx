import "/src/styles/Artist.scss"
import { useNavigate } from "react-router-dom"

const Artist = ({ artistData }) => {

  const navigate = useNavigate();

  const handleClickCard = () => {
    navigate("/artist/" + artistData.id)
  }

  return (
    <>
        <article onClick={handleClickCard} className="artist-card">
          <img className="artist-card__img" src={artistData.img} />
          <div className="card-text">
          <p className="artist-card__title">{artistData.name}</p>
          </div>
        </article>
    </>
  )
}

export default Artist
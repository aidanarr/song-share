import "/src/styles/Song.scss"
import { useNavigate } from "react-router-dom"

const Song = ({ songData }) => {

  const navigate = useNavigate();

  const handleClickCard = () => {
    navigate("/song/" + songData.id)
  }

  const renderIcon = () => {
    try {
      if (songData.url.includes("spotify")) {
        return <i className="fa-brands fa-spotify"></i>
      } else if (songData.url.includes("youtu")) {
        return <i className="fa-brands fa-youtube"></i>
      } else return <i className="fa-solid fa-link"></i>
    } catch (err) {
      return false
    }   
  }

  return (
    <div className="card-container">
        <a className="url" id="song-url" href={songData.url} target="_blank">{renderIcon()}</a>
        <article onClick={handleClickCard} className="song-card">
          <div className="song-card__text">
            <p className="song-card__text--title">{songData.title}</p>
            <p className="song-card__text--artist">{songData.artist}</p> 
          </div>          
          <img className="song-card__img" src={songData.img} />          
        </article>
    </div>
  )
}

export default Song
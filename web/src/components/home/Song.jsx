import "/src/styles/Song.scss"
import { useNavigate } from "react-router-dom"

const Song = ({ songData }) => {

  const navigate = useNavigate();

  const handleClickCard = () => {
    navigate("/song/" + songData.id)
  }

  const artistNames = songData.id ? songData.artist.map((artist) => artist) : false;

  const renderArtists = () => {
    if (artistNames.length > 1) {
      let artistList = "";
      for (let i = 0; i < artistNames.length ; i++) {
        artistList += artistNames[i] 
        artistList += artistNames.length === i + 1 ? "" : ", ";
      }
      return artistList
    } else return artistNames
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
        <i className="fa-solid fa-music song-card__music"></i>
          <div className="song-card__text">
            <p className="song-card__text--title">{songData.title}</p>
            <p className="song-card__text--artist">{renderArtists()}</p> 
          </div>          
          <img className="song-card__img" src={songData.img} />          
        </article>
    </div>
  )
}

export default Song
import "/src/styles/Song.scss"
import { Link } from "react-router-dom"

const Song = ({ songData }) => {
  return (
    <>
      <Link to={`/song/${songData.id}`}>
        <article className="song-card">
          <p>{songData.title}</p>
          <p>{songData.artist}</p>
          <img src={songData.img} />
          <a href={songData.url} target="_blank">url</a>
        </article>
      </Link>
    </>
  )
}

export default Song
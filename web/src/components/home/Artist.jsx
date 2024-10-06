import "/src/styles/Artist.scss"
import { Link } from "react-router-dom"

const Artist = ({ artistData }) => {
  return (
    <>
      <Link to={`/artist/${artistData.id}`}>
        <article className="artist-card">
          <p>{artistData.name}</p>
          <img src={artistData.img} />
        </article>
      </Link>
    </>
  )
}

export default Artist
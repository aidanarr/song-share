import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import fetchArtistId from "/src/services/fetchArtistId.js"
import NotFound from "../common/NotFound.jsx"

const ArtistDetail = ({ setLoader, user }) => {

  const [artist, setArtist] = useState({});


  //find artist id
  const {id} = useParams();

  useEffect(() => {
    try {
      setLoader(true)
      fetchArtistId(id).then((data) => setArtist(data));
      setTimeout(() => {
        setLoader(false)
      }, 500)
    }catch (err){
      console.error(err)
    }
  }, [])

  const renderEditBtn = () => {
    if (artist.user.username === user) {
      return <Link to={`/artist/update/${id}`}>
        <button>Edit artist</button>
       </Link>
    } else return false
  }

  return (
    <div>
      {
        artist.id ?
          <article>
          <h2>{artist.name}</h2> 
          <p>{artist.bio}</p>
          <img src={artist.img} />
          {renderEditBtn()}
        </article>
        : <NotFound />
      }
    </div>
  )
}

export default ArtistDetail
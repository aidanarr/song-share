import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import fetchArtistId from "/src/services/fetchArtistId.js"
import fetchDeleteArtist from "/src/services/fetchDeleteArtist.js"
import NotFound from "../common/NotFound.jsx"

const ArtistDetail = ({ setLoader, user, token }) => {

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

  const handleDelete = (ev) => {
    ev.preventDefault()
    try {
      fetchDeleteArtist(user, id, token).then((response) => {
        if (response.success) {
          console.log(response)
        } else console.log("couldn't delete")
      })
    }catch (err) {
      console.error(err)
    }
  };

  const renderDeleteBtn = () => {
    if (artist.user.username === user) {
      return <button onClick={handleDelete}>Delete artist</button>
    } else return false
  };

  return (
    <div>
      {
        artist.id ?
          <article>
          <h2>{artist.name}</h2> 
          <p>{artist.bio}</p>
          <img src={artist.img} />
          {renderEditBtn()}
          {renderDeleteBtn()}
        </article>
        : <NotFound />
      }
    </div>
  )
}

export default ArtistDetail
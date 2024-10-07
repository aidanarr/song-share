import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import fetchArtistId from "/src/services/fetchArtistId.js"
import NotFound from "../common/NotFound.jsx"

const ArtistDetail = () => {

  const [artist, setArtist] = useState({});
  const [error, setError] = useState(false);

  //find artist id
  const {id} = useParams();

  useEffect(() => {
    try {
      fetchArtistId(id).then((data) => setArtist(data));
      artist.name === "CastError" ? setError(true) : false;
    }catch (err){
      console.error(err)
    }
  }, [id])

  return (
    <div>
      {
        !error ?
          <article>
          <h2>{artist.name}</h2> 
          <p>{artist.bio}</p>
          <img src={artist.img} />
        </article>
        : <NotFound />
      }
    </div>
  )
}

export default ArtistDetail
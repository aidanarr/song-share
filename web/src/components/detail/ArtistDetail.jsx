import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import fetchArtistId from "/src/services/fetchArtistId.js"

const ArtistDetail = () => {

  const [artist, setArtist] = useState();

  //find artist id
  const {id} = useParams();

  useEffect(() => {
    try {
      fetchArtistId(id).then((data) => setArtist(data))
    }catch (err){
      console.error(err)
    }
  }, [])

  console.log(artist);

  return (
    <div>ArtistDetail</div>
  )
}

export default ArtistDetail
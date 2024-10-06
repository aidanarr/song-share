import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import fetchSongId from "/src/services/fetchSongId.js"
import NotFound from "../common/NotFound.jsx"

export const SongDetail = () => {

  const [song, setSong] = useState();

  //find song id
  const {id} = useParams();
  
  useEffect(() => {
    try {
      fetchSongId(id).then((data) => setSong(data))
    }catch (err){
      console.error(err)
    }
  }, [])
  const artistNames = song ? song.artist.map((artist) => artist.name) : false;

  return (
    <div>
      {
        song ? 
        <article>
        <h2>{song.title}</h2>
        <p>{song.album}</p>
        <p>{artistNames}</p>
        <p>{song.year}</p>
          <p>{song.genre}</p>
          <img src={song.img} />
          <a href={song.url}>link</a>
          <p>Added by: {song.user.username} </p>
        </article> : <p>ay</p>
      }
     
    </div>
  )
}

export default SongDetail
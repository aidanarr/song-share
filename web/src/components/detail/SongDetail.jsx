import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import fetchSongId from "/src/services/fetchSongId.js"
import fetchDeleteSong from "/src/services/fetchDeleteSong.js"
import NotFound from "../common/NotFound.jsx"

export const SongDetail = ({ setLoader, user, token }) => {

  const [song, setSong] = useState({});

  //find song id
  const {id} = useParams();
  
  useEffect(() => {
    try {
      setLoader(true)
      fetchSongId(id).then((data) => setSong(data))
      setTimeout(() => {
        setLoader(false)
      }, 500)
    }catch (err){
      console.error(err)
    }
  }, [])

  const artistNames = song.id ? song.artist.map((artist) => artist.name) : false;

  const renderEditBtn = () => {
    if (song.user.username === user) {
      return <Link to={`/song/update/${id}`}>
        <button>Edit song</button>
       </Link>
    } else return false
  };

  const handleDelete = (ev) => {
    ev.preventDefault()
    try {
      fetchDeleteSong(user, id, token).then((response) => {
        if (response.success) {
          console.log(response)
        } else console.log("couldn't delete")
      })
    }catch (err) {
      console.error(err)
    }
  };

  const renderDeleteBtn = () => {
    if (song.user.username === user) {
      return <button onClick={handleDelete}>Delete song</button>
    } else return false
  };


  return (
    <div>
      {
        song.id ?
        <article>
        <h2>{song.title}</h2>
        <p>{song.album}</p>
        <p>{artistNames}</p>
        <p>{song.year}</p>
          <p>{song.genre}</p>
          <img src={song.img} />
          <a href={song.url}>link</a>
          <p>Added by: {song.user.username} </p>
          {renderEditBtn()}
          {renderDeleteBtn()}
        </article> : <NotFound />
      }
    </div>
  )
}

export default SongDetail
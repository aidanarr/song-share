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

  const renderEditBtn = () => {
    if (song.user.username === user) {
      return <Link to={`/song/update/${id}`}>
        <button className="song-detail__user--delete"><i className="fa-solid fa-pen-to-square"></i></button>
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
      return <button className="song-detail__user--delete" onClick={handleDelete}><i className="fa-solid fa-trash-can"></i></button>
    } else return false
  };

  const renderIcon = () => {
    try {
      if (song.url.includes("spotify")) {
        return <i className="fa-brands fa-spotify"></i>
      } else if (song.url.includes("youtu")) {
        return <i className="fa-brands fa-youtube"></i>
      } else return <i className="fa-solid fa-link"></i>
    } catch (err) {
      return false
    }   
  }

  return (
    <div className="song-detail-container">
      {song.id ? (
        <article className="song-detail">
          <i className="fa-solid fa-music song-detail__music"></i>
          <h2 className="song-detail__title">{song.title}</h2>
          <p className="song-detail__album">{song.album}</p>
          <p className="song-detail__artist">by {renderArtists()}</p>
          <img className="song-detail__img" src={song.img} />
          <div className="song-detail__details">
            <div>
              <p className="song-detail__details--year">year 2017</p>
              <p className="song-detail__details--genre">genre: {song.genre}</p>
            </div>
            <a className="song-detail__details--url" href={song.url}>
              {renderIcon()}
            </a>
          </div>
          <div className="song-detail__user">
            <p className="song-detail__user--username">
              Added by
              <Link to={"/user/" + song.user._id}> {song.user.username} </Link>
            </p>
            <div>
              {renderEditBtn()}
              {renderDeleteBtn()}
            </div>
          </div>
        </article>
      ) : (
        <NotFound />
      )}
      <div className="back-link">
        <Link to="/">Back</Link>
      </div>
    </div>
  );
}

export default SongDetail
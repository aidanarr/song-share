import { useParams, Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import fetchSongId from "/src/services/fetchSongId.js"
import fetchDeleteSong from "/src/services/fetchDeleteSong.js"
import NotFound from "../common/NotFound.jsx"
import ModalDelete from "../common/ModalDelete.jsx"
import placeholder from "/src/images/placeholder.jpg"


export const SongDetail = ({ setLoader, user, token, loader
 }) => {

  const [song, setSong] = useState({});
  const [modalDelete, setModalDelete] = useState(false)

  const navigate = useNavigate()

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

  const handleDelete = () => {
    try {
      fetchDeleteSong(user, id, token).then((response) => {
        if (response.success) {
          setLoader(true)
          setTimeout(() => {
            setModalDelete(false)
            navigate("/")
            setLoader(false)
          }, 1000)

        } else console.error("couldn't delete")
      })
    }catch (err) {
      console.error(err)
    }
  };

  const handleModalDelete = (ev) => {
    ev.preventDefault()
    setModalDelete(true)
  }

  const renderDeleteBtn = () => {
    if (song.user.username === user) {
      return <button className="song-detail__user--delete" onClick={handleModalDelete}><i className="fa-solid fa-trash-can"></i></button>
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

  const handleImageError = (ev) => {
    ev.target.src = placeholder
  }

  const renderPage = () => {
    if (!loader){
      return song.id ? (
        <article className="song-detail">
          <i className="fa-solid fa-music song-detail__music"></i>
          <h2 className="song-detail__title">{song.title}</h2>
          <p className="song-detail__album">{song.album}</p>
          <p className="song-detail__artist">by {renderArtists()}</p>
          <img className="song-detail__img" onError={handleImageError} src={song.img ? song.img : placeholder} />
          <div className="song-detail__details">
            <div>
              <p className="song-detail__details--year">year {song.year}</p>
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
      )
    } else return false
  }

  return (
    <>
    {modalDelete ? <ModalDelete setModalDelete={setModalDelete} modalId="song" modalDelete={modalDelete} deleteSong={handleDelete} /> : false}
    <div className="song-detail-container">
      {renderPage()}
      <div className="back-link">
        <Link to="/">Back</Link>
      </div>
    </div>
    </>
  );
}

export default SongDetail
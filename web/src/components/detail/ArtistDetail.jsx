import { useParams, Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import fetchArtistId from "/src/services/fetchArtistId.js"
import fetchDeleteArtist from "/src/services/fetchDeleteArtist.js"
import NotFound from "../common/NotFound.jsx"
import ModalDelete from "../common/ModalDelete.jsx"

const ArtistDetail = ({ setLoader, user, token }) => {

  const [artist, setArtist] = useState({});
  const [modalDelete, setModalDelete] = useState(false)

  const navigate = useNavigate()

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
        <button className="song-detail__user--delete"><i className="fa-solid fa-pen-to-square"></i></button>
       </Link>
    } else return false
  }

  const handleDelete = () => {
    try {
      fetchDeleteArtist(user, id, token).then((response) => {
        if (response.success) {
          setLoader(true)
          setTimeout(() => {
            setModalDelete(false)
            navigate("/")
            setLoader(false)
          }, 1000)
        } else console.log("couldn't delete")
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
    if (artist.user.username === user) {
      return <button className="song-detail__user--delete" onClick={handleModalDelete}><i className="fa-solid fa-trash-can"></i></button>
    } else return false
  };

  const renderSongs = () => {
    const songs = artist.songs.map((song, i) => {
      return <li key={i}><Link to={`/song/${song._id}`}>{song.title}</Link></li>
    });

    return songs
  }

  return (
    <>{modalDelete ? <ModalDelete setModalDelete={setModalDelete} modalId="artist" modalDelete={modalDelete} deleteArtist={handleDelete} /> : false}
    <div className="artist-detail-container">
      {artist.id ?
      <>
        <article className="artist-detail">
          <h2 className="artist-detail__title">{artist.name}</h2>
          <img className="artist-detail__img" src={artist.img} />
          <p>{artist.bio}</p>
          <div className="artist-detail__icons">
          {renderEditBtn()}
          {renderDeleteBtn()}
          </div>
        </article>
        <section className="artist-songs">
          <i className="fa-solid fa-music artist-detail__music"></i>
          <h3 className="artist-songs__title">Recommended songs</h3>
          <ul className="artist-songs__list">{renderSongs()}</ul>
        </section>
      </>
       : 
        <NotFound />
      }
      <div className="back-link">
        <Link to="/">Back</Link>
      </div>
    </div>
    </>
  );
}

export default ArtistDetail
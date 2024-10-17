import "/src/styles/Modal.scss"
import { useNavigate } from "react-router-dom"

export const Modal = ({newSongId, newArtistId, modalId, setShowSongs, setModal, modal}) => {

  const navigate = useNavigate();

  const handleClickNew = (ev) => {
    ev.preventDefault();
    setModal(false);
    if (modalId === "song-btn") {
      navigate("/song/" + newSongId)
    } else if (modalId === "artist-btn") {
      navigate("/artist/" + newArtistId)
    }
  }

  const handleClickAdd = (ev) => {
    ev.preventDefault();
    setModal(false);
    if (modalId === "song.btn") {
      navigate("/song/add")
    } else if (modalId === "artist-btn") {
      navigate("/artist/add")
    }
  }

  const handleClickBrowse = (ev) => {
    ev.preventDefault();
    setModal(false);
    if (modalId === "song-btn") {
      setShowSongs(true);
      navigate("/")
    } else if (modalId === "artist-btn") {
      setShowSongs(false);
      navigate("/")
    }
  }

  return (
    <div className="modal">
      <div className={`modal-window ${modal ? "popup-aninmation" : ""}`}>
        <button className="button" onClick={handleClickNew}>See new {modalId === "song-btn" ? "song" : "artist"}</button>
        <button className="button" onClick={handleClickAdd}>Add new {modalId === "song-btn" ? "song" : "artist"}</button>
        <button className="button" onClick={handleClickBrowse}>Browse {modalId === "song-btn" ? "songs" : "artists"}</button>
      </div>
    <div className="modal-bg">
    </div>
    </div>
  )
}

export default Modal
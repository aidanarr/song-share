import "/src/styles/Modal.scss"
import { useNavigate, Link } from "react-router-dom"

export const Modal = ({newSongId, newArtistId, modalId, setShowSongs}) => {

  const navigate = useNavigate();

  const handleClick = (ev) => {
    ev.preventDefault()
    if (modalId === "song-btn") {
      setShowSongs(true);
      navigate("/")
    } else if (modalId === "artist-btn") {
      setShowSongs(false);
      navigate("/")
    }
    
  }

  const renderModal = () => {
    if (modalId === "song-btn") {
      return <><p>Successfully added!</p>
      <Link to={`/song/${newSongId}`}>
        <button>See new song</button>
      </Link>
      <Link to="/song/add">
        <button>Add another song</button>
      </Link>
      <button onClick={handleClick}>Browse songs</button></>
      
    } else if (modalId === "artist-btn") {
      return <><p>Successfully added!</p>
      <Link to={`/song/${newArtistId}`}>
        <button>See new artist</button>
      </Link>
      <Link to="/artist/add">
        <button>Add another artist</button>
      </Link>
      <button onClick={handleClick}>Browse artists</button></>
    } else return false
  }
  return (
    <div className="modal">
    <div className="modal-window">
        {renderModal()}
      </div>
    <div className="modal-bg">
    </div>
    </div>
  )
}

export default Modal
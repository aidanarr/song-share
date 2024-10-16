import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import fetchAddSong from "/src/services/fetchAddSong.js"

const SongForm = ({ user, token, setModal, setNewSongId, setModalId, isLogged }) => {

  const [songData, setSongData] = useState({});
  const [missingFields, setMissingFields] = useState(false);
  const [wrongUrl, setWrongUrl] = useState(false);
  const [checked, setChecked] = useState(false);
  const [inputValue, setInputValue] = useState({
    title: "",
    artist: "",
    artist2: "",
    artist3: "",
    artist4: "",
    year: "",
    album: "",
    img: "",
    genre: "",
    url: "",
  })

  useEffect(() => {
    setSongData({...songData, user: user})
    setMessage("");
  }, [isLogged])

  const [message, setMessage] = useState("");

  const handleInput = (ev) => {
    const value = ev.target.value;
    const id = ev.target.id;
    setSongData({...songData, [id]: value})
    
  };

  const handleChange = (ev) => {
    const value = ev.target.value;
    const id = ev.target.id;
    setInputValue({...inputValue, [id]: value})
  }

  const validateUrl = () => {
    if (inputValue.url.includes("spotify") || inputValue.url.includes("youtube") || inputValue.url.includes("youtu.be")) {
      return true
    } else return false
  }

  const validateRequired = () => {
    if(inputValue.title && inputValue.artist && inputValue.genre && inputValue.url) {
      setMissingFields(false)
      return true
    } else {
      setMissingFields(true);
      return false
    }
  }

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setSongData({...songData, user: user});
    if (!isLogged) {
      setMessage("You must login first.")
      return false
    }

    if(!validateRequired()){
      return false
    }

      if (validateUrl()) {
        fetchAddSong(songData, token).then((response) => {
          if (response.success) {
            setInputValue({
              title: "",
              artist: "",
              artist2: "",
              artist3: "",
              artist4: "",
              year: "",
              album: "",
              img: "",
              genre: "",
              url: ""
            });
            setModalId(ev.target.id)
            setModal(true);
            setNewSongId(response.song._id);
          } else {
            setMessage(response.message)
          } 
        })
      } else setWrongUrl(true)
      
  }

  const handleCheckbox = (ev) => {
    setChecked(ev.target.checked)
  }

  return (
    <div className="form-container">
      <h2 className="form-title">Add new song</h2>
      <section className="form" >
      <form className="form__inputs" onInput={handleInput}>
        <label htmlFor="title">Title*</label>
        <p className={`required ${missingFields && !inputValue.title ? "" : "hidden"}`}>Required field.</p>
        <input
          onChange={handleChange}
          type="text"
          name="title"
          id="title"
          maxLength="30"
          value={inputValue.title}
          required
        />
          <label htmlFor="artist">Artist*</label>
          <p className={`required ${missingFields && !inputValue.artist ? "" : "hidden"}`}>Required field.</p>
          <input
            onChange={handleChange}
            type="text"
            name="artist"
            id="artist"
            maxLength="30"
            value={inputValue.artist}
            required
          />
          <div className="filters-text">
            <label htmlFor="filters-dropdown" className="filters-text__dropdown"><span>Add more artists</span><i className={`filter-icon fa-solid fa-caret-down ${!checked ? "filter-arrow-up" : "filter-arrow-down"}`}></i></label>
          </div>
          <input
            type="checkbox"
            id="filters-dropdown"
            className="filters-checkbox"
            onChange={handleCheckbox}
          />
          <div className="form__extra-artists filters">
            <label htmlFor="artist2">Artist 2:</label>
            <input
              onChange={handleChange}
              type="text"
              name="artist2"
              id="artist2"
              maxLength="30"
              value={inputValue.artist2}
            />
            <label htmlFor="artist3">Artist 3</label>
            <input
              onChange={handleChange}
              type="text"
              name="artist3"
              id="artist3"
              maxLength="30"
              value={inputValue.artist3}
            />
            <label htmlFor="artist3">Artist 4</label>
            <input
              onChange={handleChange}
              type="text"
              name="artist4"
              id="artist4"
              maxLength="30"
              value={inputValue.artist4}
            />
        </div>
        <label htmlFor="album">Album</label>
        <input
          onChange={handleChange}
          type="text"
          name="album"
          id="album"
          maxLength="30"
          value={inputValue.album}
        />
        <label htmlFor="year">Year</label>
        <input
          onChange={handleChange}
          type="number"
          name="year"
          id="year"
          max="9999"
          value={inputValue.year}
        />
        <label htmlFor="genre">Genre*</label>
        <p className={`required ${missingFields && !inputValue.genre ? "" : "hidden"}`}>Required field.</p>
        <input
          onChange={handleChange}
          type="text"
          name="genre"
          id="genre"
          maxLength="20"
          value={inputValue.genre}
          required
        />
        <label htmlFor="img">Picture</label>
        <input
          onChange={handleChange}
          type="text"
          name="img"
          id="img"
          maxLength="1"
          value={inputValue.img}
          required
        />
        <label htmlFor="url">Link*</label>
        <p className={`required ${missingFields && !inputValue.url ? "" : "hidden"}`}>Required field.</p>
        <p className={`required ${wrongUrl ? "" : "hidden"}`}>Please provide a valid Spotify or Youtube url.</p>
        <input
          onChange={handleChange}
          type="text"
          name="url"
          id="url"
          maxLength="1"
          placeholder="Provide a Spotify or Youtube url."
          value={inputValue.url}
        />
        <p className="error-msg">{message ? message : false}</p>
        <div className="submit-btn">
          <button type="submit" className="button" id="song-btn" onClick={handleSubmit}>
            Add song
          </button>
        </div>
      </form>
     
        </section>
      <div className="back-link">
        <Link to="/">Back</Link>
      </div>
    </div>
  );
}

export default SongForm
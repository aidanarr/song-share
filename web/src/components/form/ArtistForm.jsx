import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import fetchAddArtist from "/src/services/fetchAddArtist.js"

const ArtistForm = ({ user, token, setModal, setModalId,  setNewArtistId, isLogged }) => {
  const [artistData, setArtistData] = useState({});
  const [inputValue, setInputValue] = useState({
    name: "",
    bio: "",
    img: ""
  })
  const [message, setMessage] = useState("");
  const [missingFields, setMissingFields] = useState(false);

  useEffect(() => {
    setMessage("");
  }, [isLogged])

  const handleInput = (ev) => {
    const value = ev.target.value;
    const id = ev.target.id;
    setArtistData({...artistData, [id]: value})
    
  };

  const handleChange = (ev) => {
    const value = ev.target.value;
    const id = ev.target.id;
    setInputValue({...inputValue, [id]: value})
  }

  const validateRequired = () => {
    if(inputValue.name && inputValue.img) {
      setMissingFields(false)
      return true
    } else {
      setMissingFields(true);
      return false
    }
  }

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const id = ev.target.id;
    setMessage("");
    setArtistData({...artistData, user: user});

    if (!isLogged) {
      setMessage("You must login first.")
      return false
    }

    if(!validateRequired()){
      return false
    }

    fetchAddArtist(artistData, token).then((response) => {
      if (response.success) {
        setInputValue({
          name: "",
          bio: "",
          img: ""
        });
        setModalId(id);
        setModal(true);
        setNewArtistId(response.artist._id);
      } else {
        setMessage(response.message)
      }
    })
  }

  return (
    <div className="form-container">
      <h2 className="form-title">Add new artist</h2>
      <section className="form">
        <form className="form__inputs" onInput={handleInput}>
          <label htmlFor="name">Name*</label>
          <p className={`required ${missingFields && !inputValue.name ? "" : "hidden"}`}>Required field.</p>
          <input
            onChange={handleChange}
            type="text"
            name="name"
            id="name"
            value={inputValue.name}
          />
          <label htmlFor="bio">Bio</label>
          <input
            onChange={handleChange}
            type="text"
            name="bio"
            id="bio"
            value={inputValue.bio}
          />
          <label htmlFor="img">Image*</label>
          <p className={`required ${missingFields && !inputValue.img ? "" : "hidden"}`}>Required field.</p>
          <input
            onChange={handleChange}
            type="text"
            name="img"
            id="img"
            value={inputValue.img}
          />

          <p className="error-msg">{message ? message : false}</p>
          <div className="submit-btn">
            <button
              type="submit"
              className="button"
              id="song-btn"
              onClick={handleSubmit}
            >
              Add artist
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

export default ArtistForm
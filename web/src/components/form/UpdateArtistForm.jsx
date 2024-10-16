import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import fetchArtistId from "/src/services/fetchArtistId.js"
import fetchUpdateArtist from "/src/services/fetchUpdateArtist.js"

const UpdateArtistForm = ({ user, token, setLoader }) => {

  const {id} = useParams();

  const [missingFields, setMissingFields] = useState(false);
  const [artistData, setArtistData] = useState({});
  const [inputValue, setInputValue] = useState({
    name: "",
    bio: "",
    img: ""
  })
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setMessage("");
    try {
      setArtistData({...artistData, user: user});
      fetchArtistId(id).then((data) => {
        setInputValue({
          name: data.name,
          bio: data.bio,
          img: data.img
        })
      });      
    }catch (err){
      console.error(err)
    }
  }, [id])

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

  const handleClick = (ev) => {
    ev.preventDefault();
    setMessage("");
    
    if(!validateRequired()){
      return false
    }

    try {
      fetchUpdateArtist(artistData, token, id).then((response) => {
        if (response.success) {
          setLoader(true);
          setTimeout(() => {
            setLoader(false)
            navigate("/artist/" + id)
          }, 1000)
        } else {
          setMessage(response.message)
        }
      })
    } catch (err){
      console.error(err)
    }
    
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
            maxLength="30"
            value={inputValue.name}
          />
          <label htmlFor="bio">Bio</label>
          <textarea
            className="input-bio"
            onChange={handleChange}
            type="text"
            name="bio"
            id="bio"
            maxLength="300"
            value={inputValue.bio}
          />
          <label htmlFor="img">Image*</label>
          <p className={`required ${missingFields && !inputValue.img ? "" : "hidden"}`}>Required field.</p>
          <input
            onChange={handleChange}
            type="text"
            name="img"
            id="img"
            maxLength="1000"
            value={inputValue.img}
            placeholder="Please provide an image url."
          />

          <p className="error-msg">{message ? message : false}</p>
          <div className="submit-btn">
            <button
              type="submit"
              className="button"
              id="artist-btn"
              onClick={handleClick}
            >
              Update
            </button>
          </div>
        </form>
      </section>
      <div className="back-link">
        <Link to="/">Back</Link>
      </div>
    </div>
  )
}

export default UpdateArtistForm
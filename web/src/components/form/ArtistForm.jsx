import { useState } from "react";
import fetchAddArtist from "/src/services/fetchAddArtist.js"

const ArtistForm = ({ user, token, setModal, setModalId,  setNewArtistId }) => {
  const [artistData, setArtistData] = useState({});
  const [inputValue, setInputValue] = useState({
    name: "",
    bio: "",
    img: ""
  })
  const [message, setMessage] = useState("");

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

  const handleClick = (ev) => {
    ev.preventDefault();
    const id = ev.target.id;
    setMessage("");
    setArtistData({...artistData, user: user});
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
    <div>
      <form onInput={handleInput}>
        Name:
        <input onChange={handleChange} type="text" name="name" id="name" value={inputValue.name} />
        Bio:
        <input onChange={handleChange} type="text" name="bio" id="bio" value={inputValue.bio} />
        Img:
        <input onChange={handleChange} type="text" name="img" id="img" value={inputValue.img} />
      </form>
      <button id="artist-btn" onClick={handleClick}>Add artist</button>
          <p>{message ? message : false}</p>
    </div>
  )
}

export default ArtistForm
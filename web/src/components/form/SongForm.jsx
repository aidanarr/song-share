import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import fetchAddSong from "/src/services/fetchAddSong.js"

const SongForm = ({ user, token, setModal, setNewSongId, setModalId, isLogged }) => {

  const [songData, setSongData] = useState({});
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

  const handleClick = (ev) => {
    ev.preventDefault();
    setSongData({...songData, user: user});
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
    } else console.log("url no válida")
  }

  return (
    <div>
      
      <form onInput={handleInput}>
        Title:
        <input onChange={handleChange} type="text" name="title" id="title" value={inputValue.title} />
        <div>
          Artist:
          <input onChange={handleChange} type="text" name="artist" id="artist" value={inputValue.artist}/>
          Artist 2:
          <input onChange={handleChange} type="text" name="artist2" id="artist2" value={inputValue.artist2} />
          Artist 3:
          <input onChange={handleChange} type="text" name="artist3" id="artist3" value={inputValue.artist3} />
          Artist 4:
          <input onChange={handleChange} type="text" name="artist4" id="artist4" value={inputValue.artist4} />
        </div>
          Album:
          <input onChange={handleChange} type="text" name="album" id="album" value={inputValue.album} />
          Year:
          <input onChange={handleChange} type="number" name="year" id="year" value={inputValue.year}/>
          Genre:
          <input onChange={handleChange} type="text" name="genre" id="genre" value={inputValue.genre} />
          Picture:
          <input onChange={handleChange} type="text" name="img" id="img" value={inputValue.img} />
          Link:
          <input  onChange={handleChange} type="text" name="url" id="url" value={inputValue.url}/>
          <button id="song-btn" onClick={handleClick}>Add song</button>
          <p>{message ? message : false}</p>
          <Link to="/"><p>Back</p></Link>
      </form>
    </div>
  )
}

export default SongForm
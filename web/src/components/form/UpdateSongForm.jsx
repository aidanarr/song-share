import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import fetchSongId from "/src/services/fetchSongId.js"
import fetchUpdateSong from "/src/services/fetchUpdateSong.js"

const UpdateSongForm = ({ user, token, setLoader }) => {

  const {id} = useParams();

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
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setMessage("");
    try {
      setSongData({...songData, user: user});
      fetchSongId(id).then((data) => {
        const artistNames = data.id ? data.artist.map((artist) => artist.name) : false;
        setInputValue({
          title: data.title,
          artist: artistNames[0],
          artist2: artistNames[1] ? artistNames[1] : "",
          artist3: artistNames[2] ? artistNames[2] : "",
          artist4: artistNames[3] ? artistNames[3] : "",
          year: data.year,
          album: data.album,
          img: data.img,
          genre: data.genre,
          url: data.url,
        })
      });      
    }catch (err){
      console.error(err)
    }
  }, [id])

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

  const handleClick = (ev) => {
    ev.preventDefault();
    try {
      fetchUpdateSong(songData, token, id).then((response) => {
        if (response.success) {
          setLoader(true);
          setTimeout(() => {
            setLoader(false)
            navigate("/song/" + id)
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
          <input onChange={handleChange} type="text" name="url" id="url" value={inputValue.url}/>
          <button id="song-btn" onClick={handleClick}>Update song</button>
          <p>{message ? message : false}</p>
          <Link to="/"><p>Back</p></Link>
      </form>
    </div>
  )
}

export default UpdateSongForm
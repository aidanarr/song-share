import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import fetchArtistId from "/src/services/fetchArtistId.js"
import fetchUpdateArtist from "/src/services/fetchUpdateArtist.js"

const UpdateArtistForm = ({ user, token, setLoader }) => {

  const {id} = useParams();

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

  const handleClick = (ev) => {
    ev.preventDefault();
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
    <div>
      <form onInput={handleInput}>
        Name:
        <input onChange={handleChange} type="text" name="name" id="name" value={inputValue.name} />
          Bio:
          <input onChange={handleChange} type="text" name="bio" id="bio" value={inputValue.bio}/>
          Picture:
          <input onChange={handleChange} type="text" name="img" id="img" value={inputValue.img} />
          <button id="artist-btn" onClick={handleClick}>Update artist</button>
          <p>{message ? message : false}</p>
          <Link to="/"><p>Back</p></Link>
      </form>
    </div>
  )
}

export default UpdateArtistForm
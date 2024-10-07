import "/src/styles/Main.scss"
import SongFilters from "../home/SongFilters.jsx"
import ArtistFilters from "../home/ArtistFilters.jsx"
import List from "../home/List.jsx"
import AddBtn from "../home/AddBtn.jsx"
import { useState } from "react";

const Main = ({showSongs, setShowSongs}) => {

  const [valueTitle, setValueTitle] = useState("");
  const [valueArtist, setValueArtist] = useState("");
  const [songGenres, setSongGenres] = useState([]);
  const [valueGenre, setValueGenre] = useState("");
  const [valueName, setValueName] = useState("")

  function handleClick(ev){
    const value = ev.target.value;
    if (value === "artists") {
      setShowSongs(false)
    } else {
      setShowSongs(true)
    }
  }

  return (
    <>
    <main className="main">
        <form className="switch">
          <input onClick={handleClick} className="switch__radio" type="radio" id="songs" name="switch" value="songs" checked={showSongs} />
          <label className="switch__label" htmlFor="songs"><div className="switch__label--text">Songs</div></label>
          <input onClick={handleClick}  className="switch__radio" type="radio" id="artists" name="switch" value="artists" checked={!showSongs} />
          <label className="switch__label" htmlFor="artists"><div className="switch__label--text">Artists</div></label>
        </form>
        {showSongs ? <SongFilters
          setValueTitle={setValueTitle}
          setValueArtist={setValueArtist}
          setValueGenre={setValueGenre}
          songGenres={songGenres} />
           : <ArtistFilters
           setValueName={setValueName} />}
        <div className="browse-box">
          <p>Browse {showSongs ? "Songs" : "Artists"}</p>
          <AddBtn showSongs={showSongs} />
        </div>
        <List
         valueName={valueName}
         valueGenre={valueGenre}
         setSongGenres={setSongGenres}
         valueTitle={valueTitle}
         valueArtist={valueArtist}
         showSongs={showSongs} />
    </main>
    </>
  )
}

export default Main
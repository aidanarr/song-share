import "/src/styles/Main.scss"
import SongFilters from "../home/SongFilters.jsx"
import ArtistFilters from "../home/ArtistFilters.jsx"
import List from "../home/List.jsx"
import { useState, useEffect } from "react";

const Main = ({showSongs, setShowSongs, isLogged, setLoader}) => {

  const [valueTitle, setValueTitle] = useState("");
  const [valueArtist, setValueArtist] = useState("");
  const [songGenres, setSongGenres] = useState([]);
  const [valueGenre, setValueGenre] = useState("");
  const [valueName, setValueName] = useState("")

  useEffect(() => {
    setLoader(true)
    setTimeout(() => {
      setLoader(false)
    }, 500)
  }, [])

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
          <input
            onClick={handleClick}
            className="switch__radio"
            type="radio"
            id="songs"
            name="switch"
            value="songs"
            checked={showSongs}
          />
          <label className="switch__label" htmlFor="songs">
            <div className="switch__label--text">Songs</div>
          </label>
          <input
            onClick={handleClick}
            className="switch__radio"
            type="radio"
            id="artists"
            name="switch"
            value="artists"
            checked={!showSongs}
          />
          <label className="switch__label" htmlFor="artists">
            <div className="switch__label--text">Artists</div>
          </label>
        </form>
        <section className="list">
          {showSongs ? (
            <SongFilters
              setValueTitle={setValueTitle}
              setValueArtist={setValueArtist}
              setValueGenre={setValueGenre}
              songGenres={songGenres}
            />
          ) : (
            <ArtistFilters setValueName={setValueName} />
          )}
          <List
            isLogged={isLogged}
            valueName={valueName}
            valueGenre={valueGenre}
            setSongGenres={setSongGenres}
            valueTitle={valueTitle}
            valueArtist={valueArtist}
            showSongs={showSongs}
          />
        </section>
      </main>
    </>
  );
}

export default Main
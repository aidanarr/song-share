import "/src/styles/List.scss"
import Song from "../home/Song.jsx"
import Artist from "../home/Artist.jsx"
import fetchAllSongs from "/src/services/fetchAllSongs.js"
import fetchAllArtists from "/src/services/fetchAllArtists.js"
import { useState, useEffect } from "react";
import AddBtn from "../home/AddBtn.jsx"

const List = ({ showSongs, valueTitle, valueArtist, setSongGenres, valueGenre, valueName, isLogged }) => {

  const [allSongs, setAllSongs] = useState([]);
  const [allArtists, setAllArtists] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchAllSongs().then((data) => {
        if (data !== "error") {
          setAllSongs(data)
        } else setError(true)
      })
  }, [])

  useEffect(() => {
    try {const allGenres = allSongs ? allSongs.map((song) => song.genre) : false;
      const uniqueGenres = allGenres ? allGenres.filter(
        (value, index, array) => array.indexOf(value) === index
      ) : false;
      setSongGenres(uniqueGenres)
    }catch (err) {
      console.error(err)
    }
  }, [allSongs])
  
  useEffect(() => {
    fetchAllArtists().then((data) => {
      if (data !== "error") {
        setAllArtists(data)
      } else setError(true)
    })
  }, [])
  
  //filters for songs
  const filterSongs = allSongs ? allSongs.filter((song) => valueTitle ? song.title.toLowerCase().includes(valueTitle.toLowerCase()) : true).filter((song) => valueArtist ? song.artist.toString().includes(valueArtist) : true).filter((song) => valueGenre ? song.genre.includes(valueGenre) : true) : false;

 //filter for artists
 const filterArtists = allArtists ? allArtists.filter((artist) => valueName ? artist.name.toLowerCase().includes(valueName.toLowerCase()) : true) : false;

  function renderList() {
    try{
      if (showSongs){
        return filterSongs.map((song, i) => <Song key={i} songData={song} />)
      } else {
        return filterArtists.map((artist, i) => <Artist key={i} artistData={artist} />)
      }
    }catch(err){
      return false
    }
  }

  const renderEmptyList = () => {
    return <p className="card-list__empty">Oops, this looks too empty.</p>
  }

  return (
    <>
      <section>
        <div className="browse-box">
          <p>Browse {showSongs ? "Songs" : "Artists"}</p>
          <AddBtn isLogged={isLogged} showSongs={showSongs} />
        </div>
        <div className="card-list">
          {error ? renderEmptyList() : renderList()}
        </div>
      </section>
    </>
  )
}

export default List
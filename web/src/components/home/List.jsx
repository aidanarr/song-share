import "/src/styles/List.scss"
import Song from "../home/Song.jsx"
import Artist from "../home/Artist.jsx"
import fetchAllSongs from "/src/services/fetchAllSongs.js"
import fetchAllArtists from "/src/services/fetchAllArtists.js"
import { useState, useEffect } from "react";

const List = ({ showSongs, valueTitle, valueArtist, setSongGenres, valueGenre, valueName }) => {

  const [allSongs, setAllSongs] = useState([]);
  const [allArtists, setAllArtists] = useState([]);

  useEffect(() => {
    try {
      fetchAllSongs().then((data) => setAllSongs(data))
      setSongGenres(uniqueGenres)
    } catch (err){
      console.error(err)
    }
  }, [])

  useEffect(() => {
    try {
      fetchAllArtists().then((data) => setAllArtists(data))
    } catch (err){
      console.error(err)
    }
  }, [])
  
  //filters for songs
  const filterSongs = allSongs ? allSongs.filter((song) => valueTitle ? song.title.toLowerCase().includes(valueTitle.toLowerCase()) : true).filter((song) => valueArtist ? song.artist.toString().includes(valueArtist) : true).filter((song) => valueGenre ? song.genre.includes(valueGenre) : true) : false;
  //get all genres
  const allGenres = allSongs ? allSongs.map((song) => song.genre) : false;
  const uniqueGenres = allGenres ? allGenres.filter(
    (value, index, array) => array.indexOf(value) === index
 ) : false; 
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

  return (
    <>
      <section className="list">
        {renderList()}
      </section>
    </>
  )
}

export default List
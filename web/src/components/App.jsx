import "../styles/App.scss"

import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";

//components
import Header from "./common/Header.jsx";
import Sidebar from "./common/Sidebar.jsx";
import NotFound from "./common/NotFound.jsx"
import Loader from "./common/Loader"
import Main from "./home/Main.jsx";
import SongDetail from "./detail/SongDetail.jsx";
import ArtistDetail from "./detail/ArtistDetail.jsx";
import SongForm from "./form/SongForm.jsx"
import ArtistForm from "./form/ArtistForm.jsx"
import Modal from "./common/Modal.jsx"

function App() {
  const [token, setToken] = useState("");
  const [user, setUser]= useState("")
  const [loader, setLoader] = useState(false);

  //modal window
  const [modal, setModal] = useState(false);
  const [newSongId, setNewSongId] = useState("");
  const [newArtistId, setNewArtistId] = useState("");
  const [modalId, setModalId] = useState("")
  const [showSongs, setShowSongs] = useState(true);
  
  return (
    <>
      <div className="page">
        {modal ? <Modal setModal={setModal} setShowSongs={setShowSongs} modalId={modalId} newSongId={newSongId} newArtistId={newArtistId} /> : false}
        {loader ? <Loader /> : false}
        <Header setToken={setToken} setUser={setUser} setLoader={setLoader} />
        <Sidebar />
        <Routes>
          <Route path="/" element={
          <Main showSongs={showSongs} setShowSongs={setShowSongs} />
          } />
          <Route path="/song/:id" element={
          <SongDetail/>
          }/>
          <Route path="/artist/:id" element={
          <ArtistDetail/>
          }/>
          <Route path="/song/add" element={
            <SongForm setModalId={setModalId} setNewSongId={setNewSongId} setModal={setModal} user={user} token={token} />
          } />
          <Route path="/artist/add" element={
            <ArtistForm setModalId={setModalId} setNewArtistId={setNewArtistId} setModal={setModal} user={user} token={token}/>
          } />
          <Route ath="*" element={
            <NotFound />
          } />
        </Routes>
      </div>
    </>
  )
}

export default App

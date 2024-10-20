import "../styles/App.scss"

import { Route, Routes } from "react-router-dom";
import { useState } from "react";

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
import UpdateSongForm from "./form/UpdateSongForm.jsx"
import UpdateArtistForm from "./form/UpdateArtistForm.jsx"
import Modal from "./common/Modal.jsx"
import UserProfile from "./user/UserProfile.jsx"

function App() {
  const [token, setToken] = useState("");
  const [user, setUser]= useState("")
  const [loader, setLoader] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  //modal window
  const [modal, setModal] = useState(false);
  const [newSongId, setNewSongId] = useState("");
  const [newArtistId, setNewArtistId] = useState("");
  const [modalId, setModalId] = useState("")
  const [showSongs, setShowSongs] = useState(true);
  
  return (
    <>
      <div className="page">
        {modal ? <Modal setModal={setModal} modal={modal} setShowSongs={setShowSongs} modalId={modalId} newSongId={newSongId} newArtistId={newArtistId} /> : false}
        {loader ? <Loader /> : false}
        <div className="page__main">
        <Header isLogged={isLogged} setIsLogged={setIsLogged} setToken={setToken} setUser={setUser} setLoader={setLoader} />
        <Sidebar />
        <Routes>
          <Route path="/" element={
          <Main setLoader={setLoader} isLogged={isLogged} showSongs={showSongs} setShowSongs={setShowSongs} />
          } />
          <Route path="/song/:id" element={
          <SongDetail token={token} user={user} setLoader={setLoader} />
          }/>
          <Route path="/artist/:id" element={
          <ArtistDetail token={token} user={user} setLoader={setLoader} />
          }/>
          <Route path="/song/add" element={
            <SongForm isLogged={isLogged} setModalId={setModalId} setNewSongId={setNewSongId} setModal={setModal} user={user} token={token} />
          } />
          <Route path="/artist/add" element={
            <ArtistForm isLogged={isLogged} setModalId={setModalId} setNewArtistId={setNewArtistId} setModal={setModal} user={user} token={token}/>
          } />
          <Route path="/user/:id" element={<UserProfile setLoader={setLoader} />} />
          <Route path="/song/update/:id" element={<UpdateSongForm setLoader={setLoader}
          user={user} token={token}/>} />
          <Route path="/artist/update/:id" element={<UpdateArtistForm setLoader={setLoader}
          user={user} token={token}/>} />
          <Route path="*" element={
            <NotFound />
          } />
        </Routes>
        </div>
        <div className="purple-circle"></div>
      </div>
    </>
  )
}

export default App

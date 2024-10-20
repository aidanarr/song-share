import Logo from "./Logo";

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <div className="sidebar">
        <div className="sidebar__logo">
          <Logo />
        </div>
        <p className="sidebar__credits">Created by Aida Narros <i className="fa-solid fa-music"></i> <a href="https://github.com/aidanarr/song-share" target="_blank">Repository</a></p>
      </div>
    </div>
  )
}

export default Sidebar
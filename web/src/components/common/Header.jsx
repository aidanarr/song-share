import { useState } from "react"
import Login from "../common/Login.jsx"

const Header = ({ setToken, setLoader, setUser }) => {
  const [slideIn, setSlideIn] = useState(false);
  const [slideOut, setSlideOut] = useState(false);
  const [hidden, setHidden] = useState(true);

  function handleClick(){
    if (slideIn) {
      setSlideOut(true)
      setSlideIn(false)
      setTimeout(() => {
        setHidden(true)
      }, 500)
    } else if (!slideIn){
      setHidden(false)
      setSlideIn(true)
      setSlideOut(false)
    }
  }

  return (
    <>
      <div className={`login-menu ${hidden ? "hidden" : ""}`}>
        <div className={`login-menu__box ${slideIn ? "slide-in" : ""} ${slideOut ? "slide-out" : ""}`}>
          <Login setLoader={setLoader} setToken={setToken} setUser={setUser} />
        </div>
      </div>
      <header className="header">
        <p>Song Share</p>
        <div className="profile-icon" onClick={handleClick}>
        </div>
      </header>
    </>
  )
}

export default Header
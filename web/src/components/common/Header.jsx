import "/src/styles/Header.scss"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Login from "../common/Login.jsx"

const Header = ({ setToken, setLoader, setUser, setIsLogged, isLogged }) => {
  const [slideIn, setSlideIn] = useState(false);
  const [slideOut, setSlideOut] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [userId, setUserId] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setSlideIn(false)
    setSlideOut(true)
  }, [isLogged])

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

  function handleClickProfile() {
    navigate("/user/" + userId)
  }

  function renderIcon() {
    if (isLogged) {
      return <div className="profile-icon-logged" onClick={handleClickProfile}></div>
    } else return <div className="profile-icon" onClick={handleClick}>
        </div>
  }

  return (
    <>
      <div className={`login-menu ${hidden ? "hidden" : ""}`}>
        <div className={`login-menu__box ${slideIn ? "slide-in" : ""} ${slideOut ? "slide-out" : ""}`}>
          <Login setUserId={setUserId} setIsLogged={setIsLogged} setLoader={setLoader} setToken={setToken} setUser={setUser} />
        </div>
      </div>
      <header className="header">
        <p>Song Share</p>
        {renderIcon()}
      </header>
    </>
  )
}

export default Header
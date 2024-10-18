
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Login from "../common/Login.jsx"
import Logo from "../common/Logo.jsx"
import noLoggedImg from "../../images/no-logged.png"
import loggedImg from "../../images/logged.png"

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
      return <div className="profile-icon-logged" onClick={handleClickProfile}>
        <img className="profile-icon" src={loggedImg} />
      </div>
    } else return <div className="profile-icon" onClick={handleClick}>
      <img className="profile-icon" src={noLoggedImg} />
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
        <Logo />
        {renderIcon()}
      </header>
    </>
  )
}

export default Header
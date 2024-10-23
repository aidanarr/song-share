
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Login from "../common/Login.jsx"
import LoginDesktop from "../common/LoginDesktop.jsx"
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

  function renderIconDesktop() {
    if (isLogged) {
      return <div className="profile-icon-logged-desktop" onClick={handleClickProfile}>
        <img className="profile-icon-desktop" src={loggedImg} />
      </div>
    } else return <div className="profile-icon-desktop" onClick={handleClick}>
      <img className="profile-icon-desktop" src={noLoggedImg} />
        </div>
  }


  return (
    <>
      <div className="header-wave"></div>
      <div className="header-line"></div>
      <div
        className={`login-signup-box ${hidden ? "hidden" : ""} ${
          slideIn ? "login-desktop-slidein" : ""
        } ${slideOut ? "login-desktop-slideout" : ""}`}
      >
        <LoginDesktop
          setUserId={setUserId}
          setIsLogged={setIsLogged}
          setLoader={setLoader}
          setToken={setToken}
          setUser={setUser}
        />
      </div>
      <div className={`login-menu ${hidden ? "hidden" : ""}`}>
        <div
          className={`login-menu__box ${slideIn ? "slide-in" : ""} ${
            slideOut ? "slide-out" : ""
          }`}
        >
          <Login
            setUserId={setUserId}
            setIsLogged={setIsLogged}
            setLoader={setLoader}
            setToken={setToken}
            setUser={setUser}
          />
        </div>
      </div>
      <header className="header">
        <div className="login-signup-container">{renderIconDesktop()}</div>
        <div className="logo-container">
          <Logo />
        </div>
        {renderIcon()}
      </header>
    </>
  );
}

export default Header
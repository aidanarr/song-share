import { useState, useEffect } from "react"
import fetchLogin from "/src/services/fetchLogin.js"
import fetchSignup from "/src/services/fetchSignup.js"

const LoginDesktop = ({ setUserId, setToken, setLoader, setUser, setIsLogged }) => {

  const [userData, setUserData] = useState({
    user: "",
    pass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [userSignUp, setUserSignUp] = useState(false);

  useEffect(() => {
    fetchLogin(userData).then((response) => {
      if (response.success) {
        setToken(response.token)
        setUser(userData.user)
        setLoader(true)
        setUserId(response.id)
        setErrorMsg("")
        setTimeout(() => {
          setLoader(false)
          setIsLogged(true)
          setUserData({
            user: "",
            pass: "",
          })
        }, 1000)
      } else if (!response.success) {
        console.log(response)
      }
    })
  }, [userSignUp])

  function handleInput(ev){
    const value = ev.target.value;
    const id = ev.target.id;
    setUserData({ ...userData, [id]: value })
  }

  function handleClick(ev){
    ev.preventDefault()
    const id = ev.target.id;
    try {
      if (id === "login") {
        fetchLogin(userData).then((response) => {
          if (response.success) {
            setToken(response.token)
            setUser(userData.user)
            setLoader(true)
            setUserId(response.id)
            setErrorMsg("")
            setTimeout(() => {
              setLoader(false)
              setIsLogged(true)
              setUserData({
                user: "",
                pass: "",
              })
            }, 1000)
          } else if (!response.success) {
            setErrorMsg(response.message)
          }
        })
      } else if (id === "signup"){
        fetchSignup(userData).then((response) => {
          if (response.success) {
            setUserSignUp(true);
          } else if (!response.success) {
            setErrorMsg(response.message)
          }
        })
      }
    } catch (err){
      console.error(err)
    }
  }

  return (    
      <>
        <form>
          <label htmlFor="user">Username</label>
          <input onChange={handleInput} id="user" name="user" type="text" value={userData.user} />
          <label htmlFor="pass">Password</label>
          <input onChange={handleInput} id="pass" name="pass" type="password" value={userData.pass} />
          <div className="signup-btn-box">
            <button className="button" onClick={handleClick} id="signup">Signup</button>
            <button className="button" onClick={handleClick} id="login">Login</button>
          </div>
        </form>
        <p className="error-msg">{errorMsg ? errorMsg : false}</p>
      </>
  );
}

export default LoginDesktop
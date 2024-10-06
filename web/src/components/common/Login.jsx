import { useState } from "react"
import fetchLogin from "/src/services/fetchLogin.js"
import fetchSignup from "/src/services/fetchSignup.js"

const Login = ({ setToken, setLoader, setUser }) => {

  const [userData, setUserData] = useState({
    user: "",
    pass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");

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
            setTimeout(() => {
              setLoader(false)
            }, 1000)
          } else if (!response.success) {
            setErrorMsg(response.message)
          }
        })
      } else if (id === "signup"){
        fetchSignup(userData).then((response) => {
          if (response.success) {
            setErrorMsg(response.message)
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
      
      <div>
        <form>
          <label htmlFor="user">Username</label>
          <input onInput={handleInput} id="user" name="user" type="text" />
          <label htmlFor="pass">Password</label>
          <input onInput={handleInput} id="pass" name="pass" type="password" />
          <div>
            <button onClick={handleClick} id="signup">Signup</button>
            <button onClick={handleClick} id="login">Login</button>
          </div>
        </form>
        <p>{errorMsg ? errorMsg : false}</p>
      </div>
    </>
  );
}

export default Login
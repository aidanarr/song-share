import "/src/styles/AddBtn.scss"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";

const AddBtn = ({showSongs, isLogged}) => {

  const navigate = useNavigate();
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    setHidden(true)
  }, [isLogged, showSongs])

  const handleClick = () => {
    if (isLogged) {
      setHidden(true);
      navigate(showSongs ? "/song/add" : "/artist/add")
    } else {
      setHidden(false);
    }
  }

  return (
    <div className="add-btn"> 
      <div className={`login-reminder ${hidden ? "hidden" : ""}`}>
        <p>You must login first</p>
      </div>
      <div onClick={handleClick} className="add">
          +
      </div>
    </div>
  )
}

export default AddBtn
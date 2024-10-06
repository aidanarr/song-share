import "/src/styles/AddBtn.scss"
import { Link } from "react-router-dom"

const AddBtn = ({showSongs}) => {

  return (
    <> 
      <Link to={`/${showSongs ? "song" : "artist"}/add`}>
        <div className="add">
          Add +
        </div>
      </Link>
    </>
  )
}

export default AddBtn
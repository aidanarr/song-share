import { Link } from "react-router-dom"

const Logo = () => {
  return (
    <>
    <Link to="/">
      <div className="logo">
          <p className="logo__song">Song</p>
          <p>Share</p>
          <i className="fa-solid fa-music logo__music"></i>
      </div>
    </Link>
    </>
  )
}

export default Logo
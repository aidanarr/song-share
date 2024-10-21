import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className="not-found">
      <h2>Page not found</h2>
      <div className="back-link">
        <Link to="/">Back</Link>
      </div>
    </div>
  )
}

export default NotFound
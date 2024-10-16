import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react";
import fetchUserDetails from "/src/services/fetchUserDetails.js"

const UserProfile = ({setLoader}) => {

  const {id} = useParams();

  const [userData, setUserData] = useState({});

  useEffect(() => {
    try {
      setLoader(true)
      fetchUserDetails(id).then((data) => setUserData(data))
      setTimeout(() => {
        setLoader(false)
      }, 500)
    }catch (err){
      console.error(err)
    }
  }, [])

  const renderSongs = () => {
    return userData.my_songs.map((song, i) => {
      return <div className="user-songs__card" key={i}>
        <h3 className="user-songs__card--title">{song.title}</h3>
        <Link to={"/song/" + song._id}>
          <div className="user-songs__card--details">See song</div>
        </Link>
      </div>
    })
  }

  return (
    <div className="userprofile-container">
      {userData.username ? 
      <>
      <h2 className="username">{userData.username}</h2>
      <p>Songs added: {userData.my_songs.length}</p>
      <section className="user-songs">
        
          {renderSongs()}
        
      </section>
      </> : false}
      
    </div>
  )
}

export default UserProfile
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
      return <div key={i}>
        <h3>{song.title}</h3>
        <img src={song.img} />
        <Link to={"/song/" + song._id}>
          <div>See details</div>
        </Link>
      </div>
    })
  }

  return (
    <div>
      {userData.username ? 
      <>
      <h2>{userData.username}</h2>
      <p>Songs added: {userData.my_songs.length}</p>
      <section>
        <div>
          {renderSongs()}
        </div>
      </section>
      </> : false}
      
    </div>
  )
}

export default UserProfile
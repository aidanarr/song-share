
const fetchAllArtists = () => {
    return fetch("http://localhost:5000/artists" )
    .then((response) => response.json())
    .then((responseData) => { 
      if (responseData.success) {
        const allSongs = responseData.data.map((artist) => {
          return {
            id: artist._id,
            name: artist.name,
            img: artist.img
          }
        })
        return allSongs
      } else {
        return responseData.error
      }
    }   
     ).catch(err => {console.error('Request failed', err)
  })
};

export default fetchAllArtists
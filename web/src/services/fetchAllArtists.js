
const fetchAllArtists = () => {
    return fetch("https://song-share-server.vercel.app/artists" )
    .then((response) => response.json())
    .then((responseData) => { 
      if (responseData.success) {
        const allSongs = responseData.data.map((artist) => {
          return {
            id: artist._id,
            name: artist.name,
            img: artist.img,
            bio: artist.bio
          }
        })
        return allSongs
      } else {
        return responseData.error
      }
    }   
     ).catch((err) => {
      console.error('Request failed', err)
      const data = "error";
      return data;
  })
};

export default fetchAllArtists
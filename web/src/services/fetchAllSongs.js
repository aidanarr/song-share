
const fetchAllSongs = () => {
    return fetch("http://localhost:5000/songs" )
    .then((response) => response.json())
    .then((responseData) => { 
      if (responseData.success) {
        const allSongs = responseData.data.map((song) => {
          return {
            id: song._id,
            title: song.title,
            artist: song.artist.map((artist) => artist.name),
            img: song.img,
            url: song.url,
            genre: song.genre
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

export default fetchAllSongs
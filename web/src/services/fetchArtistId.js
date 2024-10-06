
const fetchArtistId = (id) => {
    return fetch("http://localhost:5000/artists/" + id)
    .then((response) => response.json())
    .then((response) => { 
      if (response.success) {
        const artist = response.artist_data;
        const songs = response.artist_songs;
        const artistData =  {
            id: artist._id,
            name: artist.name,
            bio: artist.bio,
            img: artist.img,
            songs: songs,
            user: artist.user
          }
          return artistData
          
        }else {
        return response.message
      } 
     }).catch(err => {console.error('Request failed', err)
  })
};

export default fetchArtistId
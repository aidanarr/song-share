
const fetchSongId = (id) => {
    return fetch("https://song-share-server-axsfgsfpd-aidanars-projects.vercel.app/songs/" + id)
    .then((response) => response.json())
    .then((response) => { 
      if (response.success) {
        const song = response.data;
        const songData =  {
            id: song._id,
            title: song.title,
            artist: song.artist,
            album: song.album,
            year: song.year,
            img: song.img,
            url: song.url,
            genre: song.genre,
            user: song.user
          }
          return songData
          
        }else {
        return response.message
      } 
     }).catch(err => {console.error('Request failed', err)
  })
};

export default fetchSongId
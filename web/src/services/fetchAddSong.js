
const fetchAddSong = (songData, token) => {
    return fetch(`https://song-share-server-axsfgsfpd-aidanars-projects.vercel.app/songs/add`, {
        method: "POST",
        body: JSON.stringify(songData),
        headers: {
          'content-type': 'application/json',
          authorization: token
        }
      })
      .then((response) => response.json())
      .then((response) => {
        return response
      })
}

export default fetchAddSong
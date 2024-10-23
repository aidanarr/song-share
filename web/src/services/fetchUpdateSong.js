
const fetchUpdateSong = (songData, token, id) => {
    return fetch("https://song-share-server-axsfgsfpd-aidanars-projects.vercel.app/songs/update/" + id, {
        method: "PUT",
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

export default fetchUpdateSong
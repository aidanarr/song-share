
const fetchUpdateSong = (songData, token, id) => {
    return fetch("http://localhost:5000/songs/update/" + id, {
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
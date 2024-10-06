
const fetchAddSong = (songData, token) => {
    return fetch(`http://localhost:5000/songs/add`, {
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
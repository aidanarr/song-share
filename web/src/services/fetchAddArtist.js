
const fetchAddArtist = (artistData, token) => {
    return fetch(`http://localhost:5000/artists/add`, {
        method: "POST",
        body: JSON.stringify(artistData),
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

export default fetchAddArtist
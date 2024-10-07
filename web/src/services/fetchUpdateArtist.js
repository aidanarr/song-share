
const fetchUpdateArtist = (artistData, token, id) => {
    return fetch("http://localhost:5000/artists/update/" + id, {
        method: "PUT",
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

export default fetchUpdateArtist

const fetchDeleteArtist = (user, id, token) => {
    return fetch("http://localhost:5000/artists/delete/" + id, {
      method: "DELETE",
      body: JSON.stringify({
        user: user
      }),
      headers: {
        'content-type': 'application/json',
        authorization: token
      }
    })
    .then((response) => response.json())
    .then((response) => { 
      return response
     }).catch(err => {console.error('Request failed', err)
  })
};

export default fetchDeleteArtist
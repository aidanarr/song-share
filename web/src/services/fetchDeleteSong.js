
const fetchDeleteSong = (user, id, token) => {
    return fetch("https://song-share-server.vercel.app/songs/delete/" + id, {
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

export default fetchDeleteSong
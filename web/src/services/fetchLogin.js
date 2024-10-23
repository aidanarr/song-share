
const fetchLogin = (userData) => {
    return fetch("https://song-share-server.vercel.app/login", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        'content-type': 'application/json'
      }})
    .then((response) => response.json())
    .then((response) => {  
        return response
      })
    .catch(err => {console.error('Request failed', err)
    return err
  })
};

export default fetchLogin
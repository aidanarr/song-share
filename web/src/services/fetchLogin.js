
const fetchLogin = (userData) => {
    return fetch("http://localhost:5000/login", {
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

const fetchUserDetails = (id) => {
    return fetch("http://localhost:5000/user/" + id)
    .then((response) => response.json())
    .then((response) => { 
      if (response.success) {
            return response.data
        }else {
            return response.message
      } 
     }).catch(err => {console.error('Request failed', err)
  })
};

export default fetchUserDetails
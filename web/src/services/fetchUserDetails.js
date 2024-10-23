
const fetchUserDetails = (id) => {
    return fetch("https://song-share-server-axsfgsfpd-aidanars-projects.vercel.app/user/" + id)
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
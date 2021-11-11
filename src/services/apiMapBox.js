import axios from 'axios';

const ACCESS_TOKEN_MAP_BOX = `access_token=${process.env.REACT_APP_ACCESS_TOKEN_MAP_BOX}`

// axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${local}.json?${ACCESS_TOKEN_MAP_BOX}`)
// .then(response => {
//  const { lat, lng } = response.data.features[0].center;
// })



export const fetchLocalMapBox = (local) => 
axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${local}.json?${ACCESS_TOKEN_MAP_BOX}`)
.then(response => {
//  const { lat, lng } = response.data.features[0].center;
return response.data
})

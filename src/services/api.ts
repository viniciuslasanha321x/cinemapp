import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://www.omdbapi.com/?apikey=925eba28&s=',
});

// export default api.defaults.params = {
//   apiKey: process.env.REACT_APP_API_KEY,
// };

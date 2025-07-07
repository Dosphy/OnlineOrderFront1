import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/adminControl';

export const adminLogin = (username, password) => {
  return axios.get(`${API_BASE_URL}/adminLogin`, { 
    params: {  
      username,
      password
    }
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
};


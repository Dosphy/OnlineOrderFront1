import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/userControl';

export const userLogin = (username, password) => {
  return axios.get(`${API_BASE_URL}/userLogin`, { 
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

export const userRegister = (username, password) => {
  return axios.get(`${API_BASE_URL}/userRegister`, {
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

import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/userControl';

//用户登录
export const userLogin = async (username, password) => { //成功返回100
  const response = await axios.get(`${API_BASE_URL}/userLogin`, { 
    params: {  
      username,
      password
    }
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  console.log(response.data)
  return response.data;
};

//用户注册
export const userRegister = async (username, password, email, phone) => { //成功返回200
  const response = await axios.post(`${API_BASE_URL}/userRegister`, {
    params: {  
      username,
      password,
      email,
      phone
    }
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  console.log(response.data)
  return response.data;
};

//获取当前用户信息
export const userInfo = async (username) => {
  const response = await axios.post(`${API_BASE_URL}/userInfo`, { //成功返回900
    params: {  
      username,
    }
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  console.log(response.data)
  return response.data;
};

//更新用户信息
export const updateUserInfo = async (username, password, email, phone) => { //成功返回300
  const response = await axios.post(`${API_BASE_URL}/updateUserInfo`, {
    params: {  
      username,
      password,
      email,
      phone
    }
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  console.log(response.data)
  return response.data;
};
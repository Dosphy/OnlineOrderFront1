import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/adminControl';

//用户登录
export const getStock = async () => { //成功返回1600
  const response = await axios.get(`${API_BASE_URL}/getStock`, {}, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  console.log(response)
  return response.data;
};
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/adminControl';

//获取库存
export const getStock = async () => { //成功返回1600
  const response = await axios.get(`${API_BASE_URL}/getStock`, {}, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  console.log(response)
  return response.data;
};

//库存补货
export const addStock = async (material, number) => { //成功返回1400
  const response = await axios.post(`${API_BASE_URL}/addStock?materialName=${material}&number=${number}`, {}, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  console.log(response)
  return response.data;
};
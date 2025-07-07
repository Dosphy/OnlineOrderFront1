import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/goodsControl';
//获取商品信息
export const getGoodsInfo = async () => { //成功返回400
  const response = await axios.get(`${API_BASE_URL}/getGoodsInfo`,{},
  {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  console.log(response.data)
  return response.data;
};
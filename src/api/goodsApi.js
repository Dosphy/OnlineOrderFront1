import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/goodsControl';
//获取商品信息
export const getGoodsInfo = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getGoodsInfo`);
    return response.data;
  } catch (error) {
    console.error('获取商品信息失败:', error);
    throw error;
  }
};
//更新商品信息
export const updateGoodsInfo = async (goods) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/updateGoodsInfo`, goods);
    return response.data;
  } catch (error) {
    console.error('更新商品信息失败:', error);
    throw error;
  }
};
//删除商品信息
export const deleteGoods = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/deleteGoods`, {
      params: { id }
    });
    return response.data;
  } catch (error) {
    console.error('删除商品失败:', error);
    throw error;
  }
};    
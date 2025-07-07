import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/adminControl';

//管理员登录
export const adminLogin = async (username, password) => { //成功返回500
  const response = await axios.get(`${API_BASE_URL}/adminLogin`, {
    params: {  
      username,
      password
    }
  },
  {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  console.log(response.data)
  return response.data
};

//获取所有用户信息
export const getAllUserInfo = async () => { //成功返回600
  const response = await axios.get(`${API_BASE_URL}/getAllUserInfo`, {}, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  console.log(response.data)
  return response.data
};

//更新商品信息
export const updateGoodsInfo = async (dish_id, dish_name, dish_scale, path, price, mon_sale, describe) => { //成功返回700
  const response = await axios.post(`${API_BASE_URL}/updateGoodsInfo`, { 
    params: {  
      dish_id,
      dish_name,
      dish_scale,
      path,
      price,
      mon_sale,
      describe
    }
  },
   {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  console.log(response.data)
  return response.data
};

//删除商品信息
export const deleteGoods = async (dish_id) => { //成功返回800
  const response = await axios.get(`${API_BASE_URL}/deleteGoods`, { 
    params: {  
      dish_id
    }
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  console.log(response.data)
  return response.data
};


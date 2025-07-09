import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/adminControl';
const API_USER_URL = 'http://localhost:8080/userControl';
const API_GOODS_URL = 'http://localhost:8080/goodsControl';

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
export const getAllUserInfo = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getAllUserInfo`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(response.data);
    if (response.data.code === 600) {
      return response.data.data; // 返回用户信息列表
    } else {
      throw new Error(response.data.message); // 抛出错误消息
    }
  } catch (error) {
    console.error('获取用户信息失败:', error);
    throw error; // 将错误抛出，让调用者处理
  }
};

//更新商品信息
export const updateGoodsInfo = async (goods) => { // 成功返回700
  try {
    const response = await axios.post(`${API_BASE_URL}/updateGoodsInfo`, goods, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('更新商品信息失败:', error);
    return { code: -1, message: '请求失败' };
  }
};

//删除商品信息
export const deleteGoods = async (dish_id) => { //成功返回800
  const response = await axios.delete(`${API_BASE_URL}/deleteGoods`, {
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

//添加商品信息
export const addDishes = async (goods) => { // 成功返回1200
  try {
    const response = await axios.post(`${API_GOODS_URL}/addDishes`, goods, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('更新商品信息失败:', error);
    return { code: -1, message: '请求失败' };
  }
};

//更新用户信息
export const updateUserInfo = async (username, password, email, phone) => { //成功返回300
  const response = await axios.post(`${API_USER_URL}/updateUserInfo`, {
    username,
    password,
    email,
    phone
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  console.log(response.data)
  return response.data;
};

//删除用户信息
export const deleteUser = async (username) => { //成功返回1100
  const response = await axios.delete(`${API_BASE_URL}/deleteUser`, {
    params: {
      username
    }
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  console.log(response.data)
  return response.data;
};

//处理用户订单
export const dealUserOrder = async (orderId) => { //成功返回1800
  const response = await axios.post(`${API_BASE_URL}/dealUserOrder`, {
    orderId
  }, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
  console.log(response.data)
  return response.data;
};


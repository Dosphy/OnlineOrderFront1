// orderApi.js
export default {
  fetchOrders: async () => {
    try {
      const response = await fetch('http://localhost:8080/adminControl/getUserOrders'); // 后端接口地址
      return await response.json();
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  },
  completeOrder: async (orderId) => {
    try {
      const response = await fetch('http://localhost:8080/adminControl/dealUserOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `order_id=${orderId}`,
      });
      return await response.json();
    } catch (error) {
      console.error('Error completing order:', error);
    }
  },
  refreshOrders: async () => {
    return await this.fetchOrders();
  }
};
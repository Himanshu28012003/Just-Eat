import api from "./api";

// =========================================================
// PLACE ORDER
// =========================================================

export const placeOrder = async (orderData) => {
    const response = await api.post(
        "/customer/orders",
        orderData
    );

    return response.data;
};


// =========================================================
// GET MY ORDERS
// =========================================================

export const getMyOrders = async () => {
    const response = await api.get(
        "/customer/orders"
    );

    return response.data;
};


// =========================================================
// GET SINGLE ORDER
// =========================================================

export const getMyOrder = async (orderId) => {
    const response = await api.get(
        `/customer/orders/${orderId}`
    );

    return response.data;
};


// =========================================================
// CANCEL ORDER
// =========================================================

export const cancelOrder = async (orderId) => {
    const response = await api.patch(
        `/customer/orders/${orderId}/cancel`
    );

    return response.data;
};
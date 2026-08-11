import api from "./api";

// =========================================================
// GET ORDERS OF OWNER'S RESTAURANT
// =========================================================

export const getRestaurantOrders = async (
    restaurantId
) => {
    const response = await api.get(
        `/owner/restaurants/${restaurantId}/orders`
    );

    return response.data;
};


// =========================================================
// UPDATE ORDER STATUS
// =========================================================

export const updateOrderStatus = async (
    orderId,
    status
) => {
    const response = await api.patch(
        `/owner/orders/${orderId}/status`,
        {
            status,
        }
    );

    return response.data;
};
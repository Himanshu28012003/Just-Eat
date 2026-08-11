import api from "./api";

// =========================================================
// GET OWNER RESTAURANTS
// =========================================================

export const getMyRestaurants = async () => {
    const response = await api.get(
        "/owner/restaurants/me"
    );

    return response.data;
};


// =========================================================
// CREATE RESTAURANT
// =========================================================

export const createRestaurant = async (
    restaurantData
) => {
    const response = await api.post(
        "/owner/restaurants",
        restaurantData
    );

    return response.data;
};


// =========================================================
// UPDATE RESTAURANT
// =========================================================

export const updateRestaurant = async (
    restaurantId,
    restaurantData
) => {
    const response = await api.put(
        `/owner/restaurants/${restaurantId}`,
        restaurantData
    );

    return response.data;
};


// =========================================================
// DELETE RESTAURANT
// =========================================================

export const deleteRestaurant = async (
    restaurantId
) => {
    const response = await api.delete(
        `/owner/restaurants/${restaurantId}`
    );

    return response.data;
};
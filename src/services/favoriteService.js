import api from "./api";

// Get current customer's favorite restaurants
export const getFavorites = async () => {
    const response = await api.get("/customer/favorites");
    return response.data;
};

// Add restaurant to favorites
export const addFavorite = async (restaurantId) => {
    const response = await api.post(
        `/customer/favorites/${restaurantId}`
    );

    return response.data;
};

// Remove restaurant from favorites
export const removeFavorite = async (restaurantId) => {
    const response = await api.delete(
        `/customer/favorites/${restaurantId}`
    );

    return response.data;
};

// Check whether restaurant is already favorite
export const checkFavorite = async (restaurantId) => {
    const response = await api.get(
        `/customer/favorites/${restaurantId}`
    );

    return response.data;
};
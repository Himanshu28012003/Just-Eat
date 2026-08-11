import api from "./api";

export const getRestaurantMenu = async (restaurantId) => {
    const response = await api.get(
        `/owner/restaurants/${restaurantId}/menu`
    );
    return response.data;
};

export const createMenuItem = async (restaurantId, menuItemData) => {
    const response = await api.post(
        `/owner/restaurants/${restaurantId}/menu`,
        menuItemData
    );
    return response.data;
};

export const updateMenuItem = async (menuItemId, menuItemData) => {
    const response = await api.put(
        `/owner/menu/${menuItemId}`,
        menuItemData
    );
    return response.data;
};

export const deleteMenuItem = async (menuItemId) => {
    const response = await api.delete(
        `/owner/menu/${menuItemId}`
    );
    return response.data;
};

export const updateMenuItemAvailability = async (menuItemId, available) => {
    const response = await api.patch(
        `/owner/menu/${menuItemId}/availability`,
        { available }
    );
    return response.data;
};

export const updateTodaySpecial = async (menuItemId, isTodaySpecial) => {
    const response = await api.patch(
        `/owner/menu/${menuItemId}/today-special`,
        { todaySpecial: isTodaySpecial }
    );
    return response.data;
};

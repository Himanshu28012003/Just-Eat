import api from "./api";

// =========================================================
// GET RESTAURANT MENU
// =========================================================

export const getRestaurantMenu = async (restaurantId) => {
    const response = await api.get(
        `/owner/restaurants/${restaurantId}/menu`
    );

    return response.data;
};


// =========================================================
// CREATE MENU ITEM
// =========================================================

export const createMenuItem = async (
    restaurantId,
    menuItemData
) => {
    const response = await api.post(
        `/owner/restaurants/${restaurantId}/menu`,
        menuItemData
    );

    return response.data;
};


// =========================================================
// UPDATE MENU ITEM
// =========================================================

export const updateMenuItem = async (
    restaurantId,
    menuItemId,
    menuItemData
) => {
    const response = await api.put(
        `/owner/restaurants/${restaurantId}/menu/${menuItemId}`,
        menuItemData
    );

    return response.data;
};


// =========================================================
// DELETE MENU ITEM
// =========================================================

export const deleteMenuItem = async (
    restaurantId,
    menuItemId
) => {
    const response = await api.delete(
        `/owner/restaurants/${restaurantId}/menu/${menuItemId}`
    );

    return response.data;
};


// =========================================================
// UPDATE AVAILABILITY
// =========================================================

export const updateMenuItemAvailability = async (
    restaurantId,
    menuItemId,
    available
) => {
    const response = await api.patch(
        `/owner/restaurants/${restaurantId}/menu/${menuItemId}/availability`,
        {
            available,
        }
    );

    return response.data;
};


// =========================================================
// UPDATE TODAY'S SPECIAL
// =========================================================

export const updateTodaySpecial = async (
    restaurantId,
    menuItemId,
    todaySpecial
) => {
    const response = await api.patch(
        `/owner/restaurants/${restaurantId}/menu/${menuItemId}/today-special`,
        {
            todaySpecial,
        }
    );

    return response.data;
};


// =========================================================
// UPDATE DEAL OF THE DAY
// =========================================================

export const updateDealOfTheDay = async (
    restaurantId,
    menuItemId,
    dealOfTheDay
) => {
    const response = await api.patch(
        `/owner/restaurants/${restaurantId}/menu/${menuItemId}/deal-of-the-day`,
        {
            dealOfTheDay,
        }
    );

    return response.data;
};
import api from "./api";

export const getTodaySpecial = async (restaurantId) => {
    const response = await api.get(
        `/restaurants/${restaurantId}/menu/specials`
    );
    const data = response.data;
    const items = Array.isArray(data) ? data : (data?.content || []);
    return items;
};


export const getMostlyOrdered = async (restaurantId) => {
    const response = await api.get(
        `/${restaurantId}/mostly-ordered`
    );
    const data = response.data;
    const items = Array.isArray(data) ? data : (data?.content || []);
    return items;
};
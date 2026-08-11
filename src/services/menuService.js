import api from "./api";

export const getRestaurantMenu = async (restaurantId) => {
  const response = await api.get(
    `/restaurants/${restaurantId}/menu`
  );

  return response.data;
};

export const getAvailableMenuItems = async (restaurantId) => {
  const response = await api.get(
    `/restaurants/${restaurantId}/menu`
  );

  return response.data;
};

export const getTodaySpecial = async (restaurantId) => {
  const response = await api.get(
    `/restaurants/${restaurantId}/menu/specials`
  );

  return response.data;
};

export const getDealOfTheDay = async () => {
  const response = await api.get("/deals");

  return response.data;
};

export const getMostlyOrdered = async (restaurantId) => {
  const response = await api.get(
    `/${restaurantId}/mostly-ordered`
  );

  return response.data;
};
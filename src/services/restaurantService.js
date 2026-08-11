import api from "./api";

export const getRestaurants = async () => {
  const response = await api.get("/restaurants");
  return response.data;
};

export const getRestaurantById = async (restaurantId) => {
  const response = await api.get(
    `/restaurants/${restaurantId}`
  );

  return response.data;
};

export const searchRestaurantsByName = async (name) => {
  const response = await api.get(
    `/restaurants/search/name?name=${encodeURIComponent(name)}`
  );
  return response.data;
};

export const searchRestaurantsByCity = async (city) => {
  const response = await api.get(
    `/restaurants/search/city?city=${encodeURIComponent(city)}`
  );
  return response.data;
};

export const searchRestaurantsByCuisine = async (cuisine) => {
  const response = await api.get(
    `/restaurants/search/cuisine?cuisine=${encodeURIComponent(cuisine)}`
  );
  return response.data;
};
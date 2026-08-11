import api from "./api";

export const getCart = async () => {
  const response = await api.get("/customer/cart");
  return response.data;
};

export const addToCart = async (menuItemId, quantity = 1) => {
  const response = await api.post("/customer/cart/items", {
    menuItemId,
    quantity,
  });

  return response.data;
};

// Update cart item quantity
export const updateCartItem = async (
  cartItemId,
  quantity
) => {
  const response = await api.put(
    `/customer/cart/items/${cartItemId}`,
    {
      quantity,
    }
  );

  return response.data;
};

export const removeCartItem = async (cartItemId) => {
  const response = await api.delete(
    `/customer/cart/items/${cartItemId}`
  );

  return response.data;
};

export const clearCart = async () => {
  const response = await api.delete("/customer/cart");

  return response.data;
};
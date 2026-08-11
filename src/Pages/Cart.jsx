import { useEffect, useState } from "react";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

import {
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "../services/cartService";

import Loading from "../components/Loading";

const Cart = () => {

  const [cart, setCart] = useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [updatingId, setUpdatingId] =
    useState(null);

  // =========================================================
  // LOAD CART
  // =========================================================

  const loadCart = async () => {

    try {

      setLoading(true);
      setError("");

      const data = await getCart();

      setCart(data);

    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Unable to load cart."
      );

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  // =========================================================
  // UPDATE QUANTITY
  // =========================================================

  const handleQuantityChange = async (
    item,
    newQuantity
  ) => {

    if (newQuantity < 1) {
      return;
    }

    try {

      setUpdatingId(item.id);

      const updatedCart =
        await updateCartItem(
          item.id,
          newQuantity
        );

      setCart(updatedCart);

    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Unable to update quantity."
      );

    } finally {

      setUpdatingId(null);
    }
  };

  // =========================================================
  // REMOVE
  // =========================================================

  const handleRemove = async (itemId) => {

    try {

      setUpdatingId(itemId);

      const updatedCart =
        await removeCartItem(itemId);

      setCart(updatedCart);

    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Unable to remove item."
      );

    } finally {

      setUpdatingId(null);
    }
  };

  // =========================================================
  // CLEAR
  // =========================================================

  const handleClearCart = async () => {

    try {

      await clearCart();

      await loadCart();

    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Unable to clear cart."
      );
    }
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return <Loading />;
  }

  // =========================================================
  // ERROR
  // =========================================================

  if (error && !cart) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-12">

        <div className="mx-auto max-w-xl rounded-2xl border bg-white p-10 text-center">

          <h2 className="text-xl font-bold">
            Unable to load cart
          </h2>

          <p className="mt-2 text-gray-500">
            {error}
          </p>

          <button
            onClick={loadCart}
            className="mt-6 rounded-lg bg-orange-500 px-5 py-3 font-semibold text-white"
          >
            Try Again
          </button>

        </div>

      </main>
    );
  }

  const items = cart?.items || [];

  const subtotal =
    cart?.subtotal ??
    items.reduce(
      (total, item) =>
        total +
        Number(item.price) *
          Number(item.quantity),
      0
    );

  const deliveryFee =
    cart?.deliveryFee ?? 0;

  const total =
    cart?.totalAmount ??
    subtotal + Number(deliveryFee);

  // =========================================================
  // EMPTY CART
  // =========================================================

  if (items.length === 0) {

    return (
      <main className="min-h-screen bg-gray-50 px-4 py-12">

        <div className="mx-auto max-w-xl rounded-2xl border bg-white p-12 text-center">

          <ShoppingBag
            size={50}
            className="mx-auto text-gray-300"
          />

          <h1 className="mt-5 text-2xl font-bold">
            Your cart is empty
          </h1>

          <p className="mt-2 text-gray-500">
            Add some delicious food to get started.
          </p>

          <Link
            to="/restaurants"
            className="mt-7 inline-flex items-center gap-2 rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600"
          >
            Explore Restaurants
            <ArrowRight size={18} />
          </Link>

        </div>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">

      <div className="mx-auto max-w-6xl px-4 py-10">

        <div className="mb-8 flex items-center justify-between">

          <div>
            <h1 className="text-3xl font-bold">
              Your Cart
            </h1>

            <p className="mt-1 text-gray-500">
              {items.length} item
              {items.length !== 1
                ? "s"
                : ""}
            </p>
          </div>

          <button
            onClick={handleClearCart}
            className="text-sm font-medium text-red-500 hover:text-red-600"
          >
            Clear Cart
          </button>

        </div>

        {error && (
          <div className="mb-5 rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-3">

          {/* ITEMS */}

          <div className="space-y-4 lg:col-span-2">

            {items.map((item) => {

              const itemTotal =
                Number(item.price) *
                Number(item.quantity);

              const updating =
                updatingId === item.id;

              return (
                <div
                  key={item.id}
                  className="flex gap-4 rounded-xl border bg-white p-4"
                >

                  {/* Image */}

                  <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-gray-100">

                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.itemName}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs text-gray-400">
                        No Image
                      </div>
                    )}

                  </div>

                  {/* Details */}

                  <div className="min-w-0 flex-1">

                    <div className="flex justify-between gap-3">

                      <div>
                        <h2 className="font-semibold">
                          {item.itemName ||
                            item.name}
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                          ₹
                          {Number(
                            item.price
                          ).toFixed(2)}
                        </p>
                      </div>

                      <button
                        onClick={() =>
                          handleRemove(
                            item.id
                          )
                        }
                        disabled={updating}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <Trash2 size={19} />
                      </button>

                    </div>

                    <div className="mt-4 flex items-center justify-between">

                      {/* Quantity */}

                      <div className="flex items-center rounded-lg border">

                        <button
                          disabled={
                            updating ||
                            item.quantity <= 1
                          }
                          onClick={() =>
                            handleQuantityChange(
                              item,
                              item.quantity - 1
                            )
                          }
                          className="p-2 hover:bg-gray-50 disabled:opacity-40"
                        >
                          <Minus size={16} />
                        </button>

                        <span className="min-w-10 text-center text-sm font-semibold">
                          {item.quantity}
                        </span>

                        <button
                          disabled={updating}
                          onClick={() =>
                            handleQuantityChange(
                              item,
                              item.quantity + 1
                            )
                          }
                          className="p-2 hover:bg-gray-50"
                        >
                          <Plus size={16} />
                        </button>

                      </div>

                      <span className="font-bold">
                        ₹
                        {itemTotal.toFixed(2)}
                      </span>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>

          {/* SUMMARY */}

          <div className="h-fit rounded-xl border bg-white p-6">

            <h2 className="text-xl font-bold">
              Order Summary
            </h2>

            <div className="mt-6 space-y-4 text-sm">

              <div className="flex justify-between">
                <span className="text-gray-500">
                  Subtotal
                </span>

                <span>
                  ₹{Number(subtotal).toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">
                  Delivery Fee
                </span>

                <span>
                  ₹
                  {Number(
                    deliveryFee
                  ).toFixed(2)}
                </span>
              </div>

              <div className="border-t pt-4">

                <div className="flex justify-between text-lg font-bold">

                  <span>Total</span>

                  <span>
                    ₹
                    {Number(total).toFixed(2)}
                  </span>

                </div>

              </div>

            </div>

            <Link
              to="/checkout"
              className="mt-7 flex items-center justify-center gap-2 rounded-lg bg-orange-500 py-3 font-semibold text-white hover:bg-orange-600"
            >
              Proceed to Checkout
              <ArrowRight size={18} />
            </Link>

          </div>

        </div>

      </div>

    </main>
  );
};

export default Cart;
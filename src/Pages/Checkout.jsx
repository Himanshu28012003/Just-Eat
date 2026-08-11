import { useEffect, useState } from "react";
import {
    MapPin,
    ArrowLeft,
    ShoppingBag,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import {
    getCart,
} from "../services/cartService";

import {
    placeOrder,
} from "../services/orderService";

import Loading from "../components/Loading";

const Checkout = () => {

    const navigate = useNavigate();

    const [cart, setCart] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [placingOrder, setPlacingOrder] =
        useState(false);

    const [error, setError] =
        useState("");

    const [form, setForm] = useState({
        deliveryAddress: "",
    });


    // =========================================================
    // LOAD CART
    // =========================================================

    useEffect(() => {

        const loadCart = async () => {

            try {

                setLoading(true);

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

        loadCart();

    }, []);


    // =========================================================
    // FORM CHANGE
    // =========================================================

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

    };


    // =========================================================
    // PLACE ORDER
    // =========================================================

    const handlePlaceOrder = async (e) => {

        e.preventDefault();

        if (!form.deliveryAddress.trim()) {

            setError(
                "Delivery address is required."
            );

            return;
        }

        try {

            setPlacingOrder(true);
            setError("");

            const order =
                await placeOrder({
                    deliveryAddress:
                        form.deliveryAddress,
                });

            /*
             * Go to order confirmation page.
             *
             * The backend response should contain
             * orderId.
             */

            navigate(
                `/orders/${order.orderId}`,
                {
                    state: {
                        order,
                    },
                }
            );

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Unable to place order."
            );

        } finally {

            setPlacingOrder(false);
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
                        Unable to load checkout
                    </h2>

                    <p className="mt-2 text-gray-500">
                        {error}
                    </p>

                    <Link
                        to="/cart"
                        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-orange-500 px-5 py-3 font-semibold text-white"
                    >
                        <ArrowLeft size={18} />
                        Back to Cart
                    </Link>

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
                        Add items before checking out.
                    </p>

                    <Link
                        to="/restaurants"
                        className="mt-7 inline-block rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white"
                    >
                        Explore Restaurants
                    </Link>

                </div>

            </main>
        );
    }


    return (

        <main className="min-h-screen bg-gray-50">

            <div className="mx-auto max-w-6xl px-4 py-10">

                {/* Back */}

                <Link
                    to="/cart"
                    className="mb-7 inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-orange-500"
                >
                    <ArrowLeft size={17} />
                    Back to Cart
                </Link>


                <h1 className="text-3xl font-bold">
                    Checkout
                </h1>


                <div className="mt-8 grid gap-8 lg:grid-cols-3">


                    {/* =================================================
                        DELIVERY DETAILS
                    ================================================= */}

                    <div className="lg:col-span-2">

                        <form
                            onSubmit={
                                handlePlaceOrder
                            }
                            className="rounded-2xl border bg-white p-6"
                        >

                            <div className="flex items-center gap-3">

                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-orange-500">
                                    <MapPin size={20} />
                                </div>

                                <div>
                                    <h2 className="font-bold">
                                        Delivery Details
                                    </h2>

                                    <p className="text-sm text-gray-500">
                                        Where should we deliver your order?
                                    </p>
                                </div>

                            </div>


                            {error && (

                                <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                                    {error}
                                </div>

                            )}


                            <div className="mt-7">

                                <label className="mb-2 block text-sm font-medium">
                                    Delivery Address
                                </label>

                                <textarea
                                    name="deliveryAddress"
                                    value={
                                        form.deliveryAddress
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    rows={5}
                                    required
                                    placeholder="Enter your complete delivery address..."
                                    className="w-full resize-none rounded-lg border px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                                />

                            </div>


                            <button
                                type="submit"
                                disabled={placingOrder}
                                className="mt-7 w-full rounded-lg bg-orange-500 py-3 font-semibold text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
                            >

                                {placingOrder
                                    ? "Placing Order..."
                                    : "Place Order"}

                            </button>

                        </form>

                    </div>


                    {/* =================================================
                        ORDER SUMMARY
                    ================================================= */}

                    <div className="h-fit rounded-2xl border bg-white p-6">

                        <h2 className="text-xl font-bold">
                            Order Summary
                        </h2>


                        <div className="mt-6 space-y-4">

                            {items.map((item) => (

                                <div
                                    key={item.id}
                                    className="flex justify-between gap-4 text-sm"
                                >

                                    <div>

                                        <p className="font-medium">
                                            {item.itemName ||
                                                item.name}
                                        </p>

                                        <p className="text-gray-500">
                                            {item.quantity} × ₹
                                            {Number(
                                                item.price
                                            ).toFixed(2)}
                                        </p>

                                    </div>

                                    <span className="font-medium">
                                        ₹
                                        {(
                                            Number(
                                                item.price
                                            ) *
                                            Number(
                                                item.quantity
                                            )
                                        ).toFixed(2)}
                                    </span>

                                </div>

                            ))}

                        </div>


                        <div className="mt-6 space-y-3 border-t pt-5 text-sm">

                            <div className="flex justify-between">

                                <span className="text-gray-500">
                                    Subtotal
                                </span>

                                <span>
                                    ₹
                                    {Number(
                                        subtotal
                                    ).toFixed(2)}
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


                            <div className="flex justify-between border-t pt-4 text-lg font-bold">

                                <span>
                                    Total
                                </span>

                                <span>
                                    ₹
                                    {Number(
                                        total
                                    ).toFixed(2)}
                                </span>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </main>
    );
};

export default Checkout;
import { useEffect, useState } from "react";
import {
    ArrowRight,
    Package,
    RefreshCw,
} from "lucide-react";

import { Link } from "react-router-dom";

import {
    getMyOrders,
} from "../services/orderService";

import Loading from "../components/Loading";

const Orders = () => {

    const [orders, setOrders] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    // =========================================================
    // LOAD ORDERS
    // =========================================================

    const loadOrders = async () => {

        try {

            setLoading(true);
            setError("");

            const data =
                await getMyOrders();

            setOrders(
                Array.isArray(data)
                    ? data
                    : data.content || []
            );

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Unable to load your orders."
            );

        } finally {

            setLoading(false);
        }
    };


    useEffect(() => {

        loadOrders();

    }, []);


    // =========================================================
    // LOADING
    // =========================================================

    if (loading) {
        return <Loading />;
    }


    return (

        <main className="min-h-screen bg-gray-50">

            <div className="mx-auto max-w-6xl px-4 py-10">

                {/* HEADER */}

                <div className="flex items-center justify-between">

                    <div>

                        <h1 className="text-3xl font-bold text-gray-900">
                            My Orders
                        </h1>

                        <p className="mt-1 text-gray-500">
                            Track and manage your orders.
                        </p>

                    </div>

                    <button
                        onClick={loadOrders}
                        className="flex items-center gap-2 rounded-lg border bg-white px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
                    >

                        <RefreshCw size={17} />

                        Refresh

                    </button>

                </div>


                {/* ERROR */}

                {error && (

                    <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-5">

                        <p className="text-sm text-red-600">
                            {error}
                        </p>

                    </div>

                )}


                {/* EMPTY */}

                {!error &&
                    orders.length === 0 && (

                        <div className="mt-10 rounded-2xl border bg-white p-12 text-center">

                            <Package
                                size={55}
                                className="mx-auto text-gray-300"
                            />

                            <h2 className="mt-5 text-xl font-bold">
                                No orders yet
                            </h2>

                            <p className="mt-2 text-gray-500">
                                Your orders will appear here.
                            </p>

                            <Link
                                to="/restaurants"
                                className="mt-6 inline-block rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600"
                            >
                                Browse Restaurants
                            </Link>

                        </div>
                    )}


                {/* ORDERS */}

                <div className="mt-8 space-y-5">

                    {orders.map((order) => (

                        <div
                            key={order.orderId}
                            className="rounded-2xl border bg-white p-6 shadow-sm"
                        >

                            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                                <div>

                                    <p className="text-sm text-gray-500">
                                        Order
                                    </p>

                                    <h2 className="mt-1 text-lg font-bold">
                                        #{order.orderId}
                                    </h2>

                                </div>


                                <div className="flex items-center gap-4">

                                    <div className="text-right">

                                        <p className="text-sm text-gray-500">
                                            Total
                                        </p>

                                        <p className="font-bold">
                                            ₹
                                            {Number(
                                                order.totalAmount || 0
                                            ).toFixed(2)}
                                        </p>

                                    </div>


                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                            order.status ===
                                            "CANCELLED"
                                                ? "bg-red-50 text-red-600"
                                                : order.status ===
                                                  "COMPLETED"
                                                ? "bg-green-50 text-green-600"
                                                : "bg-orange-50 text-orange-600"
                                        }`}
                                    >
                                        {order.status}
                                    </span>

                                </div>

                            </div>


                            <div className="mt-5 border-t pt-5">

                                <p className="line-clamp-1 text-sm text-gray-500">
                                    Delivery:{" "}
                                    {order.deliveryAddress}
                                </p>

                            </div>


                            <div className="mt-5 flex justify-end">

                                <Link
                                    to={`/orders/${order.orderId}`}
                                    className="flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-gray-800"
                                >

                                    View Order

                                    <ArrowRight
                                        size={17}
                                    />

                                </Link>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </main>
    );
};

export default Orders;
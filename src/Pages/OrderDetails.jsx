import { useEffect, useState } from "react";
import {
    ArrowLeft,
    CheckCircle,
    MapPin,
    Package,
    XCircle,
} from "lucide-react";

import {
    Link,
    useNavigate,
    useParams,
} from "react-router-dom";

import {
    cancelOrder,
    getMyOrder,
} from "../services/orderService";

import OrderStatus from "../components/OrderStatus";
import Loading from "../components/Loading";

const OrderDetails = () => {

    const { orderId } = useParams();

    const navigate = useNavigate();

    const [order, setOrder] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [cancelling, setCancelling] =
        useState(false);

    const [error, setError] =
        useState("");


    // =========================================================
    // LOAD ORDER
    // =========================================================

    const loadOrder = async () => {

        try {

            setLoading(true);
            setError("");

            const data =
                await getMyOrder(orderId);

            setOrder(data);

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Unable to load order."
            );

        } finally {

            setLoading(false);
        }
    };


    useEffect(() => {

        loadOrder();

    }, [orderId]);


    // =========================================================
    // CANCEL ORDER
    // =========================================================

    const handleCancel = async () => {

        const confirmed =
            window.confirm(
                "Are you sure you want to cancel this order?"
            );

        if (!confirmed) {
            return;
        }

        try {

            setCancelling(true);
            setError("");

            const updatedOrder =
                await cancelOrder(orderId);

            setOrder(updatedOrder);

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Unable to cancel order."
            );

        } finally {

            setCancelling(false);
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

    if (error && !order) {

        return (

            <main className="min-h-screen bg-gray-50 px-4 py-12">

                <div className="mx-auto max-w-xl rounded-2xl border bg-white p-10 text-center">

                    <XCircle
                        size={55}
                        className="mx-auto text-red-400"
                    />

                    <h2 className="mt-5 text-xl font-bold">
                        Unable to load order
                    </h2>

                    <p className="mt-2 text-gray-500">
                        {error}
                    </p>

                    <Link
                        to="/orders"
                        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-orange-500 px-5 py-3 font-semibold text-white"
                    >

                        <ArrowLeft size={18} />

                        Back to Orders

                    </Link>

                </div>

            </main>
        );
    }


    if (!order) {
        return null;
    }


    const canCancel =
        order.status === "PENDING";


    return (

        <main className="min-h-screen bg-gray-50">

            <div className="mx-auto max-w-5xl px-4 py-10">

                {/* BACK */}

                <Link
                    to="/orders"
                    className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-orange-500"
                >

                    <ArrowLeft size={17} />

                    Back to Orders

                </Link>


                {/* HEADER */}

                <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    <div>

                        <p className="text-sm text-gray-500">
                            Order
                        </p>

                        <h1 className="text-3xl font-bold">
                            #{order.orderId}
                        </h1>

                    </div>


                    {order.status ===
                        "COMPLETED" && (

                        <div className="flex items-center gap-2 text-green-600">

                            <CheckCircle
                                size={21}
                            />

                            <span className="font-semibold">
                                Order Completed
                            </span>

                        </div>

                    )}

                </div>


                {/* ERROR */}

                {error && (

                    <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                        {error}
                    </div>

                )}


                {/* STATUS */}

                <div className="mt-7">

                    <OrderStatus
                        status={order.status}
                    />

                </div>


                <div className="mt-7 grid gap-7 lg:grid-cols-3">


                    {/* =================================================
                        ORDER ITEMS
                    ================================================= */}

                    <div className="lg:col-span-2">

                        <div className="rounded-2xl border bg-white p-6">

                            <div className="flex items-center gap-3">

                                <Package
                                    size={21}
                                    className="text-orange-500"
                                />

                                <h2 className="text-xl font-bold">
                                    Order Items
                                </h2>

                            </div>


                            <div className="mt-6 divide-y">

                                {(order.items || []).map(
                                    (item) => (

                                        <div
                                            key={
                                                item.orderItemId ||
                                                item.id
                                            }
                                            className="flex items-center justify-between gap-4 py-4"
                                        >

                                            <div>

                                                <h3 className="font-semibold">
                                                    {item.menuItemName ||
                                                        item.itemName ||
                                                        item.name}
                                                </h3>

                                                <p className="mt-1 text-sm text-gray-500">
                                                    {item.quantity} × ₹
                                                    {Number(
                                                        item.price || 0
                                                    ).toFixed(2)}
                                                </p>

                                            </div>


                                            <span className="font-bold">

                                                ₹
                                                {(
                                                    Number(
                                                        item.price || 0
                                                    ) *
                                                    Number(
                                                        item.quantity || 0
                                                    )
                                                ).toFixed(2)}

                                            </span>

                                        </div>

                                    )
                                )}

                            </div>

                        </div>

                    </div>


                    {/* =================================================
                        SUMMARY
                    ================================================= */}

                    <div className="h-fit space-y-6">


                        {/* DELIVERY */}

                        <div className="rounded-2xl border bg-white p-6">

                            <div className="flex items-center gap-3">

                                <MapPin
                                    size={20}
                                    className="text-orange-500"
                                />

                                <h2 className="font-bold">
                                    Delivery Address
                                </h2>

                            </div>

                            <p className="mt-4 text-sm leading-relaxed text-gray-500">
                                {order.deliveryAddress}
                            </p>

                        </div>


                        {/* PRICE */}

                        <div className="rounded-2xl border bg-white p-6">

                            <h2 className="font-bold">
                                Payment Summary
                            </h2>


                            <div className="mt-5 space-y-3 text-sm">

                                <div className="flex justify-between">

                                    <span className="text-gray-500">
                                        Subtotal
                                    </span>

                                    <span>
                                        ₹
                                        {Number(
                                            order.subtotal ||
                                            order.totalAmount ||
                                            0
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
                                            order.totalAmount ||
                                            0
                                        ).toFixed(2)}
                                    </span>

                                </div>

                            </div>

                        </div>


                        {/* CANCEL */}

                        {canCancel && (

                            <button
                                onClick={
                                    handleCancel
                                }
                                disabled={
                                    cancelling
                                }
                                className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 bg-white py-3 font-semibold text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                            >

                                <XCircle size={18} />

                                {cancelling
                                    ? "Cancelling..."
                                    : "Cancel Order"}

                            </button>

                        )}

                    </div>

                </div>

            </div>

        </main>
    );
};

export default OrderDetails;
import { useEffect, useMemo, useState } from "react";

import {
    ArrowLeft,
    ClipboardList,
    RefreshCw,
} from "lucide-react";

import {
    Link,
    useParams,
} from "react-router-dom";

import {
    getRestaurantOrders,
    updateOrderStatus,
} from "../../services/ownerOrderService";

import OwnerOrderCard
    from "../../components/OwnerOrderCard";

import Loading
    from "../../components/Loading";


const OwnerOrders = () => {

    const { restaurantId } =
        useParams();


    const [orders, setOrders] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [success, setSuccess] =
        useState("");

    const [updatingOrderId, setUpdatingOrderId] =
        useState(null);

    const [filter, setFilter] =
        useState("ALL");


    // =========================================================
    // LOAD ORDERS
    // =========================================================

    const loadOrders = async () => {

        try {

            setLoading(true);
            setError("");

            const data =
                await getRestaurantOrders(
                    restaurantId
                );

            setOrders(
                Array.isArray(data)
                    ? data
                    : data.content || []
            );

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Unable to load restaurant orders."
            );

        } finally {

            setLoading(false);
        }
    };


    useEffect(() => {

        loadOrders();

    }, [restaurantId]);


    // =========================================================
    // UPDATE STATUS
    // =========================================================

    const handleStatusChange =
        async (orderId, status) => {

            try {

                setUpdatingOrderId(
                    orderId
                );

                setError("");
                setSuccess("");

                const updatedOrder =
                    await updateOrderStatus(
                        orderId,
                        status
                    );

                setOrders((previous) =>
                    previous.map((order) =>
                        order.orderId === orderId
                            ? updatedOrder
                            : order
                    )
                );

                setSuccess(
                    `Order #${orderId} updated to ${status}.`
                );

            } catch (error) {

                setError(
                    error.response?.data?.message ||
                    "Unable to update order status."
                );

            } finally {

                setUpdatingOrderId(null);
            }
        };


    // =========================================================
    // FILTER
    // =========================================================

    const filteredOrders = useMemo(() => {

        if (filter === "ALL") {
            return orders;
        }

        return orders.filter(
            (order) =>
                order.status === filter
        );

    }, [orders, filter]);


    // =========================================================
    // STATISTICS
    // =========================================================

    const stats = useMemo(() => {

        return {
            total: orders.length,

            pending: orders.filter(
                (order) =>
                    order.status === "PENDING"
            ).length,

            preparing: orders.filter(
                (order) =>
                    order.status === "PREPARING"
            ).length,

            ready: orders.filter(
                (order) =>
                    order.status === "READY"
            ).length,

            completed: orders.filter(
                (order) =>
                    order.status === "COMPLETED"
            ).length,
        };

    }, [orders]);


    if (loading) {
        return <Loading />;
    }


    return (

        <main className="min-h-screen bg-gray-50">

            <div className="mx-auto max-w-7xl px-4 py-10">

                {/* =================================================
                    HEADER
                ================================================= */}

                <Link
                    to="/owner/restaurants"
                    className="mb-5 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-orange-500"
                >

                    <ArrowLeft size={16} />

                    Back to Restaurants

                </Link>


                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    <div>

                        <div className="flex items-center gap-3">

                            <ClipboardList
                                size={28}
                                className="text-orange-500"
                            />

                            <h1 className="text-3xl font-bold">
                                Restaurant Orders
                            </h1>

                        </div>

                        <p className="mt-2 text-gray-500">
                            View incoming orders and
                            update their status.
                        </p>

                    </div>


                    <button
                        onClick={loadOrders}
                        className="flex items-center justify-center gap-2 rounded-lg border bg-white px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                    >

                        <RefreshCw size={17} />

                        Refresh

                    </button>

                </div>


                {/* =================================================
                    ERROR
                ================================================= */}

                {error && (

                    <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                        {error}
                    </div>

                )}


                {/* =================================================
                    SUCCESS
                ================================================= */}

                {success && (

                    <div className="mt-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-600">
                        {success}
                    </div>

                )}


                {/* =================================================
                    STATISTICS
                ================================================= */}

                <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-5">

                    <div className="rounded-xl border bg-white p-5">

                        <p className="text-sm text-gray-500">
                            Total
                        </p>

                        <p className="mt-2 text-2xl font-bold">
                            {stats.total}
                        </p>

                    </div>


                    <div className="rounded-xl border bg-white p-5">

                        <p className="text-sm text-gray-500">
                            Pending
                        </p>

                        <p className="mt-2 text-2xl font-bold text-yellow-600">
                            {stats.pending}
                        </p>

                    </div>


                    <div className="rounded-xl border bg-white p-5">

                        <p className="text-sm text-gray-500">
                            Preparing
                        </p>

                        <p className="mt-2 text-2xl font-bold text-blue-600">
                            {stats.preparing}
                        </p>

                    </div>


                    <div className="rounded-xl border bg-white p-5">

                        <p className="text-sm text-gray-500">
                            Ready
                        </p>

                        <p className="mt-2 text-2xl font-bold text-purple-600">
                            {stats.ready}
                        </p>

                    </div>


                    <div className="rounded-xl border bg-white p-5">

                        <p className="text-sm text-gray-500">
                            Completed
                        </p>

                        <p className="mt-2 text-2xl font-bold text-green-600">
                            {stats.completed}
                        </p>

                    </div>

                </div>


                {/* =================================================
                    FILTER
                ================================================= */}

                <div className="mt-8 flex flex-wrap gap-2">

                    {[
                        "ALL",
                        "PENDING",
                        "PREPARING",
                        "READY",
                        "COMPLETED",
                        "CANCELLED",
                    ].map((status) => (

                        <button
                            key={status}
                            onClick={() =>
                                setFilter(status)
                            }
                            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                                filter === status
                                    ? "bg-orange-500 text-white"
                                    : "border bg-white text-gray-600 hover:border-orange-300"
                            }`}
                        >
                            {status}
                        </button>

                    ))}

                </div>


                {/* =================================================
                    EMPTY
                ================================================= */}

                {filteredOrders.length === 0 && (

                    <div className="mt-8 rounded-2xl border bg-white p-12 text-center">

                        <ClipboardList
                            size={55}
                            className="mx-auto text-gray-300"
                        />

                        <h2 className="mt-5 text-xl font-bold">
                            No orders found
                        </h2>

                        <p className="mt-2 text-gray-500">
                            There are no orders matching
                            the selected filter.
                        </p>

                    </div>

                )}


                {/* =================================================
                    ORDERS
                ================================================= */}

                {filteredOrders.length > 0 && (

                    <div className="mt-8 grid gap-6 lg:grid-cols-2">

                        {filteredOrders.map(
                            (order) => (

                                <OwnerOrderCard
                                    key={
                                        order.orderId
                                    }
                                    order={order}
                                    onStatusChange={
                                        handleStatusChange
                                    }
                                    updating={
                                        updatingOrderId ===
                                        order.orderId
                                    }
                                />

                            )
                        )}

                    </div>

                )}

            </div>

        </main>
    );
};

export default OwnerOrders;
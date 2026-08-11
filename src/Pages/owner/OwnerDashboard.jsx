import { useEffect, useMemo, useState } from "react";

import {
    ClipboardList,
    Clock3,
    IndianRupee,
    Menu,
    PackageCheck,
    RefreshCw,
    Store,
    Utensils,
    ArrowRight,
} from "lucide-react";

import { Link } from "react-router-dom";

import {
    getMyRestaurants,
} from "../../services/ownerRestaurantService";

import {
    getRestaurantMenu,
} from "../../services/ownerMenuService";

import {
    getRestaurantOrders,
} from "../../services/ownerOrderService";

import Loading from "../../components/Loading";


// =========================================================
// OWNER DASHBOARD
// =========================================================

const OwnerDashboard = () => {

    const [restaurants, setRestaurants] =
        useState([]);

    const [restaurantData, setRestaurantData] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    // =========================================================
    // LOAD DASHBOARD
    // =========================================================

    const loadDashboard = async () => {

        try {

            setLoading(true);
            setError("");

            // -------------------------------------------------
            // GET OWNER RESTAURANTS
            // -------------------------------------------------

            const restaurantResponse =
                await getMyRestaurants();

            const restaurantList =
                Array.isArray(restaurantResponse)
                    ? restaurantResponse
                    : restaurantResponse?.content || [];

            setRestaurants(
                restaurantList
            );


            // -------------------------------------------------
            // GET MENU + ORDERS FOR EACH RESTAURANT
            // -------------------------------------------------

            const details =
                await Promise.all(
                    restaurantList.map(
                        async (restaurant) => {

                            try {

                                const [
                                    menuResponse,
                                    orderResponse,
                                ] = await Promise.all([
                                    getRestaurantMenu(
                                        restaurant.id
                                    ),
                                    getRestaurantOrders(
                                        restaurant.id
                                    ),
                                ]);


                                const menu =
                                    Array.isArray(
                                        menuResponse
                                    )
                                        ? menuResponse
                                        : menuResponse?.content || [];


                                const orders =
                                    Array.isArray(
                                        orderResponse
                                    )
                                        ? orderResponse
                                        : orderResponse?.content || [];


                                return {
                                    restaurant,
                                    menu,
                                    orders,
                                };

                            } catch (error) {

                                console.error(
                                    `Unable to load data for restaurant ${restaurant.id}`,
                                    error
                                );

                                return {
                                    restaurant,
                                    menu: [],
                                    orders: [],
                                };
                            }

                        }
                    )
                );


            setRestaurantData(
                details
            );

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Unable to load owner dashboard."
            );

        } finally {

            setLoading(false);
        }
    };


    useEffect(() => {

        loadDashboard();

    }, []);


    // =========================================================
    // DASHBOARD STATISTICS
    // =========================================================

    const statistics = useMemo(() => {

        const allMenus =
            restaurantData.flatMap(
                (item) => item.menu
            );

        const allOrders =
            restaurantData.flatMap(
                (item) => item.orders
            );


        const totalRevenue =
            allOrders
                .filter(
                    (order) =>
                        order.status !==
                        "CANCELLED"
                )
                .reduce(
                    (total, order) =>
                        total +
                        Number(
                            order.totalAmount || 0
                        ),
                    0
                );


        return {

            restaurants:
                restaurants.length,

            menuItems:
                allMenus.length,

            availableItems:
                allMenus.filter(
                    (item) =>
                        item.available === true
                ).length,

            specialItems:
                allMenus.filter(
                    (item) =>
                        item.todaySpecial === true
                ).length,

            dealItems:
                allMenus.filter(
                    (item) =>
                        item.dealOfTheDay === true
                ).length,

            orders:
                allOrders.length,

            pending:
                allOrders.filter(
                    (order) =>
                        order.status === "PENDING"
                ).length,

            preparing:
                allOrders.filter(
                    (order) =>
                        order.status === "PREPARING"
                ).length,

            ready:
                allOrders.filter(
                    (order) =>
                        order.status === "READY"
                ).length,

            completed:
                allOrders.filter(
                    (order) =>
                        order.status === "COMPLETED"
                ).length,

            revenue:
                totalRevenue,
        };

    }, [
        restaurants,
        restaurantData,
    ]);


    // =========================================================
    // RECENT ORDERS
    // =========================================================

    const recentOrders = useMemo(() => {

        return restaurantData
            .flatMap(
                (item) =>
                    item.orders.map(
                        (order) => ({
                            ...order,
                            restaurantName:
                                item.restaurant.name,
                        })
                    )
            )
            .sort(
                (a, b) =>
                    new Date(
                        b.createdAt || 0
                    ) -
                    new Date(
                        a.createdAt || 0
                    )
            )
            .slice(0, 5);

    }, [restaurantData]);


    // =========================================================
    // LOADING
    // =========================================================

    if (loading) {

        return <Loading />;

    }


    // =========================================================
    // ERROR
    // =========================================================

    if (error) {

        return (

            <main className="min-h-screen bg-gray-50 px-4 py-10">

                <div className="mx-auto max-w-2xl rounded-2xl border bg-white p-10 text-center">

                    <Store
                        size={55}
                        className="mx-auto text-gray-300"
                    />

                    <h1 className="mt-5 text-2xl font-bold">
                        Unable to load dashboard
                    </h1>

                    <p className="mt-2 text-gray-500">
                        {error}
                    </p>

                    <button
                        onClick={loadDashboard}
                        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white"
                    >

                        <RefreshCw size={18} />

                        Try Again

                    </button>

                </div>

            </main>
        );
    }


    return (

        <main className="min-h-screen bg-gray-50">

            <div className="mx-auto max-w-7xl px-4 py-10">

                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    <div>

                        <h1 className="text-3xl font-bold text-gray-900">
                            Owner Dashboard
                        </h1>

                        <p className="mt-2 text-gray-500">
                            Overview of your restaurants,
                            menu and orders.
                        </p>

                    </div>


                    <button
                        onClick={loadDashboard}
                        className="flex items-center justify-center gap-2 rounded-lg border bg-white px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                    >

                        <RefreshCw size={17} />

                        Refresh

                    </button>

                </div>


                {/* =================================================
                    MAIN STATISTICS
                ================================================= */}

                <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

                    {/* Restaurants */}

                    <div className="rounded-2xl border bg-white p-6">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm text-gray-500">
                                    Restaurants
                                </p>

                                <p className="mt-2 text-3xl font-bold">
                                    {statistics.restaurants}
                                </p>

                            </div>

                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100 text-orange-500">

                                <Store size={22} />

                            </div>

                        </div>

                    </div>


                    {/* Menu */}

                    <div className="rounded-2xl border bg-white p-6">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm text-gray-500">
                                    Menu Items
                                </p>

                                <p className="mt-2 text-3xl font-bold">
                                    {statistics.menuItems}
                                </p>

                            </div>

                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-500">

                                <Menu size={22} />

                            </div>

                        </div>

                    </div>


                    {/* Orders */}

                    <div className="rounded-2xl border bg-white p-6">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm text-gray-500">
                                    Total Orders
                                </p>

                                <p className="mt-2 text-3xl font-bold">
                                    {statistics.orders}
                                </p>

                            </div>

                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-purple-500">

                                <ClipboardList size={22} />

                            </div>

                        </div>

                    </div>


                    {/* Revenue */}

                    <div className="rounded-2xl border bg-white p-6">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm text-gray-500">
                                    Revenue
                                </p>

                                <p className="mt-2 text-3xl font-bold">
                                    ₹
                                    {statistics.revenue.toFixed(
                                        2
                                    )}
                                </p>

                            </div>

                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-600">

                                <IndianRupee size={22} />

                            </div>

                        </div>

                    </div>

                </div>


                {/* =================================================
                    ORDER STATUS
                ================================================= */}

                <section className="mt-8">

                    <h2 className="text-xl font-bold">
                        Order Overview
                    </h2>

                    <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4">

                        <div className="rounded-xl border bg-white p-5">

                            <Clock3
                                size={21}
                                className="text-yellow-500"
                            />

                            <p className="mt-3 text-sm text-gray-500">
                                Pending
                            </p>

                            <p className="mt-1 text-2xl font-bold">
                                {statistics.pending}
                            </p>

                        </div>


                        <div className="rounded-xl border bg-white p-5">

                            <Utensils
                                size={21}
                                className="text-blue-500"
                            />

                            <p className="mt-3 text-sm text-gray-500">
                                Preparing
                            </p>

                            <p className="mt-1 text-2xl font-bold">
                                {statistics.preparing}
                            </p>

                        </div>


                        <div className="rounded-xl border bg-white p-5">

                            <PackageCheck
                                size={21}
                                className="text-purple-500"
                            />

                            <p className="mt-3 text-sm text-gray-500">
                                Ready
                            </p>

                            <p className="mt-1 text-2xl font-bold">
                                {statistics.ready}
                            </p>

                        </div>


                        <div className="rounded-xl border bg-white p-5">

                            <PackageCheck
                                size={21}
                                className="text-green-500"
                            />

                            <p className="mt-3 text-sm text-gray-500">
                                Completed
                            </p>

                            <p className="mt-1 text-2xl font-bold">
                                {statistics.completed}
                            </p>

                        </div>

                    </div>

                </section>


                {/* =================================================
                    MENU OVERVIEW
                ================================================= */}

                <section className="mt-8">

                    <h2 className="text-xl font-bold">
                        Menu Overview
                    </h2>

                    <div className="mt-5 grid gap-5 sm:grid-cols-3">

                        <div className="rounded-xl border bg-white p-6">

                            <p className="text-sm text-gray-500">
                                Available Items
                            </p>

                            <p className="mt-2 text-3xl font-bold text-green-600">
                                {statistics.availableItems}
                            </p>

                        </div>


                        <div className="rounded-xl border bg-white p-6">

                            <p className="text-sm text-gray-500">
                                Today's Special
                            </p>

                            <p className="mt-2 text-3xl font-bold text-orange-500">
                                {statistics.specialItems}
                            </p>

                        </div>


                        <div className="rounded-xl border bg-white p-6">

                            <p className="text-sm text-gray-500">
                                Deals of the Day
                            </p>

                            <p className="mt-2 text-3xl font-bold text-green-600">
                                {statistics.dealItems}
                            </p>

                        </div>

                    </div>

                </section>


                {/* =================================================
                    RESTAURANTS
                ================================================= */}

                <section className="mt-8">

                    <div className="flex items-center justify-between">

                        <h2 className="text-xl font-bold">
                            My Restaurants
                        </h2>

                        <Link
                            to="/owner/restaurants"
                            className="flex items-center gap-1 text-sm font-semibold text-orange-500"
                        >

                            Manage

                            <ArrowRight size={16} />

                        </Link>

                    </div>


                    {restaurants.length === 0 ? (

                        <div className="mt-5 rounded-2xl border bg-white p-10 text-center">

                            <Store
                                size={45}
                                className="mx-auto text-gray-300"
                            />

                            <p className="mt-4 font-semibold">
                                No restaurants yet
                            </p>

                            <Link
                                to="/owner/restaurants"
                                className="mt-5 inline-block rounded-lg bg-orange-500 px-5 py-3 font-semibold text-white"
                            >
                                Add Restaurant
                            </Link>

                        </div>

                    ) : (

                        <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

                            {restaurants.map(
                                (restaurant) => (

                                    <div
                                        key={
                                            restaurant.id
                                        }
                                        className="rounded-2xl border bg-white p-5"
                                    >

                                        <div className="flex items-start justify-between">

                                            <div>

                                                <h3 className="font-bold">
                                                    {restaurant.name}
                                                </h3>

                                                <p className="mt-1 text-sm text-orange-500">
                                                    {restaurant.cuisine}
                                                </p>

                                            </div>


                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                                    restaurant.active
                                                        ? "bg-green-50 text-green-600"
                                                        : "bg-gray-100 text-gray-500"
                                                }`}
                                            >
                                                {restaurant.active
                                                    ? "Active"
                                                    : "Inactive"}
                                            </span>

                                        </div>


                                        <div className="mt-5 flex gap-2">

                                            <Link
                                                to={`/owner/restaurants/${restaurant.id}/menu`}
                                                className="flex-1 rounded-lg bg-orange-500 px-3 py-2.5 text-center text-sm font-semibold text-white"
                                            >
                                                Menu
                                            </Link>

                                            <Link
                                                to={`/owner/restaurants/${restaurant.id}/orders`}
                                                className="flex-1 rounded-lg border px-3 py-2.5 text-center text-sm font-semibold text-gray-700"
                                            >
                                                Orders
                                            </Link>

                                        </div>

                                    </div>

                                )
                            )}

                        </div>

                    )}

                </section>


                {/* =================================================
                    RECENT ORDERS
                ================================================= */}

                <section className="mt-8">

                    <div className="flex items-center justify-between">

                        <h2 className="text-xl font-bold">
                            Recent Orders
                        </h2>

                    </div>


                    {recentOrders.length === 0 ? (

                        <div className="mt-5 rounded-2xl border bg-white p-10 text-center">

                            <ClipboardList
                                size={45}
                                className="mx-auto text-gray-300"
                            />

                            <p className="mt-4 text-gray-500">
                                No orders yet.
                            </p>

                        </div>

                    ) : (

                        <div className="mt-5 overflow-hidden rounded-2xl border bg-white">

                            <div className="divide-y">

                                {recentOrders.map(
                                    (order) => (

                                        <div
                                            key={
                                                `${order.restaurantName}-${order.orderId}`
                                            }
                                            className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between"
                                        >

                                            <div>

                                                <p className="font-semibold">
                                                    Order #
                                                    {order.orderId}
                                                </p>

                                                <p className="mt-1 text-sm text-gray-500">
                                                    {order.restaurantName}
                                                </p>

                                            </div>


                                            <div className="flex items-center gap-5">

                                                <span
                                                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                                        order.status ===
                                                        "COMPLETED"
                                                            ? "bg-green-50 text-green-600"
                                                            : order.status ===
                                                              "CANCELLED"
                                                            ? "bg-red-50 text-red-600"
                                                            : "bg-orange-50 text-orange-600"
                                                    }`}
                                                >
                                                    {order.status}
                                                </span>


                                                <span className="font-bold">
                                                    ₹
                                                    {Number(
                                                        order.totalAmount ||
                                                        0
                                                    ).toFixed(2)}
                                                </span>

                                            </div>

                                        </div>

                                    )
                                )}

                            </div>

                        </div>

                    )}

                </section>

            </div>

        </main>
    );
};

export default OwnerDashboard;
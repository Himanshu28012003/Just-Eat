import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import FavoriteButton from "../components/FavoriteButton";
import {
    ArrowLeft,
    Clock,
    Flame,
    MapPin,
    Phone,
    Search,
    Star,
    TrendingUp,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

import {
    getRestaurantById,
} from "../services/restaurantService";

import {
    getRestaurantMenu,
} from "../services/menuService";

import {
    getTodaySpecial,
    getMostlyOrdered,
} from "../services/discoveryService";

import { addToCart } from "../services/cartService";

import MenuItemCard from "../components/MenuItemCard";
import Loading from "../components/Loading";


const RestaurantDetails = () => {

    const { restaurantId } = useParams();

    // =========================================================
    // AUTH
    // =========================================================

    const { isAuthenticated } = useAuth();

    // =========================================================
    // RESTAURANT STATE
    // =========================================================

    const [restaurant, setRestaurant] =
        useState(null);

    const [menuItems, setMenuItems] =
        useState([]);

    // =========================================================
    // SEARCH / FILTER STATE
    // =========================================================

    const [search, setSearch] =
        useState("");

    const [selectedCategory, setSelectedCategory] =
        useState("ALL");

    // =========================================================
    // LOADING / ERROR STATE
    // =========================================================

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    // =========================================================
    // CART STATE
    // =========================================================

    const [addingItemId, setAddingItemId] =
        useState(null);

    const [cartMessage, setCartMessage] =
        useState("");

    // =========================================================
    // DISCOVERY STATE
    // =========================================================

    const [specialIds, setSpecialIds] = useState(new Set());
    const [orderedIds, setOrderedIds] = useState(new Set());
    const [activeFilter, setActiveFilter] = useState(null);


    // =========================================================
    // FETCH RESTAURANT + MENU
    // =========================================================

    useEffect(() => {

        const loadRestaurant = async () => {

            try {

                setLoading(true);
                setError("");

                const [
                    restaurantData,
                    menuData,
                ] = await Promise.all([
                    getRestaurantById(restaurantId),
                    getRestaurantMenu(restaurantId),
                ]);

                setRestaurant(
                    restaurantData
                );

                const items = Array.isArray(menuData)
                    ? menuData
                    : menuData.content || [];

                setMenuItems(items);

                // Fetch discovery data in parallel, silently ignore failures
                const [specials, ordered] = await Promise.allSettled([
                    getTodaySpecial(restaurantId),
                    getMostlyOrdered(restaurantId),
                ]);

                const toIds = (result) => {
                    const list = result.status === "fulfilled" ? (Array.isArray(result.value) ? result.value : []) : [];
                    return new Set(list.map((i) => i.id ?? i.menuItemId).filter(Boolean));
                };

                setSpecialIds(toIds(specials));
                setOrderedIds(toIds(ordered));

            } catch (err) {

                setError(
                    err.response?.data?.message ||
                    "Unable to load restaurant."
                );

            } finally {

                setLoading(false);

            }

        };

        loadRestaurant();

    }, [restaurantId]);


    // =========================================================
    // ADD TO CART
    // =========================================================

    const handleAddToCart = async (item) => {

        // -----------------------------------------------------
        // Check login
        // -----------------------------------------------------

        if (!isAuthenticated) {

            setCartMessage(
                "Please login to add items to your cart."
            );

            return;
        }

        try {

            // Show loading for this particular item
            setAddingItemId(item.id);

            // Clear previous message
            setCartMessage("");

            // Add item to backend cart
            await addToCart(
                item.id,
                1
            );

            // Success message
            setCartMessage(
                `${item.name} added to your cart.`
            );

            window.dispatchEvent(new Event("cart:updated"));

        } catch (error) {

            setCartMessage(
                error.response?.data?.message ||
                "Unable to add item to cart."
            );

        } finally {

            // Stop loading
            setAddingItemId(null);

        }
    };


    // =========================================================
    // CATEGORIES
    // =========================================================

    const categories = useMemo(() => {

        const values = menuItems
            .map((item) => item.category)
            .filter(Boolean);

        return [
            "ALL",
            ...new Set(values),
        ];

    }, [menuItems]);


    // =========================================================
    // FILTER MENU
    // =========================================================

    const filteredItems = useMemo(() => {

        const searchValue =
            search.trim().toLowerCase();

        return menuItems.filter((item) => {

            const matchesSearch =
                !searchValue ||
                item.name
                    ?.toLowerCase()
                    .includes(searchValue) ||
                item.description
                    ?.toLowerCase()
                    .includes(searchValue);

            const matchesCategory =
                selectedCategory === "ALL" ||
                item.category === selectedCategory;

            const matchesFilter =
                !activeFilter ||
                (activeFilter === "special" && specialIds.has(item.id)) ||
                (activeFilter === "ordered" && orderedIds.has(item.id));

            return (
                matchesSearch &&
                matchesCategory &&
                matchesFilter
            );

        });

    }, [
        menuItems,
        search,
        selectedCategory,
        activeFilter,
        specialIds,
        orderedIds,
    ]);


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

            <main className="min-h-screen bg-gray-50 px-4 py-12">

                <div className="mx-auto max-w-2xl rounded-2xl border bg-white p-10 text-center">

                    <h2 className="text-xl font-bold">
                        Something went wrong
                    </h2>

                    <p className="mt-2 text-gray-500">
                        {error}
                    </p>

                    <Link
                        to="/restaurants"
                        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-orange-500 px-5 py-3 font-semibold text-white"
                    >

                        <ArrowLeft size={18} />

                        Back to Restaurants

                    </Link>

                </div>

            </main>

        );

    }


    // =========================================================
    // RESTAURANT NOT FOUND
    // =========================================================

    if (!restaurant) {

        return null;

    }


    // =========================================================
    // UI
    // =========================================================

    return (

        <main className="min-h-screen bg-gray-50">

            {/* =====================================================
                RESTAURANT HEADER
            ===================================================== */}

            <section className="bg-white">

                <div className="mx-auto max-w-7xl px-4 py-6">

                    {/* Back button */}

                    <Link
                        to="/restaurants"
                        className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-orange-500"
                    >

                        <ArrowLeft size={17} />

                        Back to Restaurants

                    </Link>


                    <div className="grid overflow-hidden rounded-2xl border bg-white md:grid-cols-2">

                        {/* =================================================
                            IMAGE
                        ================================================= */}

                        <div className="h-72 bg-gray-100 md:h-96">

                            {restaurant.imageUrl ? (

                                <img
                                    src={restaurant.imageUrl}
                                    alt={restaurant.name}
                                    className="h-full w-full object-cover"
                                />

                            ) : (

                                <div className="flex h-full items-center justify-center text-gray-400">

                                    No Image

                                </div>

                            )}

                        </div>


                        {/* =================================================
                            RESTAURANT INFORMATION
                        ================================================= */}

                        <div className="flex flex-col justify-center p-7 md:p-10">

                            <div className="flex flex-wrap items-center gap-3">

                                <span className="rounded-full bg-orange-50 px-3 py-1 text-sm font-semibold text-orange-600">

                                    {restaurant.cuisine}

                                </span>


                                {restaurant.active && (

                                    <span className="rounded-full bg-green-50 px-3 py-1 text-sm font-semibold text-green-600">

                                        Open

                                    </span>

                                )}

                            </div>


                            <div className="mt-4 flex items-center justify-between gap-4">

                                <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
                                    {restaurant.name}
                                </h1>

                                <FavoriteButton
                                    restaurantId={restaurant.id}
                                />

                            </div>


                            <p className="mt-4 leading-relaxed text-gray-500">

                                {restaurant.description ||
                                    "Delicious food prepared fresh for you."}

                            </p>


                            <div className="mt-6 space-y-3">

                                {/* Rating */}

                                <div className="flex items-center gap-3 text-gray-600">

                                    <Star
                                        size={19}
                                        className="fill-yellow-400 text-yellow-400"
                                    />

                                    <span>

                                        {restaurant.rating ??
                                            "No rating"}

                                    </span>

                                </div>


                                {/* Address */}

                                <div className="flex items-center gap-3 text-gray-600">

                                    <MapPin size={19} />

                                    <span>

                                        {restaurant.address},{" "}

                                        {restaurant.city}

                                        {restaurant.state
                                            ? `, ${restaurant.state}`
                                            : ""}

                                    </span>

                                </div>


                                {/* Phone */}

                                {restaurant.phone && (

                                    <div className="flex items-center gap-3 text-gray-600">

                                        <Phone size={19} />

                                        <span>

                                            {restaurant.phone}

                                        </span>

                                    </div>

                                )}


                                {/* Opening time */}

                                {restaurant.openingTime &&
                                    restaurant.closingTime && (

                                        <div className="flex items-center gap-3 text-gray-600">

                                            <Clock size={19} />

                                            <span>

                                                {restaurant.openingTime}
                                                {" - "}
                                                {restaurant.closingTime}

                                            </span>

                                        </div>

                                    )}

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* =====================================================
                MENU
            ===================================================== */}

            <section className="mx-auto max-w-7xl px-4 py-10">

                <div className="mb-7 flex flex-wrap items-start justify-between gap-4">

                    <div>

                        <h2 className="text-2xl font-bold text-gray-900">

                            Menu

                        </h2>

                        <p className="mt-1 text-gray-500">

                            Explore delicious dishes from{" "}

                            {restaurant.name}

                        </p>

                    </div>

                    {/* Discovery filter chips */}

                    <div className="flex flex-wrap gap-2">

                        {specialIds.size > 0 && (
                            <button
                                onClick={() => setActiveFilter(activeFilter === "special" ? null : "special")}
                                className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition ${
                                    activeFilter === "special"
                                        ? "bg-orange-500 text-white"
                                        : "border border-orange-300 bg-orange-50 text-orange-600 hover:bg-orange-100"
                                }`}
                            >
                                <Flame size={15} />
                                Today's Special
                            </button>
                        )}

                        {orderedIds.size > 0 && (
                            <button
                                onClick={() => setActiveFilter(activeFilter === "ordered" ? null : "ordered")}
                                className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition ${
                                    activeFilter === "ordered"
                                        ? "bg-blue-600 text-white"
                                        : "border border-blue-300 bg-blue-50 text-blue-600 hover:bg-blue-100"
                                }`}
                            >
                                <TrendingUp size={15} />
                                Mostly Ordered
                            </button>
                        )}

                    </div>

                </div>


                {/* =================================================
                    CART MESSAGE
                ================================================= */}

                {cartMessage && (

                    <div className="mb-6 rounded-lg border border-orange-200 bg-orange-50 px-4 py-3 text-sm text-orange-700">

                        {cartMessage}

                    </div>

                )}


                {/* =================================================
                    MENU SEARCH
                ================================================= */}

                <div className="mb-5 flex items-center gap-3 rounded-xl border bg-white px-4 py-3">

                    <Search
                        size={20}
                        className="text-gray-400"
                    />

                    <input
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        placeholder="Search menu..."
                        className="w-full outline-none"
                    />

                </div>


                {/* =================================================
                    CATEGORIES
                ================================================= */}

                <div className="mb-8 flex gap-2 overflow-x-auto pb-2">

                    {categories.map(
                        (category) => (

                            <button
                                key={category}
                                onClick={() =>
                                    setSelectedCategory(
                                        category
                                    )
                                }
                                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium ${selectedCategory === category
                                        ? "bg-orange-500 text-white"
                                        : "bg-white text-gray-600 hover:bg-orange-50 hover:text-orange-500"
                                    }`}
                            >

                                {category === "ALL"
                                    ? "All"
                                    : category}

                            </button>

                        )
                    )}

                </div>


                {/* =================================================
                    EMPTY MENU
                ================================================= */}

                {filteredItems.length === 0 ? (

                    <div className="rounded-2xl border bg-white p-12 text-center">

                        <h3 className="text-xl font-semibold">

                            No menu items found

                        </h3>

                        <p className="mt-2 text-gray-500">

                            Try another search or category.

                        </p>

                    </div>

                ) : (

                    /* =================================================
                       MENU ITEMS
                    ================================================= */

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                        {filteredItems.map(
                            (item) => (

                                <MenuItemCard
                                    key={item.id}
                                    item={item}
                                    adding={
                                        addingItemId ===
                                        item.id
                                    }
                                    onAddToCart={
                                        handleAddToCart
                                    }
                                />

                            )
                        )}

                    </div>

                )}

            </section>

        </main>

    );

};


export default RestaurantDetails;
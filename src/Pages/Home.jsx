import { useEffect, useState } from "react";
import {
    ArrowRight,
    Search,
    Sparkles,
} from "lucide-react";

import {
    Link,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import {
    getRestaurants,
} from "../services/restaurantService";

import {
    getRecommendations,
} from "../services/customerPreferenceService";

import RestaurantCard from "../components/RestaurantCard";
import Loading from "../components/Loading";


const Home = () => {

    const { isAuthenticated, user } = useAuth();

    const [restaurants, setRestaurants] =
        useState([]);

    const [recommendations, setRecommendations] =
        useState([]);

    const [loading, setLoading] =
        useState(true);


    useEffect(() => {

        const loadHomeData = async () => {

            try {

                setLoading(true);

                const restaurantData =
                    await getRestaurants();

                setRestaurants(
                    Array.isArray(restaurantData)
                        ? restaurantData
                        : restaurantData.content || []
                );

                if (isAuthenticated && user?.role === "CUSTOMER") {
                    getRecommendations()
                        .then(setRecommendations)
                        .catch(() => {});
                }

            } catch (error) {

                console.error(
                    "Unable to load home data:",
                    error
                );

            } finally {

                setLoading(false);
            }

        };


        loadHomeData();

    }, []);


    if (loading) {
        return <Loading />;
    }


    return (

        <main className="min-h-screen bg-gray-50">

            {/* =====================================================
                HERO
            ===================================================== */}

            <section className="bg-white">

                <div className="mx-auto max-w-7xl px-4 py-16">

                    <div className="grid items-center gap-12 lg:grid-cols-2">

                        <div>

                            <div className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-600">

                                <Sparkles size={16} />

                                Delicious food, delivered

                            </div>


                            <h1 className="mt-6 text-4xl font-bold leading-tight text-gray-900 md:text-6xl">

                                Discover your
                                {" "}
                                <span className="text-orange-500">
                                    favorite food
                                </span>

                            </h1>


                            <p className="mt-5 max-w-xl text-lg leading-relaxed text-gray-500">

                                Find restaurants, discover
                                popular dishes and order your
                                favorite meals from one place.

                            </p>


                            {/* Search */}

                            <Link
                                to="/restaurants"
                                className="mt-8 flex max-w-xl items-center gap-3 rounded-xl border bg-gray-50 px-5 py-4 text-gray-400 transition hover:border-orange-400 hover:bg-white"
                            >

                                <Search size={21} />

                                <span>
                                    Search restaurants or food...
                                </span>

                                <ArrowRight
                                    size={19}
                                    className="ml-auto text-orange-500"
                                />

                            </Link>

                        </div>


                        {/* Hero visual */}

                        <div className="hidden lg:block">

                            <div className="overflow-hidden rounded-3xl bg-orange-100">

                                <div className="flex h-96 items-center justify-center">

                                    <div className="text-center">

                                        <div className="text-8xl">
                                            🍛
                                        </div>

                                        <p className="mt-5 text-xl font-bold text-orange-700">
                                            Good food.
                                        </p>

                                        <p className="text-orange-600">
                                            Good mood.
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* =====================================================
                RESTAURANTS
            ===================================================== */}

            <div className="mx-auto max-w-7xl px-4 py-10">

                {/* =================================================
                    RECOMMENDED FOR YOU
                ================================================= */}
{/* 
                {recommendations.length > 0 && (

                    <section className="mb-14">

                        <div className="mb-6 flex items-end justify-between">

                            <div>

                                <div className="inline-flex items-center gap-2 text-orange-500">
                                    <Sparkles size={18} />
                                    <span className="text-sm font-semibold uppercase tracking-wide">
                                        Based on your preferences
                                    </span>
                                </div>

                                <h2 className="mt-1 text-2xl font-bold">
                                    Recommended for You
                                </h2>

                            </div>

                            <Link
                                to="/preferences"
                                className="text-sm font-medium text-orange-500 hover:underline"
                            >
                                Edit preferences
                            </Link>

                        </div>

                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                            {recommendations
                                .slice(0, 6)
                                .map((restaurant) => (

                                    <RestaurantCard
                                        key={restaurant.id}
                                        restaurant={restaurant}
                                    />

                                ))}

                        </div>

                    </section>

                )} */}


                {/* =================================================
                    RESTAURANTS
                ================================================= */}

                {restaurants.length > 0 && (

                    <section className="mt-14">

                        <div className="mb-6 flex items-end justify-between">

                            <div>

                                <h2 className="text-2xl font-bold">
                                    Explore Restaurants
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    Find your next favorite place to eat.
                                </p>

                            </div>


                            <Link
                                to="/restaurants"
                                className="flex items-center gap-1 text-sm font-semibold text-orange-500"
                            >

                                View all

                                <ArrowRight size={16} />

                            </Link>

                        </div>


                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                            {restaurants
                                .slice(0, 6)
                                .map((restaurant) => (

                                    <RestaurantCard
                                        key={restaurant.id}
                                        restaurant={restaurant}
                                    />

                                ))}

                        </div>

                    </section>

                )}

            </div>

        </main>
    );
};

export default Home;
import { useEffect, useState } from "react";
import {
    Heart,
    RefreshCw,
} from "lucide-react";

import { Link } from "react-router-dom";

import {
    getFavorites,
} from "../services/favoriteService";

import RestaurantCard from "../components/RestaurantCard";
import Loading from "../components/Loading";

const Favorites = () => {

    const [favorites, setFavorites] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    // =========================================================
    // LOAD FAVORITES
    // =========================================================

    const loadFavorites = async () => {

        try {

            setLoading(true);
            setError("");

            const data =
                await getFavorites();

            setFavorites(
                Array.isArray(data)
                    ? data
                    : data.content || []
            );

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Unable to load favorites."
            );

        } finally {

            setLoading(false);
        }
    };


    useEffect(() => {

        loadFavorites();

    }, []);


    // =========================================================
    // LOADING
    // =========================================================

    if (loading) {
        return <Loading />;
    }


    return (

        <main className="min-h-screen bg-gray-50">

            <div className="mx-auto max-w-7xl px-4 py-10">

                {/* HEADER */}

                <div className="flex items-center justify-between">

                    <div>

                        <div className="flex items-center gap-3">

                            <Heart
                                size={27}
                                className="fill-red-500 text-red-500"
                            />

                            <h1 className="text-3xl font-bold">
                                My Favorites
                            </h1>

                        </div>

                        <p className="mt-2 text-gray-500">
                            Your favorite restaurants.
                        </p>

                    </div>


                    <button
                        onClick={loadFavorites}
                        className="flex items-center gap-2 rounded-lg border bg-white px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
                    >

                        <RefreshCw size={17} />

                        Refresh

                    </button>

                </div>


                {/* ERROR */}

                {error && (

                    <div className="mt-7 rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-600">
                        {error}
                    </div>

                )}


                {/* EMPTY */}

                {!error &&
                    favorites.length === 0 && (

                        <div className="mt-10 rounded-2xl border bg-white p-12 text-center">

                            <Heart
                                size={55}
                                className="mx-auto text-gray-300"
                            />

                            <h2 className="mt-5 text-xl font-bold">
                                No favorites yet
                            </h2>

                            <p className="mt-2 text-gray-500">
                                Save restaurants you love
                                to find them quickly later.
                            </p>

                            <Link
                                to="/restaurants"
                                className="mt-6 inline-block rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600"
                            >
                                Explore Restaurants
                            </Link>

                        </div>
                    )}


                {/* FAVORITES */}

                {!error &&
                    favorites.length > 0 && (

                        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                            {favorites.map(
                                (restaurant) => (

                                    <RestaurantCard
                                        key={
                                            restaurant.id
                                        }
                                        restaurant={
                                            restaurant
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

export default Favorites;
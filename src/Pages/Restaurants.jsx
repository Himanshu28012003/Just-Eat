import { useEffect, useMemo, useState } from "react";
import {
  Search,
  SlidersHorizontal,
} from "lucide-react";

import RestaurantCard from "../components/RestaurantCard";
import Loading from "../components/Loading";
import { getRestaurants } from "../services/restaurantService";

const Restaurants = () => {

  const [restaurants, setRestaurants] = useState([]);

  const [search, setSearch] = useState("");

  const [cuisine, setCuisine] = useState("ALL");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // =========================================================
  // FETCH RESTAURANTS
  // =========================================================

  useEffect(() => {

    const fetchRestaurants = async () => {

      try {

        setLoading(true);
        setError("");

        const data =
          await getRestaurants();

        setRestaurants(
          Array.isArray(data)
            ? data
            : data.content || []
        );

      } catch (err) {

        setError(
          err.response?.data?.message ||
          "Unable to load restaurants."
        );

      } finally {

        setLoading(false);
      }
    };

    fetchRestaurants();

  }, []);

  // =========================================================
  // CUISINES
  // =========================================================

  const cuisines = useMemo(() => {

    const values = restaurants
      .map((restaurant) => restaurant.cuisine)
      .filter(Boolean);

    return [
      "ALL",
      ...new Set(values),
    ];

  }, [restaurants]);

  // =========================================================
  // FILTER
  // =========================================================

  const filteredRestaurants =
    useMemo(() => {

      const searchValue =
        search.trim().toLowerCase();

      return restaurants.filter(
        (restaurant) => {

          const matchesSearch =
            !searchValue ||
            restaurant.name
              ?.toLowerCase()
              .includes(searchValue) ||
            restaurant.cuisine
              ?.toLowerCase()
              .includes(searchValue) ||
            restaurant.city
              ?.toLowerCase()
              .includes(searchValue);

          const matchesCuisine =
            cuisine === "ALL" ||
            restaurant.cuisine === cuisine;

          return (
            matchesSearch &&
            matchesCuisine
          );
        }
      );

    }, [restaurants, search, cuisine]);

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Header */}

      <section className="border-b bg-white">

        <div className="mx-auto max-w-7xl px-4 py-10">

          <p className="font-medium text-orange-500">
            Explore
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">
            Restaurants near you
          </h1>

          <p className="mt-3 max-w-2xl text-gray-500">
            Discover restaurants, cuisines and
            delicious meals.
          </p>

          {/* Search */}

          <div className="mt-7 flex max-w-3xl items-center gap-3 rounded-xl border bg-gray-50 px-4 py-3 focus-within:border-orange-500 focus-within:bg-white">

            <Search
              size={21}
              className="text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search restaurant, cuisine or city..."
              className="w-full bg-transparent outline-none"
            />

          </div>

        </div>

      </section>

      <div className="mx-auto max-w-7xl px-4 py-8">

        {/* Filters */}

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-2">
            <SlidersHorizontal
              size={19}
              className="text-gray-500"
            />

            <span className="font-semibold">
              Cuisine
            </span>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1">

            {cuisines.map((item) => (

              <button
                key={item}
                onClick={() =>
                  setCuisine(item)
                }
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${
                  cuisine === item
                    ? "bg-orange-500 text-white"
                    : "bg-white text-gray-600 hover:bg-orange-50 hover:text-orange-500"
                }`}
              >
                {item === "ALL"
                  ? "All"
                  : item}
              </button>

            ))}

          </div>

        </div>

        {/* Loading */}

        {loading && <Loading />}

        {/* Error */}

        {!loading && error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-red-600">
            {error}
          </div>
        )}

        {/* Empty */}

        {!loading &&
          !error &&
          filteredRestaurants.length === 0 && (

            <div className="rounded-2xl border bg-white p-12 text-center">

              <h2 className="text-xl font-semibold">
                No restaurants found
              </h2>

              <p className="mt-2 text-gray-500">
                Try another restaurant name,
                cuisine or city.
              </p>

            </div>
          )}

        {/* Restaurants */}

        {!loading &&
          !error &&
          filteredRestaurants.length > 0 && (

            <>

              <div className="mb-5">
                <p className="text-sm text-gray-500">
                  {filteredRestaurants.length}{" "}
                  restaurant
                  {filteredRestaurants.length !== 1
                    ? "s"
                    : ""}{" "}
                  found
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                {filteredRestaurants.map(
                  (restaurant) => (
                    <RestaurantCard
                      key={restaurant.id}
                      restaurant={restaurant}
                    />
                  )
                )}

              </div>

            </>
          )}

      </div>

    </main>
  );
};

export default Restaurants;
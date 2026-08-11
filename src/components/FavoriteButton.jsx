import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

import {
    addFavorite,
    checkFavorite,
    removeFavorite,
} from "../services/favoriteService";

import { useAuth } from "../context/AuthContext";

const FavoriteButton = ({
    restaurantId,
    className = "",
}) => {

    const { isAuthenticated, user } = useAuth();
    const isCustomer = isAuthenticated && user?.role === "CUSTOMER";

    const [favorite, setFavorite] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    useEffect(() => {

        if (!isCustomer) return;

        const loadFavoriteStatus = async () => {

            try {

                const result =
                    await checkFavorite(
                        restaurantId
                    );

                /*
                 * Supports either:
                 *
                 * true
                 *
                 * or:
                 * { favorite: true }
                 */

                setFavorite(
                    typeof result === "boolean"
                        ? result
                        : result.favorite === true
                );

            } catch (error) {

                // If checking fails, don't break
                // the restaurant page.

                setFavorite(false);
            }
        };

        loadFavoriteStatus();

    }, [restaurantId, isCustomer]);


    if (!isCustomer) return null;


    const handleToggle = async (e) => {

        // Don't navigate to restaurant details
        // when button is inside a Link/card.

        e.preventDefault();
        e.stopPropagation();

        try {

            setLoading(true);

            if (favorite) {

                await removeFavorite(
                    restaurantId
                );

                setFavorite(false);

            } else {

                await addFavorite(
                    restaurantId
                );

                setFavorite(true);
            }

        } catch (error) {

            console.error(
                "Favorite operation failed:",
                error
            );

        } finally {

            setLoading(false);
        }
    };


    return (
        <button
            type="button"
            onClick={handleToggle}
            disabled={loading}
            aria-label={
                favorite
                    ? "Remove from favorites"
                    : "Add to favorites"
            }
            className={`flex h-10 w-10 items-center justify-center rounded-full bg-white shadow transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
        >

            <Heart
                size={20}
                className={
                    favorite
                        ? "fill-red-500 text-red-500"
                        : "text-gray-600"
                }
            />

        </button>
    );
};

export default FavoriteButton;
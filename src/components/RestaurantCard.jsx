import { Link } from "react-router-dom";
import {
  MapPin,
  Clock,
} from "lucide-react";
import FavoriteButton from "./FavoriteButton";

const RestaurantCard = ({ restaurant }) => {

  return (
    <Link
      to={`/restaurants/${restaurant.id}`}
      className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >

      {/* Image */}

      <div className="relative h-52 overflow-hidden bg-gray-100">
        <div className="absolute left-3 top-3 z-10">
          <FavoriteButton
            restaurantId={restaurant.id}
          />
        </div>

        {restaurant.imageUrl ? (
          <img
            src={restaurant.imageUrl}
            alt={restaurant.name}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400">
            No Image
          </div>
        )}

      </div>

      {/* Content */}

      <div className="p-5">

        <div className="flex items-start justify-between gap-3">

          <h2 className="text-lg font-bold text-gray-900">
            {restaurant.name}
          </h2>

          {restaurant.active && (
            <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-600">
              Open
            </span>
          )}

        </div>

        <p className="mt-2 line-clamp-2 text-sm text-gray-500">
          {restaurant.description ||
            "Delicious food waiting for you."}
        </p>

        {/* Cuisine */}

        <div className="mt-4">
          <span className="rounded-full bg-orange-50 px-3 py-1 text-sm font-medium text-orange-600">
            {restaurant.cuisine}
          </span>
        </div>

        {/* Location */}

        <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
          <MapPin size={16} />

          <span>
            {restaurant.city}
            {restaurant.state
              ? `, ${restaurant.state}`
              : ""}
          </span>
        </div>

        {/* Timing */}

        {restaurant.openingTime &&
          restaurant.closingTime && (
            <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
              <Clock size={16} />

              <span>
                {restaurant.openingTime} -{" "}
                {restaurant.closingTime}
              </span>
            </div>
          )}

      </div>
    </Link>
  );
};

export default RestaurantCard;
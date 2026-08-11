import {
    Edit,
    MapPin,
    Trash2,
    Clock,
} from "lucide-react";
import { Link } from "react-router-dom";

const OwnerRestaurantCard = ({
    restaurant,
    onEdit,
    onDelete,
}) => {

    return (
        <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">

            {/* Image */}

            <div className="relative h-52 bg-gray-100">

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


                <span
                    className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${restaurant.active
                        ? "bg-green-500 text-white"
                        : "bg-gray-700 text-white"
                        }`}
                >
                    {restaurant.active
                        ? "Active"
                        : "Inactive"}
                </span>

            </div>


            {/* Content */}

            <div className="p-5">

                <h2 className="text-xl font-bold">
                    {restaurant.name}
                </h2>

                <p className="mt-1 text-sm text-orange-500">
                    {restaurant.cuisine}
                </p>


                <p className="mt-3 line-clamp-2 text-sm text-gray-500">
                    {restaurant.description}
                </p>


                <div className="mt-4 space-y-2">

                    <div className="flex items-center gap-2 text-sm text-gray-500">

                        <MapPin size={16} />

                        <span>
                            {restaurant.address},{" "}
                            {restaurant.city}
                        </span>

                    </div>


                    {restaurant.openingTime &&
                        restaurant.closingTime && (

                            <div className="flex items-center gap-2 text-sm text-gray-500">

                                <Clock size={16} />

                                <span>
                                    {restaurant.openingTime}
                                    {" - "}
                                    {restaurant.closingTime}
                                </span>

                            </div>

                        )}

                </div>


                {/* Actions */}

                <div className="mt-5 flex gap-3 border-t pt-4">

                    <Link
                        to={`/owner/restaurants/${restaurant.id}/menu`}
                        className="flex flex-1 items-center justify-center rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-600"
                    >
                        Manage Menu
                    </Link>
                    <Link
                        to={`/owner/restaurants/${restaurant.id}/orders`}
                        className="flex flex-1 items-center justify-center rounded-lg border px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                    >
                        Manage Orders
                    </Link>

                    <button
                        onClick={() =>
                            onEdit(restaurant)
                        }
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                    >
                        <Edit size={16} />
                        Edit
                    </button>


                    <button
                        onClick={() =>
                            onDelete(
                                restaurant.id
                            )
                        }
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50"
                    >
                        <Trash2 size={16} />
                        Delete
                    </button>


                </div>

            </div>

        </div>
    );
};

export default OwnerRestaurantCard;
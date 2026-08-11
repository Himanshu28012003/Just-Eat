import { Link } from "react-router-dom";
import {
    Flame,
    Percent,
    TrendingUp,
} from "lucide-react";

const DiscoveryCard = ({
    item,
    type,
}) => {

    const getIcon = () => {

        if (type === "special") {
            return <Flame size={16} />;
        }

        if (type === "deal") {
            return <Percent size={16} />;
        }

        return <TrendingUp size={16} />;
    };


    const getLabel = () => {

        if (type === "special") {
            return "Today's Special";
        }

        if (type === "deal") {
            return "Deal of the Day";
        }

        return "Mostly Ordered";
    };


    return (
        <Link
            to={`/restaurants/${item.restaurantId}`}
            className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
        >

            {/* Image */}

            <div className="relative h-52 overflow-hidden bg-gray-100">

                {item.imageUrl ? (

                    <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />

                ) : (

                    <div className="flex h-full items-center justify-center text-gray-400">
                        No Image
                    </div>

                )}


                {/* Badge */}

                <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-orange-600 shadow">

                    {getIcon()}

                    {getLabel()}

                </div>

            </div>


            {/* Content */}

            <div className="p-5">

                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    {item.restaurantName}
                </p>

                <h3 className="mt-1 text-lg font-bold text-gray-900">
                    {item.name}
                </h3>

                <p className="mt-2 line-clamp-2 text-sm text-gray-500">
                    {item.description ||
                        "Delicious food prepared fresh for you."}
                </p>


                <div className="mt-4 flex items-center justify-between">

                    <span className="text-lg font-bold text-gray-900">
                        ₹
                        {Number(
                            item.price || 0
                        ).toFixed(2)}
                    </span>

                    <span className="text-sm font-medium text-orange-500">
                        View Menu →
                    </span>

                </div>

            </div>

        </Link>
    );
};

export default DiscoveryCard;
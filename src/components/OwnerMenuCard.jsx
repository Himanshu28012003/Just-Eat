import {
    Edit,
    Trash2,
    Flame,
} from "lucide-react";

const OwnerMenuCard = ({
    item,
    onEdit,
    onDelete,
    onAvailabilityChange,
    onSpecialChange,
}) => {

    return (
        <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">

            <div className="relative h-48 bg-gray-100">

                {item.imageUrl ? (

                    <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="h-full w-full object-cover"
                    />

                ) : (

                    <div className="flex h-full items-center justify-center text-gray-400">
                        No Image
                    </div>

                )}

            </div>


            <div className="p-5">

                <div className="flex items-start justify-between gap-3">

                    <div>

                        <h3 className="text-lg font-bold">
                            {item.name}
                        </h3>

                        <p className="mt-1 text-sm text-orange-500">
                            {item.category}
                        </p>

                    </div>

                    <p className="text-lg font-bold">
                        ₹{Number(item.price).toFixed(2)}
                    </p>

                </div>


                <p className="mt-3 line-clamp-2 text-sm text-gray-500">
                    {item.description}
                </p>


                {/* Availability */}

                <div className="mt-5 flex items-center justify-between border-t pt-4">

                    <span className="text-sm font-medium">
                        Available
                    </span>

                    <button
                        type="button"
                        onClick={() =>
                            onAvailabilityChange(
                                item
                            )
                        }
                        className={`relative h-6 w-11 rounded-full transition ${
                            item.available
                                ? "bg-green-500"
                                : "bg-gray-300"
                        }`}
                    >

                        <span
                            className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                                item.available
                                    ? "left-6"
                                    : "left-1"
                            }`}
                        />

                    </button>

                </div>


                {/* Special */}

                <button
                    type="button"
                    onClick={() =>
                        onSpecialChange(item)
                    }
                    className={`mt-3 flex w-full items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium ${
                        item.todaySpecial
                            ? "border-orange-300 bg-orange-50 text-orange-600"
                            : "text-gray-600"
                    }`}
                >

                    <Flame size={17} />

                    {item.todaySpecial
                        ? "Today's Special"
                        : "Mark Today's Special"}

                </button>


                {/* Actions */}

                <div className="mt-4 flex gap-3">

                    <button
                        onClick={() =>
                            onEdit(item)
                        }
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold"
                    >
                        <Edit size={16} />
                        Edit
                    </button>

                    <button
                        onClick={() =>
                            onDelete(item.id)
                        }
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-red-200 text-red-600"
                    >
                        <Trash2 size={16} />
                        Delete
                    </button>

                </div>

            </div>

        </div>
    );
};

export default OwnerMenuCard;
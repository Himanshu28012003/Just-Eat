import {
  Plus,
  Flame,
} from "lucide-react";

const MenuItemCard = ({
  item,
  onAddToCart,
  adding = false,
}) => {

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm transition hover:shadow-md">

      {/* Image */}

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

        {item.todaySpecial && (
          <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white">
            <Flame size={13} />
            Today's Special
          </div>
        )}

      </div>

      {/* Content */}

      <div className="p-4">

        <div className="flex items-start justify-between gap-3">

          <h3 className="font-semibold text-gray-900">
            {item.name}
          </h3>

          {item.category && (
            <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-500">
              {item.category}
            </span>
          )}

        </div>

        <p className="mt-2 line-clamp-2 text-sm text-gray-500">
          {item.description ||
            "Delicious food prepared fresh for you."}
        </p>

        <div className="mt-4 flex items-center justify-between">

          <span className="text-lg font-bold">
            ₹{Number(item.price).toFixed(2)}
          </span>

          <button
            onClick={() => onAddToCart(item)}
            disabled={
              item.available === false || adding
            }
            className="flex items-center gap-1 rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            <Plus size={17} />

            {adding
              ? "Adding..."
              : item.available === false
                ? "Unavailable"
                : "Add"}
          </button>

        </div>

      </div>

    </div>
  );
};

export default MenuItemCard;
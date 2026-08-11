import {
    Clock,
    MapPin,
    Package,
    User,
} from "lucide-react";

const statusStyles = {
    PENDING:
        "bg-yellow-50 text-yellow-700 border-yellow-200",

    PREPARING:
        "bg-blue-50 text-blue-700 border-blue-200",

    READY:
        "bg-purple-50 text-purple-700 border-purple-200",

    COMPLETED:
        "bg-green-50 text-green-700 border-green-200",

    CANCELLED:
        "bg-red-50 text-red-700 border-red-200",
};


const OwnerOrderCard = ({
    order,
    onStatusChange,
    updating,
}) => {

    const status =
        order.status || "PENDING";

    return (
        <div className="rounded-2xl border bg-white p-6 shadow-sm">

            {/* =====================================================
                HEADER
            ===================================================== */}

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>

                    <div className="flex items-center gap-2">

                        <Package
                            size={19}
                            className="text-orange-500"
                        />

                        <h2 className="font-bold">
                            Order #{order.orderId}
                        </h2>

                    </div>

                    {order.createdAt && (

                        <p className="mt-1 text-xs text-gray-400">
                            {new Date(
                                order.createdAt
                            ).toLocaleString()}
                        </p>

                    )}

                </div>


                <span
                    className={`w-fit rounded-full border px-3 py-1 text-xs font-semibold ${
                        statusStyles[status] ||
                        "bg-gray-50 text-gray-600 border-gray-200"
                    }`}
                >
                    {status}
                </span>

            </div>


            {/* =====================================================
                CUSTOMER
            ===================================================== */}

            <div className="mt-5 grid gap-3 border-t pt-5 sm:grid-cols-2">

                <div className="flex items-center gap-2 text-sm text-gray-600">

                    <User
                        size={17}
                        className="text-gray-400"
                    />

                    <span>
                        {order.customerName ||
                            order.username ||
                            "Customer"}
                    </span>

                </div>


                <div className="flex items-start gap-2 text-sm text-gray-600">

                    <MapPin
                        size={17}
                        className="mt-0.5 text-gray-400"
                    />

                    <span>
                        {order.deliveryAddress ||
                            "No delivery address"}
                    </span>

                </div>

            </div>


            {/* =====================================================
                ITEMS
            ===================================================== */}

            <div className="mt-5 border-t pt-5">

                <div className="space-y-3">

                    {(order.items || []).map(
                        (item, index) => (

                            <div
                                key={
                                    item.orderItemId ||
                                    item.id ||
                                    index
                                }
                                className="flex items-center justify-between gap-4 text-sm"
                            >

                                <div>

                                    <span className="font-medium">
                                        {item.quantity} ×{" "}
                                        {item.menuItemName ||
                                            item.itemName ||
                                            item.name}
                                    </span>

                                </div>


                                <span className="font-semibold">

                                    ₹
                                    {(
                                        Number(
                                            item.price || 0
                                        ) *
                                        Number(
                                            item.quantity || 0
                                        )
                                    ).toFixed(2)}

                                </span>

                            </div>

                        )
                    )}

                </div>

            </div>


            {/* =====================================================
                TOTAL
            ===================================================== */}

            <div className="mt-5 flex items-center justify-between border-t pt-5">

                <span className="text-gray-500">
                    Order Total
                </span>

                <span className="text-xl font-bold">
                    ₹
                    {Number(
                        order.totalAmount || 0
                    ).toFixed(2)}
                </span>

            </div>


            {/* =====================================================
                STATUS UPDATE
            ===================================================== */}

            {status !== "COMPLETED" &&
                status !== "CANCELLED" && (

                    <div className="mt-5 border-t pt-5">

                        <label className="mb-2 block text-sm font-medium">
                            Update Order Status
                        </label>

                        <select
                            value={status}
                            disabled={updating}
                            onChange={(e) =>
                                onStatusChange(
                                    order.orderId,
                                    e.target.value
                                )
                            }
                            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-orange-500"
                        >

                            <option value="PENDING">
                                Pending
                            </option>

                            <option value="PREPARING">
                                Preparing
                            </option>

                            <option value="READY">
                                Ready
                            </option>

                            <option value="COMPLETED">
                                Completed
                            </option>

                        </select>

                        {updating && (

                            <p className="mt-2 flex items-center gap-2 text-xs text-gray-400">

                                <Clock size={14} />

                                Updating order status...

                            </p>

                        )}

                    </div>

                )}

        </div>
    );
};

export default OwnerOrderCard;
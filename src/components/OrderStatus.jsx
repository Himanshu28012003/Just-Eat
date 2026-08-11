import {
    CheckCircle2,
    Circle,
    Clock3,
    CookingPot,
    PackageCheck,
    XCircle,
} from "lucide-react";

const statuses = [
    {
        value: "PENDING",
        label: "Order Placed",
        icon: Clock3,
    },
    {
        value: "PREPARING",
        label: "Preparing",
        icon: CookingPot,
    },
    {
        value: "READY",
        label: "Ready",
        icon: PackageCheck,
    },
    {
        value: "COMPLETED",
        label: "Completed",
        icon: CheckCircle2,
    },
];

const OrderStatus = ({ status }) => {

    const isCancelled =
        status === "CANCELLED";

    if (isCancelled) {

        return (
            <div className="rounded-xl border border-red-200 bg-red-50 p-5">

                <div className="flex items-center gap-3 text-red-600">

                    <XCircle size={25} />

                    <div>
                        <p className="font-bold">
                            Order Cancelled
                        </p>

                        <p className="text-sm text-red-500">
                            This order has been cancelled.
                        </p>
                    </div>

                </div>

            </div>
        );
    }

    const currentIndex =
        statuses.findIndex(
            (item) => item.value === status
        );

    return (
        <div className="rounded-xl border bg-white p-5">

            <div className="flex items-center justify-between">

                {statuses.map(
                    (item, index) => {

                        const Icon = item.icon;

                        const completed =
                            index <= currentIndex;

                        return (
                            <div
                                key={item.value}
                                className="flex flex-1 items-center"
                            >

                                <div className="flex flex-col items-center">

                                    <div
                                        className={`flex h-10 w-10 items-center justify-center rounded-full ${
                                            completed
                                                ? "bg-orange-500 text-white"
                                                : "bg-gray-100 text-gray-400"
                                        }`}
                                    >

                                        {completed ? (
                                            <Icon size={19} />
                                        ) : (
                                            <Circle size={18} />
                                        )}

                                    </div>

                                    <span
                                        className={`mt-2 hidden text-xs font-medium sm:block ${
                                            completed
                                                ? "text-orange-600"
                                                : "text-gray-400"
                                        }`}
                                    >
                                        {item.label}
                                    </span>

                                </div>

                                {index <
                                    statuses.length - 1 && (
                                    <div
                                        className={`mx-2 h-1 flex-1 rounded ${
                                            index <
                                            currentIndex
                                                ? "bg-orange-500"
                                                : "bg-gray-200"
                                        }`}
                                    />
                                )}

                            </div>
                        );
                    }
                )}

            </div>

            <p className="mt-5 text-center text-sm text-gray-500">

                Current status:{" "}

                <span className="font-semibold text-gray-900">
                    {status}
                </span>

            </p>

        </div>
    );
};

export default OrderStatus;
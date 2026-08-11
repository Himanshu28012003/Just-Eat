import {
    CheckCircle,
    Package,
    ArrowRight,
} from "lucide-react";

import {
    Link,
    useLocation,
} from "react-router-dom";

const OrderConfirmation = () => {

    const location = useLocation();

    const order =
        location.state?.order;


    return (

        <main className="min-h-screen bg-gray-50 px-4 py-12">

            <div className="mx-auto max-w-xl rounded-2xl border bg-white p-10 text-center">

                <CheckCircle
                    size={70}
                    className="mx-auto text-green-500"
                />


                <h1 className="mt-6 text-3xl font-bold">
                    Order Placed!
                </h1>


                <p className="mt-3 text-gray-500">
                    Your order has been successfully
                    placed.
                </p>


                {order?.orderId && (

                    <div className="mt-6 rounded-xl bg-gray-50 p-5">

                        <p className="text-sm text-gray-500">
                            Order ID
                        </p>

                        <p className="mt-1 text-xl font-bold">
                            #{order.orderId}
                        </p>

                    </div>

                )}


                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">

                    <Link
                        to="/orders"
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600"
                    >
                        <Package size={18} />
                        View My Orders
                    </Link>


                    <Link
                        to="/restaurants"
                        className="inline-flex items-center justify-center gap-2 rounded-lg border px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50"
                    >
                        Order More
                        <ArrowRight size={18} />
                    </Link>

                </div>

            </div>

        </main>
    );
};

export default OrderConfirmation;
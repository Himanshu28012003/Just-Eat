import { Link } from "react-router-dom";
import { ShieldX } from "lucide-react";

const Unauthorized = () => {

    return (
        <main className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-gray-50 px-4">

            <div className="max-w-md text-center">

                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100 text-red-500">

                    <ShieldX size={40} />

                </div>

                <h1 className="mt-6 text-3xl font-bold text-gray-900">
                    Access Denied
                </h1>

                <p className="mt-3 text-gray-500">
                    You don't have permission to access
                    this page.
                </p>

                <Link
                    to="/"
                    className="mt-7 inline-block rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600"
                >
                    Go Home
                </Link>

            </div>

        </main>
    );
};

export default Unauthorized;
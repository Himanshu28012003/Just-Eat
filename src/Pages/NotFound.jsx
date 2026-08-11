import { Link } from "react-router-dom";
import { SearchX } from "lucide-react";

const NotFound = () => {

    return (
        <main className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-gray-50 px-4">

            <div className="max-w-md text-center">

                <div className="text-8xl font-black text-orange-500">
                    404
                </div>

                <div className="mx-auto mt-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-orange-500">

                    <SearchX size={32} />

                </div>

                <h1 className="mt-5 text-2xl font-bold">
                    Page Not Found
                </h1>

                <p className="mt-2 text-gray-500">
                    The page you're looking for doesn't
                    exist or has been moved.
                </p>

                <Link
                    to="/"
                    className="mt-7 inline-block rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600"
                >
                    Back to Home
                </Link>

            </div>

        </main>
    );
};

export default NotFound;
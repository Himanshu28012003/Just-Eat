import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import {
    ShoppingCart,
    User,
    LogOut,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { getCart } from "../services/cartService";


const Navbar = () => {

    const {
        isAuthenticated,
        user,
        logout,
    } = useAuth();

    const navigate = useNavigate();

    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const refresh = () => {
            if (isAuthenticated && user?.role === "CUSTOMER") {
                getCart()
                    .then((data) => setCartCount(data?.items?.length ?? 0))
                    .catch(() => {});
            } else {
                setCartCount(0);
            }
        };

        refresh();
        window.addEventListener("cart:updated", refresh);
        return () => window.removeEventListener("cart:updated", refresh);
    }, [isAuthenticated, user?.role]);


    // =========================================================
    // LOGOUT
    // =========================================================

    const handleLogout = () => {

        logout();

        navigate("/login");
    };


    return (

        <nav className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">

            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">

                {/* =================================================
                    LOGO
                ================================================= */}

                <Link
                    to="/"
                    className="text-2xl font-bold text-orange-500"
                >
                    JustEat
                </Link>


                {/* =================================================
                    MAIN NAVIGATION
                ================================================= */}

                <div className="hidden items-center gap-8 md:flex">

                    <Link
                        to="/"
                        className="text-gray-700 transition hover:text-orange-500"
                    >
                        Home
                    </Link>


                    {/* =================================================
                        CUSTOMER NAVIGATION
                    ================================================= */}

                    {isAuthenticated &&
                        user?.role === "CUSTOMER" && (
                            <>

                                <Link
                                    to="/restaurants"
                                    className="text-gray-700 transition hover:text-orange-500"
                                >
                                    Restaurants
                                </Link>


                                <Link
                                    to="/favorites"
                                    className="text-gray-700 transition hover:text-orange-500"
                                >
                                    Favorites
                                </Link>


                                <Link
                                    to="/orders"
                                    className="text-gray-700 transition hover:text-orange-500"
                                >
                                    Orders
                                </Link>


                                <Link
                                    to="/preferences"
                                    className="text-gray-700 transition hover:text-orange-500"
                                >
                                    Preferences
                                </Link>

                            </>
                        )}


                    {/* =================================================
                        OWNER NAVIGATION
                    ================================================= */}

                    {isAuthenticated &&
                        user?.role === "OWNER" && (
                            <>

                                <Link
                                    to="/owner/dashboard"
                                    className="text-gray-700 transition hover:text-orange-500"
                                >
                                    Dashboard
                                </Link>


                                <Link
                                    to="/owner/restaurants"
                                    className="text-gray-700 transition hover:text-orange-500"
                                >
                                    Restaurants
                                </Link>

                            </>
                        )}

                </div>


                {/* =================================================
                    RIGHT SIDE
                ================================================= */}

                <div className="flex items-center gap-4">

                    {isAuthenticated ? (

                        <>

                            {/* =================================================
                                CUSTOMER CART
                            ================================================= */}

                            {user?.role === "CUSTOMER" && (

                                <Link
                                    to="/cart"
                                    className="relative rounded-full p-2 hover:bg-gray-100"
                                    title="Cart"
                                >

                                    <ShoppingCart
                                        size={21}
                                    />

                                    {cartCount > 0 && (
                                        <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white">
                                            {cartCount > 9 ? "9+" : cartCount}
                                        </span>
                                    )}

                                </Link>

                            )}


                            {/* =================================================
                                CUSTOMER PROFILE
                            ================================================= */}

                            {user?.role === "CUSTOMER" && (

                                <Link
                                    to="/profile"
                                    className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-100"
                                >

                                    <User
                                        size={20}
                                    />

                                    <span className="hidden sm:block">
                                        {user?.username || "Profile"}
                                    </span>

                                </Link>

                            )}


                            {/* =================================================
                                OWNER USER
                            ================================================= */}

                            {user?.role === "OWNER" && (

                                <div
                                    className="flex items-center gap-2 rounded-lg px-3 py-2"
                                >

                                    <User
                                        size={20}
                                    />

                                    <span className="hidden sm:block">
                                        {user?.username || "Owner"}
                                    </span>

                                </div>

                            )}


                            {/* =================================================
                                LOGOUT
                            ================================================= */}

                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100"
                            >

                                <LogOut
                                    size={19}
                                />

                                <span className="hidden sm:block">
                                    Logout
                                </span>

                            </button>

                        </>

                    ) : (

                        /* =================================================
                           NOT AUTHENTICATED
                        ================================================= */

                        <>

                            <Link
                                to="/login"
                                className="rounded-lg px-4 py-2 font-medium text-gray-700 hover:bg-gray-100"
                            >
                                Login
                            </Link>


                            <Link
                                to="/register"
                                className="rounded-lg bg-orange-500 px-4 py-2 font-medium text-white hover:bg-orange-600"
                            >
                                Register
                            </Link>

                        </>

                    )}

                </div>

            </div>

        </nav>
    );
};


export default Navbar;
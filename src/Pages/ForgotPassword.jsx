import { useState } from "react";
import { Link } from "react-router-dom";

import api from "../services/api";

const ForgotPassword = () => {

    const [email, setEmail] = useState("");

    const [message, setMessage] = useState("");

    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);


    // =========================================================
    // HANDLE EMAIL CHANGE
    // =========================================================

    const handleChange = (e) => {

        setEmail(e.target.value);

    };


    // =========================================================
    // SEND RESET LINK
    // =========================================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setMessage("");
        setError("");
        setLoading(true);

        try {

            const response = await api.post(
                "/auth/forgot-password",
                {
                    email: email.trim(),
                }
            );

            setMessage(
                typeof response.data === "string"
                    ? response.data
                    : "Password reset link has been sent to your email."
            );

            setEmail("");

        } catch (error) {

            setError(
                error.response?.data?.message ||
                error.response?.data ||
                "Unable to send password reset link."
            );

        } finally {

            setLoading(false);
        }
    };


    return (

        <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-gray-50 px-4">

            <div className="w-full max-w-md rounded-2xl border bg-white p-8 shadow-sm">

                {/* =================================================
                    HEADER
                ================================================= */}

                <h1 className="text-3xl font-bold text-gray-900">
                    Forgot Password?
                </h1>

                <p className="mt-2 text-gray-500">
                    Enter your registered email and we'll
                    send you a password reset link.
                </p>


                {/* =================================================
                    SUCCESS MESSAGE
                ================================================= */}

                {message && (

                    <div className="mt-5 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700">
                        {message}
                    </div>

                )}


                {/* =================================================
                    ERROR MESSAGE
                ================================================= */}

                {error && (

                    <div className="mt-5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                        {error}
                    </div>

                )}


                {/* =================================================
                    FORM
                ================================================= */}

                <form
                    onSubmit={handleSubmit}
                    className="mt-7 space-y-5"
                >

                    {/* EMAIL */}

                    <div>

                        <label
                            htmlFor="email"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>

                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            required
                            autoComplete="email"
                            placeholder="Enter your email"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                        />

                    </div>


                    {/* SUBMIT */}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
                    >

                        {loading
                            ? "Sending..."
                            : "Send Reset Link"}

                    </button>

                </form>


                {/* =================================================
                    BACK TO LOGIN
                ================================================= */}

                <p className="mt-6 text-center text-sm text-gray-600">

                    Remember your password?{" "}

                    <Link
                        to="/login"
                        className="font-semibold text-orange-500 hover:text-orange-600"
                    >
                        Back to Login
                    </Link>

                </p>

            </div>

        </div>
    );
};

export default ForgotPassword;
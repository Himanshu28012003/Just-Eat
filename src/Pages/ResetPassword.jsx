import { useState } from "react";
import {
    Link,
    useNavigate,
    useSearchParams,
} from "react-router-dom";

import api from "../services/api";

const ResetPassword = () => {

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    // Token comes from:
    // /reset-password?token=ABC123
    const token = searchParams.get("token");


    const [form, setForm] = useState({
        newPassword: "",
        confirmPassword: "",
    });


    const [message, setMessage] = useState("");

    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);


    // =========================================================
    // HANDLE INPUT CHANGE
    // =========================================================

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

    };


    // =========================================================
    // RESET PASSWORD
    // =========================================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setMessage("");
        setError("");


        // =====================================================
        // CHECK TOKEN
        // =====================================================

        if (!token) {

            setError(
                "Invalid or missing password reset link."
            );

            return;
        }


        // =====================================================
        // CHECK PASSWORD MATCH
        // =====================================================

        if (
            form.newPassword !==
            form.confirmPassword
        ) {

            setError(
                "Passwords do not match."
            );

            return;
        }


        // =====================================================
        // PASSWORD LENGTH
        // =====================================================

        if (form.newPassword.length < 6) {

            setError(
                "Password must be at least 6 characters."
            );

            return;
        }


        try {

            setLoading(true);


            // =================================================
            // CALL BACKEND
            // =================================================

            const response = await api.post(
                "/auth/reset-password",
                {
                    token: token,
                    newPassword: form.newPassword,
                }
            );


            setMessage(
                typeof response.data === "string"
                    ? response.data
                    : "Password reset successfully."
            );


            // Clear password fields
            setForm({
                newPassword: "",
                confirmPassword: "",
            });


            // =================================================
            // REDIRECT TO LOGIN
            // =================================================

            setTimeout(() => {

                navigate("/login");

            }, 1500);


        } catch (error) {

            setError(
                error.response?.data?.message ||
                error.response?.data ||
                "Unable to reset password. The reset link may have expired."
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
                    Reset Password
                </h1>

                <p className="mt-2 text-gray-500">
                    Create a new password for your JustEat account.
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

                    {/* NEW PASSWORD */}

                    <div>

                        <label
                            htmlFor="newPassword"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            New Password
                        </label>

                        <input
                            id="newPassword"
                            type="password"
                            name="newPassword"
                            value={form.newPassword}
                            onChange={handleChange}
                            required
                            minLength={6}
                            autoComplete="new-password"
                            placeholder="Enter new password"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                        />

                    </div>


                    {/* CONFIRM PASSWORD */}

                    <div>

                        <label
                            htmlFor="confirmPassword"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Confirm Password
                        </label>

                        <input
                            id="confirmPassword"
                            type="password"
                            name="confirmPassword"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            required
                            minLength={6}
                            autoComplete="new-password"
                            placeholder="Confirm new password"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                        />

                    </div>


                    {/* SUBMIT */}

                    <button
                        type="submit"
                        disabled={loading || !token}
                        className="w-full rounded-lg bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
                    >

                        {loading
                            ? "Resetting..."
                            : "Reset Password"}

                    </button>

                </form>


                {/* =================================================
                    LOGIN LINK
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

export default ResetPassword;
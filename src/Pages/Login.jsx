import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const Login = () => {

    const navigate = useNavigate();
    const { login } = useAuth();

    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setLoading(true);

        try {

            const response = await api.post(
                "/auth/login",
                form
            );

            login(response.data);

            if (response.data.role === "OWNER") {
                navigate("/owner/dashboard");
            } else {
                navigate("/");
            }

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Invalid username or password"
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gray-50 px-4">

            <div className="w-full max-w-md rounded-2xl border bg-white p-8 shadow-sm">

                <h1 className="text-3xl font-bold">
                    Welcome back
                </h1>

                <p className="mt-2 text-gray-500">
                    Login to your JustEat account
                </p>

                {error && (
                    <div className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                        {error}
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="mt-7 space-y-5"
                >

                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Username
                        </label>

                        <input
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                            placeholder="Enter username"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                            placeholder="Enter password"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-orange-500 py-3 font-semibold text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                    <Link
                        to="/forgot-password"
                        className="text-sm font-medium text-orange-500 hover:text-orange-600"
                    >
                        Forgot password?
                    </Link>

                </form>

                <p className="mt-6 text-center text-sm text-gray-600">

                    Don't have an account?{" "}

                    <Link
                        to="/register"
                        className="font-semibold text-orange-500 hover:text-orange-600"
                    >
                        Register
                    </Link>

                </p>

            </div>

        </div>
    );
};

export default Login;
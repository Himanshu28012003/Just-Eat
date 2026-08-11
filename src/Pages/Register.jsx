import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const Register = () => {

  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    role: "CUSTOMER",
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

      await api.post(
        "/auth/register",
        form
      );

      /*
       * After successful registration,
       * send user to login.
       */
      navigate("/login");

    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Registration failed"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gray-50 px-4 py-10">

      <div className="w-full max-w-lg rounded-2xl border bg-white p-8 shadow-sm">

        <h1 className="text-3xl font-bold">
          Create your account
        </h1>

        <p className="mt-2 text-gray-500">
          Join JustEat today
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
              Full Name
            </label>

            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              required
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              placeholder="Enter your full name"
            />
          </div>

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
              placeholder="Choose a username"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              placeholder="you@example.com"
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
              minLength={6}
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              placeholder="At least 6 characters"
            />
          </div>

          {/* Role */}

          <div>
            <label className="mb-2 block text-sm font-medium">
              Account Type
            </label>

            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
            >
              <option value="CUSTOMER">
                Customer
              </option>

              <option value="OWNER">
                Restaurant Owner
              </option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-orange-500 py-3 font-semibold text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "Creating account..."
              : "Create Account"}
          </button>

        </form>

        <p className="mt-6 text-center text-sm text-gray-600">

          Already have an account?{" "}

          <Link
            to="/login"
            className="font-semibold text-orange-500"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
};

export default Register;
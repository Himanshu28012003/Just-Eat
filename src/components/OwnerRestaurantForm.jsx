import { useEffect, useState } from "react";
import {
    Save,
    X,
} from "lucide-react";

const initialForm = {
    name: "",
    description: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
    email: "",
    cuisine: "",
    openingTime: "",
    closingTime: "",
    imageUrl: "",
};

const OwnerRestaurantForm = ({
    restaurant,
    onSubmit,
    onCancel,
    saving,
}) => {

    const [form, setForm] =
        useState(initialForm);

    useEffect(() => {

        if (restaurant) {

            setForm({
                name: restaurant.name || "",
                description:
                    restaurant.description || "",
                address:
                    restaurant.address || "",
                city:
                    restaurant.city || "",
                state:
                    restaurant.state || "",
                zipCode:
                    restaurant.zipCode || "",
                phone:
                    restaurant.phone || "",
                email:
                    restaurant.email || "",
                cuisine:
                    restaurant.cuisine || "",
                openingTime:
                    restaurant.openingTime || "",
                closingTime:
                    restaurant.closingTime || "",
                imageUrl:
                    restaurant.imageUrl || "",
            });

        } else {

            setForm(initialForm);

        }

    }, [restaurant]);


    const handleChange = (e) => {

        const {
            name,
            value,
        } = e.target;

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));
    };


    const handleSubmit = (e) => {

        e.preventDefault();

        onSubmit(form);
    };


    return (
        <form
            onSubmit={handleSubmit}
            className="rounded-2xl border bg-white p-6 shadow-sm"
        >

            <div className="mb-7 flex items-center justify-between">

                <div>

                    <h2 className="text-xl font-bold">
                        {restaurant
                            ? "Edit Restaurant"
                            : "Add Restaurant"}
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        {restaurant
                            ? "Update your restaurant information."
                            : "Add your restaurant to the platform."}
                    </p>

                </div>

                <button
                    type="button"
                    onClick={onCancel}
                    className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                >
                    <X size={20} />
                </button>

            </div>


            <div className="grid gap-5 md:grid-cols-2">

                {/* Name */}

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Restaurant Name
                    </label>

                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border px-4 py-3 outline-none focus:border-orange-500"
                    />
                </div>


                {/* Cuisine */}

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Cuisine
                    </label>

                    <input
                        name="cuisine"
                        value={form.cuisine}
                        onChange={handleChange}
                        required
                        placeholder="Indian, Chinese..."
                        className="w-full rounded-lg border px-4 py-3 outline-none focus:border-orange-500"
                    />
                </div>


                {/* Email */}

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
                        className="w-full rounded-lg border px-4 py-3 outline-none focus:border-orange-500"
                    />
                </div>


                {/* Phone */}

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Phone
                    </label>

                    <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border px-4 py-3 outline-none focus:border-orange-500"
                    />
                </div>


                {/* Address */}

                <div className="md:col-span-2">

                    <label className="mb-2 block text-sm font-medium">
                        Address
                    </label>

                    <textarea
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        required
                        rows={3}
                        className="w-full resize-none rounded-lg border px-4 py-3 outline-none focus:border-orange-500"
                    />

                </div>


                {/* City */}

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        City
                    </label>

                    <input
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border px-4 py-3 outline-none focus:border-orange-500"
                    />
                </div>


                {/* State */}

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        State
                    </label>

                    <input
                        name="state"
                        value={form.state}
                        onChange={handleChange}
                        className="w-full rounded-lg border px-4 py-3 outline-none focus:border-orange-500"
                    />
                </div>


                {/* ZIP */}

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        ZIP Code
                    </label>

                    <input
                        name="zipCode"
                        value={form.zipCode}
                        onChange={handleChange}
                        className="w-full rounded-lg border px-4 py-3 outline-none focus:border-orange-500"
                    />
                </div>


                {/* Opening */}

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Opening Time
                    </label>

                    <input
                        type="time"
                        name="openingTime"
                        value={form.openingTime}
                        onChange={handleChange}
                        className="w-full rounded-lg border px-4 py-3 outline-none focus:border-orange-500"
                    />
                </div>


                {/* Closing */}

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Closing Time
                    </label>

                    <input
                        type="time"
                        name="closingTime"
                        value={form.closingTime}
                        onChange={handleChange}
                        className="w-full rounded-lg border px-4 py-3 outline-none focus:border-orange-500"
                    />
                </div>


                {/* Image */}

                <div className="md:col-span-2">

                    <label className="mb-2 block text-sm font-medium">
                        Image URL
                    </label>

                    <input
                        type="url"
                        name="imageUrl"
                        value={form.imageUrl}
                        onChange={handleChange}
                        placeholder="https://example.com/restaurant.jpg"
                        className="w-full rounded-lg border px-4 py-3 outline-none focus:border-orange-500"
                    />

                </div>


                {/* Description */}

                <div className="md:col-span-2">

                    <label className="mb-2 block text-sm font-medium">
                        Description
                    </label>

                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        rows={4}
                        className="w-full resize-none rounded-lg border px-4 py-3 outline-none focus:border-orange-500"
                    />

                </div>

            </div>


            <div className="mt-7 flex justify-end gap-3">

                <button
                    type="button"
                    onClick={onCancel}
                    className="rounded-lg border px-5 py-3 font-medium text-gray-600 hover:bg-gray-50"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    disabled={saving}
                    className="flex items-center gap-2 rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600 disabled:opacity-60"
                >

                    <Save size={18} />

                    {saving
                        ? "Saving..."
                        : restaurant
                            ? "Update Restaurant"
                            : "Create Restaurant"}

                </button>

            </div>

        </form>
    );
};

export default OwnerRestaurantForm;
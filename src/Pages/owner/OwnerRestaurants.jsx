import { useEffect, useState } from "react";
import {
    Plus,
    Store,
} from "lucide-react";

import {
    getMyRestaurants,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant,
} from "../../services/ownerRestaurantService";

import OwnerRestaurantCard
    from "../../components/OwnerRestaurantCard";

import OwnerRestaurantForm
    from "../../components/OwnerRestaurantForm";

import Loading from "../../components/Loading";


const OwnerRestaurants = () => {

    const [restaurants, setRestaurants] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [saving, setSaving] =
        useState(false);

    const [error, setError] =
        useState("");

    const [success, setSuccess] =
        useState("");

    const [showForm, setShowForm] =
        useState(false);

    const [editingRestaurant, setEditingRestaurant] =
        useState(null);


    // =========================================================
    // LOAD OWNER RESTAURANTS
    // =========================================================

    const loadRestaurants = async () => {

        try {

            setLoading(true);
            setError("");

            const data =
                await getMyRestaurants();

            setRestaurants(
                Array.isArray(data)
                    ? data
                    : data.content || []
            );

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Unable to load your restaurants."
            );

        } finally {

            setLoading(false);
        }
    };


    useEffect(() => {

        loadRestaurants();

    }, []);


    // =========================================================
    // CREATE / UPDATE
    // =========================================================

    const handleSubmit = async (formData) => {

        try {

            setSaving(true);
            setError("");
            setSuccess("");

            if (editingRestaurant) {

                const updated =
                    await updateRestaurant(
                        editingRestaurant.id,
                        formData
                    );

                setRestaurants((previous) =>
                    previous.map((restaurant) =>
                        restaurant.id ===
                        editingRestaurant.id
                            ? updated
                            : restaurant
                    )
                );

                setSuccess(
                    "Restaurant updated successfully."
                );

            } else {

                const created =
                    await createRestaurant(
                        formData
                    );

                setRestaurants((previous) => [
                    ...previous,
                    created,
                ]);

                setSuccess(
                    "Restaurant created successfully."
                );
            }

            setShowForm(false);
            setEditingRestaurant(null);

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Unable to save restaurant."
            );

        } finally {

            setSaving(false);
        }
    };


    // =========================================================
    // EDIT
    // =========================================================

    const handleEdit = (restaurant) => {

        setEditingRestaurant(
            restaurant
        );

        setShowForm(true);

        setError("");
        setSuccess("");
    };


    // =========================================================
    // DELETE
    // =========================================================

    const handleDelete = async (restaurantId) => {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this restaurant?"
            );

        if (!confirmed) {
            return;
        }

        try {

            setError("");
            setSuccess("");

            await deleteRestaurant(
                restaurantId
            );

            setRestaurants(
                (previous) =>
                    previous.filter(
                        (restaurant) =>
                            restaurant.id !==
                            restaurantId
                    )
            );

            setSuccess(
                "Restaurant deleted successfully."
            );

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Unable to delete restaurant."
            );
        }
    };


    // =========================================================
    // CANCEL FORM
    // =========================================================

    const handleCancel = () => {

        setShowForm(false);
        setEditingRestaurant(null);
    };


    // =========================================================
    // LOADING
    // =========================================================

    if (loading) {
        return <Loading />;
    }


    return (

        <main className="min-h-screen bg-gray-50">

            <div className="mx-auto max-w-7xl px-4 py-10">

                {/* HEADER */}

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    <div>

                        <div className="flex items-center gap-3">

                            <Store
                                size={28}
                                className="text-orange-500"
                            />

                            <h1 className="text-3xl font-bold">
                                My Restaurants
                            </h1>

                        </div>

                        <p className="mt-2 text-gray-500">
                            Manage your restaurants and
                            restaurant information.
                        </p>

                    </div>


                    {!showForm && (

                        <button
                            onClick={() => {
                                setEditingRestaurant(
                                    null
                                );

                                setShowForm(true);

                                setError("");
                                setSuccess("");
                            }}
                            className="flex items-center justify-center gap-2 rounded-lg bg-orange-500 px-5 py-3 font-semibold text-white hover:bg-orange-600"
                        >

                            <Plus size={19} />

                            Add Restaurant

                        </button>

                    )}

                </div>


                {/* ERROR */}

                {error && (

                    <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                        {error}
                    </div>

                )}


                {/* SUCCESS */}

                {success && (

                    <div className="mt-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-600">
                        {success}
                    </div>

                )}


                {/* FORM */}

                {showForm && (

                    <div className="mt-8">

                        <OwnerRestaurantForm
                            restaurant={
                                editingRestaurant
                            }
                            onSubmit={
                                handleSubmit
                            }
                            onCancel={
                                handleCancel
                            }
                            saving={saving}
                        />

                    </div>

                )}


                {/* RESTAURANTS */}

                {!showForm &&
                    restaurants.length === 0 && (

                        <div className="mt-10 rounded-2xl border bg-white p-12 text-center">

                            <Store
                                size={55}
                                className="mx-auto text-gray-300"
                            />

                            <h2 className="mt-5 text-xl font-bold">
                                No restaurants yet
                            </h2>

                            <p className="mt-2 text-gray-500">
                                Create your first restaurant
                                to start managing your menu
                                and orders.
                            </p>

                            <button
                                onClick={() => {
                                    setShowForm(true);
                                    setEditingRestaurant(
                                        null
                                    );
                                }}
                                className="mt-6 rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white"
                            >
                                Add Restaurant
                            </button>

                        </div>
                    )}


                {!showForm &&
                    restaurants.length > 0 && (

                        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                            {restaurants.map(
                                (restaurant) => (

                                    <OwnerRestaurantCard
                                        key={
                                            restaurant.id
                                        }
                                        restaurant={
                                            restaurant
                                        }
                                        onEdit={
                                            handleEdit
                                        }
                                        onDelete={
                                            handleDelete
                                        }
                                    />

                                )
                            )}

                        </div>
                    )}

            </div>

        </main>
    );
};

export default OwnerRestaurants;
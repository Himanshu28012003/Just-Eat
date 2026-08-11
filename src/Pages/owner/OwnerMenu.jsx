import { useEffect, useState } from "react";
import {
    ArrowLeft,
    Plus,
    Utensils,
} from "lucide-react";

import {
    Link,
    useParams,
} from "react-router-dom";

import {
    getRestaurantMenu,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
    updateMenuItemAvailability,
    updateTodaySpecial,
} from "../../services/ownerMenuService";

import OwnerMenuCard
    from "../../components/OwnerMenuCard";

import OwnerMenuForm
    from "../../components/OwnerMenuForm";

import Loading
    from "../../components/Loading";


const OwnerMenu = () => {

    const { restaurantId } =
        useParams();

    const [items, setItems] =
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

    const [editingItem, setEditingItem] =
        useState(null);


    // =========================================================
    // LOAD MENU
    // =========================================================

    const loadMenu = async () => {

        try {

            setLoading(true);
            setError("");

            const data =
                await getRestaurantMenu(
                    restaurantId
                );

            setItems(
                Array.isArray(data)
                    ? data
                    : data.content || []
            );

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Unable to load menu."
            );

        } finally {

            setLoading(false);
        }
    };


    useEffect(() => {

        loadMenu();

    }, [restaurantId]);


    // =========================================================
    // CREATE / UPDATE
    // =========================================================

    const handleSubmit = async (data) => {

        try {

            setSaving(true);
            setError("");
            setSuccess("");

            if (editingItem) {

                const updated =
                    await updateMenuItem(
                        editingItem.id,
                        data
                    );

                setItems((previous) =>
                    previous.map((item) =>
                        item.id ===
                        editingItem.id
                            ? updated
                            : item
                    )
                );

                setSuccess(
                    "Menu item updated successfully."
                );

            } else {

                const created =
                    await createMenuItem(
                        restaurantId,
                        data
                    );

                setItems((previous) => [
                    ...previous,
                    created,
                ]);

                setSuccess(
                    "Menu item added successfully."
                );
            }

            setShowForm(false);
            setEditingItem(null);

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Unable to save menu item."
            );

        } finally {

            setSaving(false);
        }
    };


    // =========================================================
    // DELETE
    // =========================================================

    const handleDelete = async (itemId) => {

        if (
            !window.confirm(
                "Delete this menu item?"
            )
        ) {
            return;
        }

        try {

            setError("");
            setSuccess("");

            await deleteMenuItem(
                itemId
            );

            setItems((previous) =>
                previous.filter(
                    (item) =>
                        item.id !== itemId
                )
            );

            setSuccess(
                "Menu item deleted successfully."
            );

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Unable to delete menu item."
            );
        }
    };


    // =========================================================
    // AVAILABILITY
    // =========================================================

    const handleAvailability =
        async (item) => {

            try {

                const updated =
                    await updateMenuItemAvailability(
                        item.id,
                        !item.available
                    );

                setItems((previous) =>
                    previous.map((current) =>
                        current.id === item.id
                            ? updated
                            : current
                    )
                );

            } catch (error) {

                setError(
                    error.response?.data?.message ||
                    "Unable to update availability."
                );
            }
        };


    // =========================================================
    // TODAY'S SPECIAL
    // =========================================================

    const handleSpecial =
        async (item) => {

            try {

                const updated =
                    await updateTodaySpecial(
                        item.id,
                        !item.todaySpecial
                    );

                setItems((previous) =>
                    previous.map((current) =>
                        current.id === item.id
                            ? updated
                            : current
                    )
                );

            } catch (error) {

                setError(
                    error.response?.data?.message ||
                    "Unable to update today's special."
                );
            }
        };


    if (loading) {
        return <Loading />;
    }


    return (
        <main className="min-h-screen bg-gray-50">

            <div className="mx-auto max-w-7xl px-4 py-10">

                {/* Header */}

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    <div>

                        <Link
                            to="/owner/restaurants"
                            className="mb-4 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-orange-500"
                        >
                            <ArrowLeft size={16} />
                            Back to Restaurants
                        </Link>

                        <div className="flex items-center gap-3">

                            <Utensils
                                size={28}
                                className="text-orange-500"
                            />

                            <h1 className="text-3xl font-bold">
                                Restaurant Menu
                            </h1>

                        </div>

                        <p className="mt-2 text-gray-500">
                            Manage your menu items, availability,
                            specials and deals.
                        </p>

                    </div>


                    {!showForm && (

                        <button
                            onClick={() => {
                                setEditingItem(null);
                                setShowForm(true);
                                setError("");
                            }}
                            className="flex items-center justify-center gap-2 rounded-lg bg-orange-500 px-5 py-3 font-semibold text-white hover:bg-orange-600"
                        >

                            <Plus size={19} />

                            Add Menu Item

                        </button>

                    )}

                </div>


                {/* Messages */}

                {error && (

                    <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                        {error}
                    </div>

                )}

                {success && (

                    <div className="mt-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-600">
                        {success}
                    </div>

                )}


                {/* Form */}

                {showForm && (

                    <div className="mt-8">

                        <OwnerMenuForm
                            menuItem={editingItem}
                            onSubmit={handleSubmit}
                            onCancel={() => {
                                setShowForm(false);
                                setEditingItem(null);
                            }}
                            saving={saving}
                        />

                    </div>

                )}


                {/* Empty */}

                {!showForm &&
                    items.length === 0 && (

                        <div className="mt-10 rounded-2xl border bg-white p-12 text-center">

                            <Utensils
                                size={55}
                                className="mx-auto text-gray-300"
                            />

                            <h2 className="mt-5 text-xl font-bold">
                                No menu items
                            </h2>

                            <p className="mt-2 text-gray-500">
                                Add your first menu item.
                            </p>

                        </div>
                    )}


                {/* Items */}

                {!showForm &&
                    items.length > 0 && (

                        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                            {items.map((item) => (

                                <OwnerMenuCard
                                    key={item.id}
                                    item={item}
                                    onEdit={(selected) => {
                                        setEditingItem(
                                            selected
                                        );
                                        setShowForm(true);
                                    }}
                                    onDelete={
                                        handleDelete
                                    }
                                    onAvailabilityChange={
                                        handleAvailability
                                    }
                                    onSpecialChange={
                                        handleSpecial
                                    }
                                />

                            ))}

                        </div>
                    )}

            </div>

        </main>
    );
};

export default OwnerMenu;
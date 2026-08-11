import { useEffect, useState } from "react";
import {
    Check,
    Heart,
    Save,
    Utensils,
    LoaderCircle,
} from "lucide-react";

import {
    getMyPreferences,
    updateMyPreferences,
} from "../services/customerPreferenceService";

import Loading from "../components/Loading";


// =========================================================
// AVAILABLE OPTIONS
// =========================================================

const cuisineOptions = [
    "Indian",
    "Chinese",
    "Italian",
    "Mexican",
    "Thai",
    "South Indian",
    "North Indian",
    "Fast Food",
    "Desserts",
    "Biryani",
];

const dietaryOptions = [
    "Vegetarian",
    "Vegan",
    "Jain",
    "Gluten Free",
    "High Protein",
];


const Preferences = () => {

    // =========================================================
    // STATE
    // =========================================================

    const [preferredCuisines, setPreferredCuisines] =
        useState("");

    const [dietaryRestrictions, setDietaryRestrictions] =
        useState("");

    const [loading, setLoading] =
        useState(true);

    const [saving, setSaving] =
        useState(false);

    const [error, setError] =
        useState("");

    const [success, setSuccess] =
        useState("");


    // =========================================================
    // LOAD PREFERENCES
    // =========================================================

    useEffect(() => {

        const loadPreferences = async () => {

            try {

                setLoading(true);
                setError("");

                const data =
                    await getMyPreferences();

                setPreferredCuisines(
                    data.preferredCuisines || ""
                );

                setDietaryRestrictions(
                    data.dietaryRestrictions || ""
                );

            } catch (error) {

                /*
                 * A missing preference record is not treated
                 * as a fatal page error. The user can simply
                 * create their preferences.
                 */

                if (
                    error.response?.status !== 404
                ) {

                    setError(
                        error.response?.data?.message ||
                        "Unable to load preferences."
                    );
                }

            } finally {

                setLoading(false);
            }
        };

        loadPreferences();

    }, []);


    // =========================================================
    // CUISINE TOGGLE
    // =========================================================

    const toggleCuisine = (cuisine) => {

        const current =
            preferredCuisines
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean);

        if (current.includes(cuisine)) {

            const updated =
                current.filter(
                    (item) =>
                        item !== cuisine
                );

            setPreferredCuisines(
                updated.join(", ")
            );

        } else {

            setPreferredCuisines(
                [...current, cuisine].join(", ")
            );
        }

        setSuccess("");
    };


    // =========================================================
    // DIETARY TOGGLE
    // =========================================================

    const toggleDietary = (restriction) => {

        const current =
            dietaryRestrictions
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean);

        if (current.includes(restriction)) {

            const updated =
                current.filter(
                    (item) =>
                        item !== restriction
                );

            setDietaryRestrictions(
                updated.join(", ")
            );

        } else {

            setDietaryRestrictions(
                [
                    ...current,
                    restriction,
                ].join(", ")
            );
        }

        setSuccess("");
    };


    // =========================================================
    // CHECK SELECTED
    // =========================================================

    const isCuisineSelected = (cuisine) => {

        return preferredCuisines
            .split(",")
            .map((item) => item.trim())
            .includes(cuisine);
    };


    const isDietarySelected = (restriction) => {

        return dietaryRestrictions
            .split(",")
            .map((item) => item.trim())
            .includes(restriction);
    };


    // =========================================================
    // SAVE
    // =========================================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setSaving(true);
            setError("");
            setSuccess("");

            await updateMyPreferences({
                preferredCuisines,
                dietaryRestrictions,
            });

            setSuccess(
                "Preferences saved successfully."
            );

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Unable to save preferences."
            );

        } finally {

            setSaving(false);
        }
    };


    // =========================================================
    // LOADING
    // =========================================================

    if (loading) {
        return <Loading />;
    }


    return (

        <main className="min-h-screen bg-gray-50">

            <div className="mx-auto max-w-4xl px-4 py-10">

                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="mb-8">

                    <div className="flex items-center gap-3">

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100 text-orange-500">

                            <Heart size={22} />

                        </div>

                        <div>

                            <h1 className="text-3xl font-bold text-gray-900">
                                My Preferences
                            </h1>

                            <p className="mt-1 text-gray-500">
                                Tell us what food you like so
                                we can personalize your experience.
                            </p>

                        </div>

                    </div>

                </div>


                {/* =================================================
                    ERROR
                ================================================= */}

                {error && (

                    <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                        {error}
                    </div>

                )}


                {/* =================================================
                    SUCCESS
                ================================================= */}

                {success && (

                    <div className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-600">
                        {success}
                    </div>

                )}


                <form
                    onSubmit={handleSubmit}
                    className="space-y-7"
                >

                    {/* =================================================
                        CUISINES
                    ================================================= */}

                    <section className="rounded-2xl border bg-white p-6 md:p-8">

                        <div className="flex items-start gap-4">

                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500">

                                <Utensils size={20} />

                            </div>

                            <div>

                                <h2 className="text-xl font-bold">
                                    Favorite Cuisines
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    Select the cuisines you
                                    enjoy the most.
                                </p>

                            </div>

                        </div>


                        <div className="mt-7 flex flex-wrap gap-3">

                            {cuisineOptions.map(
                                (cuisine) => {

                                    const selected =
                                        isCuisineSelected(
                                            cuisine
                                        );

                                    return (

                                        <button
                                            type="button"
                                            key={cuisine}
                                            onClick={() =>
                                                toggleCuisine(
                                                    cuisine
                                                )
                                            }
                                            className={`flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition ${
                                                selected
                                                    ? "border-orange-500 bg-orange-500 text-white"
                                                    : "border-gray-200 bg-white text-gray-600 hover:border-orange-300 hover:text-orange-500"
                                            }`}
                                        >

                                            {selected && (
                                                <Check
                                                    size={16}
                                                />
                                            )}

                                            {cuisine}

                                        </button>

                                    );
                                }
                            )}

                        </div>


                        <div className="mt-6">

                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Selected cuisines
                            </label>

                            <input
                                value={
                                    preferredCuisines
                                }
                                onChange={(e) =>
                                    setPreferredCuisines(
                                        e.target.value
                                    )
                                }
                                placeholder="e.g. Indian, Chinese, Italian"
                                className="w-full rounded-lg border px-4 py-3 outline-none focus:border-orange-500"
                            />

                            <p className="mt-2 text-xs text-gray-400">
                                Separate multiple cuisines
                                with commas.
                            </p>

                        </div>

                    </section>


                    {/* =================================================
                        DIETARY
                    ================================================= */}

                    <section className="rounded-2xl border bg-white p-6 md:p-8">

                        <div>

                            <h2 className="text-xl font-bold">
                                Dietary Preferences
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                Select any dietary preferences
                                that should influence recommendations.
                            </p>

                        </div>


                        <div className="mt-7 flex flex-wrap gap-3">

                            {dietaryOptions.map(
                                (restriction) => {

                                    const selected =
                                        isDietarySelected(
                                            restriction
                                        );

                                    return (

                                        <button
                                            type="button"
                                            key={restriction}
                                            onClick={() =>
                                                toggleDietary(
                                                    restriction
                                                )
                                            }
                                            className={`flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition ${
                                                selected
                                                    ? "border-green-500 bg-green-500 text-white"
                                                    : "border-gray-200 bg-white text-gray-600 hover:border-green-300 hover:text-green-600"
                                            }`}
                                        >

                                            {selected && (
                                                <Check
                                                    size={16}
                                                />
                                            )}

                                            {restriction}

                                        </button>

                                    );
                                }
                            )}

                        </div>


                        <div className="mt-6">

                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Selected dietary preferences
                            </label>

                            <input
                                value={
                                    dietaryRestrictions
                                }
                                onChange={(e) =>
                                    setDietaryRestrictions(
                                        e.target.value
                                    )
                                }
                                placeholder="e.g. Vegetarian, Jain"
                                className="w-full rounded-lg border px-4 py-3 outline-none focus:border-orange-500"
                            />

                            <p className="mt-2 text-xs text-gray-400">
                                Separate multiple preferences
                                with commas.
                            </p>

                        </div>

                    </section>


                    {/* =================================================
                        SAVE BUTTON
                    ================================================= */}

                    <div className="flex justify-end">

                        <button
                            type="submit"
                            disabled={saving}
                            className="flex items-center gap-2 rounded-lg bg-orange-500 px-7 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
                        >

                            {saving ? (

                                <>
                                    <LoaderCircle
                                        size={18}
                                        className="animate-spin"
                                    />

                                    Saving...

                                </>

                            ) : (

                                <>
                                    <Save size={18} />

                                    Save Preferences

                                </>

                            )}

                        </button>

                    </div>

                </form>

            </div>

        </main>
    );
};

export default Preferences;
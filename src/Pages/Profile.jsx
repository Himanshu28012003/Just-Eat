import { useEffect, useState } from "react";
import {
    User,
    Mail,
    Phone,
    MapPin,
    Save,
    Camera,
    LoaderCircle,
} from "lucide-react";

import {
    getMyProfile,
    updateMyProfile,
} from "../services/customerProfileService";

import Loading from "../components/Loading";


const Profile = () => {

    // =========================================================
    // PROFILE STATE
    // =========================================================

    const [profile, setProfile] =
        useState(null);

    const [form, setForm] = useState({
        phone: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        imageUrl: "",
    });

    // =========================================================
    // UI STATE
    // =========================================================

    const [loading, setLoading] =
        useState(true);

    const [saving, setSaving] =
        useState(false);

    const [error, setError] =
        useState("");

    const [success, setSuccess] =
        useState("");


    // =========================================================
    // LOAD PROFILE
    // =========================================================

    const loadProfile = async () => {

        try {

            setLoading(true);
            setError("");

            const data =
                await getMyProfile();

            setProfile(data);

            setForm({
                phone: data.phone || "",
                address: data.address || "",
                city: data.city || "",
                state: data.state || "",
                zipCode: data.zipCode || "",
                imageUrl: data.imageUrl || "",
            });

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Unable to load your profile."
            );

        } finally {

            setLoading(false);
        }
    };


    useEffect(() => {

        loadProfile();

    }, []);


    // =========================================================
    // HANDLE INPUT
    // =========================================================

    const handleChange = (e) => {

        const {
            name,
            value,
        } = e.target;

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));

        setSuccess("");
        setError("");
    };


    // =========================================================
    // UPDATE PROFILE
    // =========================================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setSaving(true);
            setError("");
            setSuccess("");

            const updatedProfile =
                await updateMyProfile(form);

            setProfile(
                updatedProfile
            );

            setForm({
                phone:
                    updatedProfile.phone || "",
                address:
                    updatedProfile.address || "",
                city:
                    updatedProfile.city || "",
                state:
                    updatedProfile.state || "",
                zipCode:
                    updatedProfile.zipCode || "",
                imageUrl:
                    updatedProfile.imageUrl || "",
            });

            setSuccess(
                "Profile updated successfully."
            );

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Unable to update profile."
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

            <div className="mx-auto max-w-5xl px-4 py-10">

                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="mb-8">

                    <h1 className="text-3xl font-bold text-gray-900">
                        My Profile
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Manage your personal information
                        and delivery details.
                    </p>

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


                <div className="grid gap-7 lg:grid-cols-3">


                    {/* =================================================
                        PROFILE CARD
                    ================================================= */}

                    <div className="h-fit rounded-2xl border bg-white p-6">

                        <div className="flex flex-col items-center">

                            {/* Profile image */}

                            <div className="relative">

                                <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-orange-100">

                                    {form.imageUrl ? (

                                        <img
                                            src={form.imageUrl}
                                            alt="Profile"
                                            className="h-full w-full object-cover"
                                        />

                                    ) : (

                                        <User
                                            size={48}
                                            className="text-orange-500"
                                        />

                                    )}

                                </div>


                                <div className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-orange-500 text-white">

                                    <Camera size={17} />

                                </div>

                            </div>


                            <h2 className="mt-5 text-xl font-bold">
                                {profile?.fullName ||
                                    profile?.username}
                            </h2>


                            <p className="mt-1 text-sm text-gray-500">
                                @{profile?.username}
                            </p>


                            <div className="mt-5 flex items-center gap-2 text-sm text-gray-500">

                                <Mail size={16} />

                                {profile?.email}

                            </div>

                        </div>

                    </div>


                    {/* =================================================
                        EDIT PROFILE
                    ================================================= */}

                    <div className="lg:col-span-2">

                        <form
                            onSubmit={handleSubmit}
                            className="rounded-2xl border bg-white p-6 md:p-8"
                        >

                            <div className="mb-7">

                                <h2 className="text-xl font-bold">
                                    Personal Information
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    Update your contact and
                                    delivery information.
                                </p>

                            </div>


                            {/* =================================================
                                USERNAME / EMAIL
                            ================================================= */}

                            <div className="grid gap-5 sm:grid-cols-2">

                                <div>

                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Username
                                    </label>

                                    <div className="flex items-center gap-3 rounded-lg border bg-gray-50 px-4 py-3">

                                        <User
                                            size={18}
                                            className="text-gray-400"
                                        />

                                        <input
                                            value={
                                                profile?.username ||
                                                ""
                                            }
                                            disabled
                                            className="w-full bg-transparent text-gray-500 outline-none"
                                        />

                                    </div>

                                </div>


                                <div>

                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Email
                                    </label>

                                    <div className="flex items-center gap-3 rounded-lg border bg-gray-50 px-4 py-3">

                                        <Mail
                                            size={18}
                                            className="text-gray-400"
                                        />

                                        <input
                                            value={
                                                profile?.email ||
                                                ""
                                            }
                                            disabled
                                            className="w-full bg-transparent text-gray-500 outline-none"
                                        />

                                    </div>

                                </div>

                            </div>


                            {/* =================================================
                                PHONE
                            ================================================= */}

                            <div className="mt-5">

                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Phone Number
                                </label>

                                <div className="flex items-center gap-3 rounded-lg border px-4 py-3 focus-within:border-orange-500">

                                    <Phone
                                        size={18}
                                        className="text-gray-400"
                                    />

                                    <input
                                        type="tel"
                                        name="phone"
                                        value={
                                            form.phone
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="Enter phone number"
                                        className="w-full outline-none"
                                    />

                                </div>

                            </div>


                            {/* =================================================
                                ADDRESS
                            ================================================= */}

                            <div className="mt-5">

                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Address
                                </label>

                                <div className="flex items-start gap-3 rounded-lg border px-4 py-3 focus-within:border-orange-500">

                                    <MapPin
                                        size={18}
                                        className="mt-1 text-gray-400"
                                    />

                                    <textarea
                                        name="address"
                                        value={
                                            form.address
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        rows={3}
                                        placeholder="Enter your complete address"
                                        className="w-full resize-none outline-none"
                                    />

                                </div>

                            </div>


                            {/* =================================================
                                CITY / STATE / ZIP
                            ================================================= */}

                            <div className="mt-5 grid gap-5 sm:grid-cols-3">

                                <div>

                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        City
                                    </label>

                                    <input
                                        type="text"
                                        name="city"
                                        value={
                                            form.city
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="City"
                                        className="w-full rounded-lg border px-4 py-3 outline-none focus:border-orange-500"
                                    />

                                </div>


                                <div>

                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        State
                                    </label>

                                    <input
                                        type="text"
                                        name="state"
                                        value={
                                            form.state
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="State"
                                        className="w-full rounded-lg border px-4 py-3 outline-none focus:border-orange-500"
                                    />

                                </div>


                                <div>

                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        ZIP Code
                                    </label>

                                    <input
                                        type="text"
                                        name="zipCode"
                                        value={
                                            form.zipCode
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="ZIP Code"
                                        className="w-full rounded-lg border px-4 py-3 outline-none focus:border-orange-500"
                                    />

                                </div>

                            </div>


                            {/* =================================================
                                IMAGE URL
                            ================================================= */}

                            <div className="mt-5">

                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Profile Image URL
                                </label>

                                <input
                                    type="url"
                                    name="imageUrl"
                                    value={
                                        form.imageUrl
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="https://example.com/profile.jpg"
                                    className="w-full rounded-lg border px-4 py-3 outline-none focus:border-orange-500"
                                />

                            </div>


                            {/* =================================================
                                SAVE
                            ================================================= */}

                            <div className="mt-8 flex justify-end">

                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="flex items-center gap-2 rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
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

                                            Save Changes
                                        </>
                                    )}

                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            </div>

        </main>
    );
};

export default Profile;
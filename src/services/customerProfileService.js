import api from "./api";

// =========================================================
// GET MY PROFILE
// =========================================================

export const getMyProfile = async () => {
    const response = await api.get(
        "/customer/profile"
    );

    return response.data;
};


// =========================================================
// UPDATE MY PROFILE
// =========================================================

export const updateMyProfile = async (profileData) => {
    const response = await api.put(
        "/customer/profile",
        profileData
    );

    return response.data;
};
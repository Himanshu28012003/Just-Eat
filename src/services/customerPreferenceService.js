import api from "./api";

// =========================================================
// GET CUSTOMER PREFERENCES
// =========================================================

export const getMyPreferences = async () => {
    const response = await api.get(
        "/customer/preferences"
    );

    return response.data;
};


// =========================================================
// UPDATE CUSTOMER PREFERENCES
// =========================================================

export const updateMyPreferences = async (
    preferenceData
) => {
    const response = await api.put(
        "/customer/preferences",
        preferenceData
    );

    return response.data;
};


export const getRecommendations = async () => {
    const response = await api.get(
        "/customer/recommendations"
    );

    const data = response.data;
    return Array.isArray(data) ? data : (data?.content || []);
};
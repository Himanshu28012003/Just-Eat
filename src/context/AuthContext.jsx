import {
    createContext,
    useContext,
    useState,
} from "react";

const AuthContext = createContext(null);


export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(() => {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");
        // Clear both if either is missing or user has no role (stale/broken state)
        if (!storedToken || !storedUser) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            return null;
        }
        try {
            const parsed = JSON.parse(storedUser);
            if (!parsed?.role) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                return null;
            }
            return storedToken;
        } catch {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            return null;
        }
    });


    const [user, setUser] = useState(() => {

        const storedUser =
            localStorage.getItem("user");

        if (!storedUser) {
            return null;
        }

        try {

            return JSON.parse(storedUser);

        } catch (error) {

            localStorage.removeItem("user");

            return null;
        }

    });


    // =========================================================
    // LOGIN
    // =========================================================

    const login = (loginResponse) => {

        // backend returns flat { token, role, username, ... }
        const { token, ...user } = loginResponse;

        localStorage.setItem(
            "token",
            token
        );

        localStorage.setItem(
            "user",
            JSON.stringify(user)
        );

        setToken(token);
        setUser(user);
    };


    // =========================================================
    // LOGOUT
    // =========================================================

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setToken(null);
        setUser(null);
    };


    return (

        <AuthContext.Provider
            value={{
                token,
                user,
                login,
                logout,
                isAuthenticated: !!token,
            }}
        >
            {children}
        </AuthContext.Provider>

    );
};


export const useAuth = () =>
    useContext(AuthContext);
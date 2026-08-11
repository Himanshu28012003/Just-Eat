import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({
    children,
    allowedRoles = [],
}) => {

    const {
        isAuthenticated,
        user,
    } = useAuth();

    const location = useLocation();


    // =========================================================
    // NOT LOGGED IN
    // =========================================================

    if (!isAuthenticated) {

        return (
            <Navigate
                to="/login"
                replace
                state={{
                    from: location.pathname,
                }}
            />
        );
    }


    // =========================================================
    // ROLE CHECK
    // =========================================================

    if (
        allowedRoles.length > 0 &&
        !allowedRoles.includes(user?.role)
    ) {

        return (
            <Navigate
                to="/unauthorized"
                replace
            />
        );
    }


    return children;
};

export default ProtectedRoute;
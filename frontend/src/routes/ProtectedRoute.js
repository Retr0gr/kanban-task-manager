import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../utilities/authProvider";

export const ProtectedRoute = () => {
    const { token } = useAuth();
    const userRole = localStorage.getItem("role");
    if (!token) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
};
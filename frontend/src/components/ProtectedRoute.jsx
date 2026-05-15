import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { isAuth, cliente, loading } = useAuth();

    console.log("ProtectedRoute state:", { isAuth, cliente, loading });

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isAuth) {
        return <Navigate to="/login" />;
    }

    if (allowedRoles && !allowedRoles.includes(cliente.rol)) {
        return <Navigate to="/unauthorized" />;
    }

    return children;
};

export default ProtectedRoute;
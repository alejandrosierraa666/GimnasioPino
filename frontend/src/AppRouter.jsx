import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Master from "./pages/Master";
import Unauthorized from "./pages/Unauthorized";

import useAuth from "./hooks/useAuth";
import ProtectedRoute from "./components/ProtectedRoute";

function AppRouter() {

    const { isAuth, loading } = useAuth();

    if (loading) return <div>Loading...</div>;

    return (

        <Routes>

            <Route
                path="/"
                element={
                    isAuth
                        ? <Navigate to="/dashboard" />
                        : <Navigate to="/login" />
                }
            />

            <Route
                path="/login"
                element={
                    isAuth
                        ? <Navigate to="/dashboard" />
                        : <Login />
                }
            />

            {/* CLIENTE */}
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute
                        allowedRoles={[3, 2, 1]}
                    >
                        <Home />
                    </ProtectedRoute>
                }
            />

            {/* ADMIN */}
            <Route
                path="/admin"
                element={
                    <ProtectedRoute
                        allowedRoles={[2, 1]}
                    >
                        <Admin />
                    </ProtectedRoute>
                }
            />

            {/* MASTER */}
            <Route
                path="/master"
                element={
                    <ProtectedRoute
                        allowedRoles={[1]}
                    >
                        <Master />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/unauthorized"
                element={<Unauthorized />}
            />

            <Route
                path="*"
                element={
                    isAuth
                        ? <Navigate to="/dashboard" />
                        : <Navigate to="/login" />
                }
            />

        </Routes>
    );
}

export default AppRouter;
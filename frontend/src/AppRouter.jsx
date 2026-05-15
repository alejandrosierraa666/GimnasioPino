import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext.jsx";
import useAuth from "./hooks/useAuth";

function AppRouter() {
    const { isAuth } = useAuth();

    return (
        <Routes>
            <Route path="/" element={isAuth ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={isAuth ? <Home /> : <Navigate to="/login" />} />
            <Route path="*" element={isAuth ? <Home /> : <Navigate to="/login" />} />
        </Routes>
    );
}

export default AppRouter;
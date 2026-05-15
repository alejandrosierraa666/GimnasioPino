import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);
    const [cliente, setCliente] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loginData, setLoginData] = useState({
        email: '',
        contrasenna: '',
    });

    axios.defaults.baseURL = 'http://localhost:3000';
    axios.defaults.withCredentials = true;

    const checkAuth = async () => {
        try {
            const me = await axios.get('/apiolympo/clientes/me');
            console.log("🔍 /me response:", me.data);
            setCliente(me.data.cliente);
            setIsAuth(true);
        } catch (error) {
            console.log("❌ checkAuth error:", error.response?.status, error.response?.data);
            setIsAuth(false);
            setCliente(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuth, setIsAuth, loginData, setLoginData, setCliente, cliente, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);
    const [cliente, setCliente] = useState(null);
    const [loginData, setLoginData] = useState({
        email: '',
        contrasenna: '',
    });

    axios.defaults.baseURL = 'http://localhost:3000';
    axios.defaults.withCredentials = true;

    const checkAuth = async () => {
        try {
            const res = await axios.get('/apiolympo/clientes/me');
            setCliente(res.data.cliente);
            setIsAuth(true);
        } catch (error) {
            setIsAuth(false);
            setCliente(null);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuth, setIsAuth, loginData, setLoginData, setCliente }}>
            {children}
        </AuthContext.Provider>
    );
}

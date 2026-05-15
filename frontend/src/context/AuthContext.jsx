import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);
    const [loginData, setLoginData] = useState({
        email: '',
        contrasenna: '',
    });

    return (
        <AuthContext.Provider value={{ isAuth, setIsAuth, loginData, setLoginData }}>
            {children}
        </AuthContext.Provider>
    );
}

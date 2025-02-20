import { createContext, useState, useEffect } from "react";
import { getCurrentUser, logout } from "../utils/localStorage";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        setUser(getCurrentUser());
    }, []);

    const handleLogin = (userData) => {
        setUser(userData); // User-Status im Context setzen
    };

    const handleLogout = () => {
        logout();
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, setUser, handleLogin, handleLogout }}>
            {children}
        </UserContext.Provider>
    );
};
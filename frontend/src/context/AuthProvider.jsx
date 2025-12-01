import { useState } from "react";
import AuthContext from "./AuthContext";

export const AuthProvider = ({ children }) => {
    // Lazy initialization from localStorage
    const [user, setUser] = useState(() => {
        const token = localStorage.getItem("token");
        return token ? { token } : null;
    });

    const loginUser = (token) => {
        localStorage.setItem("token", token);
        setUser({ token });
    };

    const logoutUser = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
};

// src/components/PublicRoute.jsx
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const PublicRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    return !user ? children : <Navigate to="/" replace />;
};

export default PublicRoute;

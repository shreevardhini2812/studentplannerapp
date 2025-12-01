// src/components/Header.jsx
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function Header() {
    const { user, logoutUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutUser();
        navigate("/login");
    };

    if (!user) return null; // Hide header if not logged in

    return (
        <header className="md:flex md:flex-row md:justify-between h-15 bg-orange-400 items-center p-2">
            <nav className="md:flex md:flex-row md:justify-between md:w-full items-center">
                <Link to="/" className="text-white">Dashboard</Link>
                <Link to="/timetable" className="text-white">Timetable</Link>
                <Link to="/assignments" className="text-white">Assignments</Link>
                <Link to="/pomodoro" className="text-white">Pomodoro</Link>
                <button className="bg-orange-300 rounded text-black"
                    onClick={handleLogout} 
                    style={{ marginLeft: "20px", padding: "5px 10px", cursor: "pointer" }}
                >
                    Logout
                </button>
            </nav>
        </header>
    );
}

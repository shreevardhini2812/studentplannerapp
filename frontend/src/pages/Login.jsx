// src/pages/Login.jsx
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";
import AuthContext from "../context/AuthContext";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { loginUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post("/auth/login", { email, password });
            loginUser(res.data.token);
            navigate("/");
        } catch (err) {
            console.error(err.response?.data.msg || err.message);
        }
    };

    return (
        <div>
            <h1 className="md:bg-orange-300 h-20 text-4xl md:pl-120 p-5 sm:text-2xl">Student Planner App</h1>
            <h2 className="text-3xl pt-15 md:pl-150 p-5">Login</h2>
            <form className="flex flex-col gap-10 w-90 pt-10 md:relative md:left-115 h-90 bg-orange-200 p-5" onSubmit={handleSubmit}>
                <input className="border p-2 "
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input className="border p-2 "
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button className="cursor-pointer bg-orange-300 p-2 rounded" type="submit">Login</button>
                <p className="p-2">
                Don't have an account? <Link to="/register" className="text-bold">Register here</Link>
            </p>
            </form>
            
        </div>
    );
}

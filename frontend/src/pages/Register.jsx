// src/pages/Register.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post("/auth/register", { email, password });
            navigate("/login");
        } catch (err) {
            console.error(err.response?.data.msg || err.message);
        }
    };

    return (
        <div>
            <h1 className="md:bg-orange-300 h-20 text-4xl md:pl-120 p-5">Student Planner App</h1>
            <h2 className="text-3xl pt-15 md:pl-150 p-5">Register</h2>
            <form className="flex flex-col gap-10 w-90 pt-10 md:relative md:left-115 h-90 bg-orange-200 p-5" onSubmit={handleSubmit}>
                <input className="border p-2"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input className="border p-2"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button className="cursor-pointer bg-orange-300 p-2 rounded" type="submit">Register</button>
                <p className="p-2">
                Already have an account? <Link to="/login">Login here</Link>
            </p>
            </form>
            
        </div>
    );
}

// src/pages/Dashboard.jsx
import Header from "../components/Header";

export default function Dashboard() {
    return (
        <div>
            <Header />
            <div className="md:relative md:top-30">
                <h1 className="md:text-4xl md:pl-110 p-3 font-bold">Welcome to Your <span className="text-orange-400">Dashboard</span></h1>
                <p className="md:text-2xl md:pl-70 p-10">Use the navigation above to access your timetable, assignments, and Pomodoro timer.</p>
            </div>
        </div>
    );
}

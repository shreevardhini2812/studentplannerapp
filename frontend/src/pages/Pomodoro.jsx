// src/pages/Pomodoro.jsx
import { useState, useEffect } from "react";
import Header from "../components/Header";

export default function Pomodoro() {
    const [time, setTime] = useState(60 * 60);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let timer;
        if (isRunning) {
            timer = setInterval(() => {
                setTime((prev) => (prev > 0 ? prev - 1 : 0));
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isRunning]);

    const formatTime = (sec) => {
        const m = Math.floor(sec / 60).toString().padStart(2, "0");
        const s = (sec % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
    };

    return (
        <div>
            <Header />
            <div>
                <h2 className="text-3xl p-10 md:pl-150">Pomodoro Timer</h2>
                <h1 className="md:pl-166 p-10 text-4xl">{formatTime(time)}</h1>
                <button className="p-2 w-16 md:relative md:left-156 rounded bg-orange-300 cursor-pointer" onClick={() => setIsRunning(!isRunning)} style={{ marginRight: "10px" }}>
                    {isRunning ? "Pause" : "Start"}
                </button>
                <button className="p-2 w-16 md:relative md:left-158 rounded bg-orange-300 cursor-pointer" onClick={() => setTime(60 * 60)}>Reset</button>
            </div>
        </div>
    );
}
    
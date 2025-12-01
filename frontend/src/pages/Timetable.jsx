import { useState, useEffect } from "react";
import API from "../api";
import Header from "../components/Header";

export default function Timetable() {
    const [day, setDay] = useState("");
    const [subject, setSubject] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [timetable, setTimetable] = useState([]);

    // Fetch timetable
    useEffect(() => {
        const fetchTimetable = async () => {
            try {
                const res = await API.get("/timetable");
                setTimetable(res.data);
            } catch (err) {
                console.log(err.response?.data || err);
            }
        };
        fetchTimetable();
    }, []);

    const handleDelete = async (id) => {
    try {
        await API.delete(`/timetable/${id}`);
        setTimetable(timetable.filter((t) => t._id !== id));
    } catch (err) {
        console.log("Delete error:", err);
    }
};
    // Add new timetable entry
    const handleAdd = async (e) => {
        e.preventDefault();

        try {
            const res = await API.post("/timetable", {
                day,
                subject,
                startTime,
                endTime,
            });

            setTimetable([...timetable, res.data]);

            // Reset fields
            setDay("");
            setSubject("");
            setStartTime("");
            setEndTime("");
        } catch (err) {
            console.log("Server error", err.response?.data || err);
        }
    };

    return (
        <div>
            <Header />
            <h2 className="text-3xl p-10 md:pl-150">Timetable</h2>

            <form className="bg-orange-300 flex flex-col gap-6 md:w-90 sm:w-50 p-5 md:relative md:left-120" onSubmit={handleAdd}>
                <select className="border p-2" value={day} onChange={(e) => setDay(e.target.value)} required>
                    <option value="">Select Day</option>
                    <option>Monday</option>
                    <option>Tuesday</option>
                    <option>Wednesday</option>
                    <option>Thursday</option>
                    <option>Friday</option>
                    <option>Saturday</option>
                </select>

                <input className="border p-2"
                    type="text"
                    placeholder="Subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                />

                <label>Start Time</label>
                <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    
                    required
                />

                <label>End Time</label>
                <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    required
                />

                <button className="bg-orange-400 cursor-pointer p-2 rounded" type="submit">Add</button>
            </form>

            <div className="w-90 md:relative top-10 md:left-135">
                <div>
    <h3>Your Timetable</h3>

    {timetable.map((item) => (
        <div key={item._id} style={{ marginBottom: "10px" }}>
            {item.day} - {item.subject} ({item.startTime} to {item.endTime})

            <button className="cursor-pointer"
                onClick={() => handleDelete(item._id)}
                style={{ marginLeft: "10px", color: "red" }}
            >
                Delete
            </button>
        </div>
    ))}
</div>
            </div>
        </div>
    );
}

import { useState, useEffect } from "react";
import API from "../api";
import Header from "../components/Header";

export default function Assignments() {
    const [assignments, setAssignments] = useState([]);
    const [title, setTitle] = useState("");
    const [dueDate, setDueDate] = useState("");

    // Fetch assignments
    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const res = await API.get("/assignments");
                setAssignments(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchAssignments();
    }, []);

    const handleDelete = async (id) => {
    try {
        await API.delete(`/assignments/${id}`);
        setAssignments(assignments.filter((a) => a._id !== id));
    } catch (err) {
        console.log(err);
    }
};

    // Add new assignment
    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post("/assignments", { title, dueDate });
            setAssignments([...assignments, res.data]);
            setTitle("");
            setDueDate("");
        } catch (err) {
            console.error(err.response?.data || err.message);
        }
    };

    return (
        <div >
            <Header />
            <h2 className="text-3xl p-10 md:pl-150">Assignments</h2>

            {/* Input form */}
            <form className="bg-orange-300 flex flex-col gap-6 w-90 p-5 md:relative md:left-120" onSubmit={handleAdd}>
                <input className="border p-2"
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <label>Due Date:</label>
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    required
                />
                <button className="bg-orange-400 w-30 p-2 text-white cursor-pointer" type="submit">Add Assignment</button>
            </form>

            {/* List of assignments */}
            <ul className="w-90 md:relative top-10 md:left-130">
                {assignments.map((a) => (
                    <li className="flex flex-row gap-5"
                    key={a._id}>{a.title} - {a.dueDate}
                    <button className="cursor-pointer text-red-700" onClick={() => handleDelete(a._id)}>Delete</button>
                    </li>
                    
                ))}
                
                
            </ul>
            
        </div>
    );
}

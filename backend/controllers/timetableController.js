import Timetable from "../models/Timetable.js";

export const addTimetable = async (req, res) => {
    const { day, subject, startTime, endTime } = req.body;
    try {
        console.log("Request body:", req.body);
        console.log("User ID:", req.user?.id);
        const timetable = new Timetable({ day, subject, startTime, endTime, user: req.user.id });
        await timetable.save();
        res.json(timetable);
    } catch (err) {
        res.status(500).send("Server error");
    }
};

export const getTimetable = async (req, res) => {
    try {
        const timetable = await Timetable.find({ user: req.user.id });
        res.json(timetable);
    } catch (err) {
        res.status(500).send("Server error");
    }
};

export const deleteTimetable = async (req, res) => {
    try {
        await Timetable.findOneAndDelete({ _id: req.params.id, user: req.user.id });
        res.json({ msg: "Deleted successfully" });
    } catch (err) {
        res.status(500).send("Server error");
    }
};

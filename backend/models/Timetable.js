import mongoose from "mongoose";

const TimetableSchema = new mongoose.Schema({
    day: { type: String, required: true },
    subject: String,
    startTime: String,
    endTime: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

export default mongoose.model("Timetable", TimetableSchema);

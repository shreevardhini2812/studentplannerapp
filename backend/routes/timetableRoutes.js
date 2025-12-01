import express from "express";
import { addTimetable, deleteTimetable, getTimetable } from "../controllers/timetableController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/", protect, addTimetable);
router.get("/", protect, getTimetable);
router.delete("/:id", protect, deleteTimetable);


export default router;

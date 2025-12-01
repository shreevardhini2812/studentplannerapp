import express from "express";
import { addAssignment, deleteAssignment, getAssignments } from "../controllers/assignmentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/", protect, addAssignment);
router.get("/", protect, getAssignments);
router.delete("/:id", protect, deleteAssignment);

export default router;

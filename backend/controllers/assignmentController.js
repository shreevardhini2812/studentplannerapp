import Assignment from "../models/Assignment.js";

export const addAssignment = async (req, res) => {
    const { title, description, dueDate } = req.body;
    try {
        const assignment = new Assignment({ title, description, dueDate, user: req.user.id });
        await assignment.save();
        res.json(assignment);
    } catch (err) {
        res.status(500).send("Server error");
    }
};

export const getAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find({ user: req.user.id });
        res.json(assignments);
    } catch (err) {
        res.status(500).send("Server error");
    }
};

export const deleteAssignment = async (req, res) => {
    try {
        await Assignment.findOneAndDelete({ _id: req.params.id, user: req.user.id });
        res.json({ msg: "Assignment deleted" });
    } catch (err) {
        res.status(500).send("Server error");
    }
};

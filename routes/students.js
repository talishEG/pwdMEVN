const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// Create a new student
router.post("/", async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.status(201).json(student);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all students
router.get("/", async (req, res) => {
    const page = parseInt(req.query.page) || 1; // default page 1
    const limit = parseInt(req.query.limit) || 10; // default 10 records per page

    const skip = (page - 1) * limit;

    const [students, total] = await Promise.all([
        Student.find().skip(skip).limit(limit),
        Student.countDocuments()
    ]);
    console.log(students);

    res.json({
        data: students,
        total,
        page,
        lastPage: Math.ceil(total / limit),
    });
});

// Get a single student
router.get("/:id", async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) return res.status(404).json({ error: "Not found" });
        res.json(student);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update student
router.put("/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(student);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete student
router.delete("/:id", async (req, res) => {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Student deleted" });
});

module.exports = router;

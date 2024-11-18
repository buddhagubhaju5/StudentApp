const express = require('express');
const router = express.Router();
const Student = require('../models/student');

// Add Student
router.post('/add', async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.status(201).send(student);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Remove Student
router.delete('/remove/:id', async (req, res) => {
    try {
        await Student.findOneAndDelete({ id: req.params.id });
        res.send('Student removed successfully.');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Modify Student
router.put('/modify/:id', async (req, res) => {
    try {
        const student = await Student.findOneAndUpdate(
            { id: req.params.id },
            req.body,
            { new: true }
        );
        res.send(student);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Course = require('../models/course');

// GET all courses
router.get('/', async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch courses' });
    }
});

// GET a single course by ID (for editing purposes)
router.get('/:id', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.json(course);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch course' });
    }
});

// Add a new course or update an existing one
router.post('/', async (req, res) => {
    try {
        const { name, code } = req.body;

        // Check if course already exists by code
        let course = await Course.findOne({ code });

        if (course) {
            // Update the existing course if found
            course.name = name;
            course.code = code;
        } else {
            // Create a new course if it doesn't exist
            course = new Course({ name, code });
        }

        await course.save();
        res.status(201).json(course);
    } catch (err) {
        res.status(400).json({ error: 'Failed to add or update course' });
    }
});

// Update course by ID (used for editing)
router.put('/:id', async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        res.json(course);
    } catch (err) {
        res.status(400).json({ error: 'Failed to update course' });
    }
});

// Delete a course by ID
router.delete('/:id', async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);

        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        res.json({ message: 'Course deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete course' });
    }
});

module.exports = router;

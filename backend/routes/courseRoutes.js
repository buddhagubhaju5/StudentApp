const express = require('express');
const router = express.Router();
const Course = require('../models/course');

// Add or Modify Course
router.post('/addOrUpdate', async (req, res) => {
    try {
        const course = await Course.findOneAndUpdate(
            { code: req.body.code },
            req.body,
            { upsert: true, new: true }
        );
        res.status(201).send(course);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;

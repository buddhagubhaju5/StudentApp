const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    id: { type: String, required: true, unique: true },
    semester: { type: String, required: true },
    courses: { type: [String], required: true },  // Array of strings for courses
});

module.exports = mongoose.model('Student', studentSchema);

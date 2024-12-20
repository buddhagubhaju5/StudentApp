const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const studentRoutes = require('./routes/studentRoutes');
const courseRoutes = require('./routes/courseRoutes');
const path = require('path'); // Add this line

const app = express();
const PORT = 5000;


// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/students', studentRoutes);
app.use('/courses', courseRoutes);


app.use(express.static(path.join(__dirname, '../frontend')));

// Root route to redirect to the student management page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

// Database Connection
mongoose.connect('mongodb://127.0.0.1:27017/school', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection failed:', err));

// Start the Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

const API_URL = 'http://localhost:5000/students';

document.getElementById('studentForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const student = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        id: document.getElementById('id').value,
        semester: document.getElementById('semester').value,
    };

    const response = await fetch(`${API_URL}/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(student),
    });

    if (response.ok) {
        alert('Student added successfully!');
        // Reload student list (not implemented here for brevity)
    } else {
        alert('Error adding student.');
    }
});

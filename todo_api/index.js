const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let tasks = [];

// GET
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// POST
app.post('/tasks', (req, res) => {
  const { task } = req.body;
  if (task) {
    tasks.push(task);
    res.status(201).json({ message: 'Task added successfully', task });
  } else {
    res.status(400).json({ error: 'Task not provided' });
  }
});

// PUT
app.put('/tasks/:index', (req, res) => {
  const index = req.params.index;
  const { task } = req.body;
  if (index >= 0 && index < tasks.length) {
    if (task) {
      tasks[index] = task;
      res.json({ message: `Task at index ${index} updated successfully`, task });
    } else {
      res.status(400).json({ error: 'Task not provided' });
    }
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

// DELETE
app.delete('/tasks/:index', (req, res) => {
  const index = req.params.index;
  if (index >= 0 && index < tasks.length) {
    tasks.splice(index, 1);
    res.json({ message: `Task at index ${index} deleted successfully` });
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

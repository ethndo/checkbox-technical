import express from 'express';
import ViteExpress from 'vite-express';
import pg from 'pg';

const app = express();
app.use(express.json());

const { Pool } = pg;
const pool = new Pool({
  user: 'edward',
  host: 'localhost',
  database: 'checkbox_db',
  password: '123',
  port: 5432,
});

// Function to determine the status of the card
function calculateStatus(dueDate: Date, createdDate: Date) {
  const dateDifference = dueDate - createdDate;
  const days = dateDifference / (1000 * 60 * 60 * 24);

  if (dueDate < createdDate) {
    return 'Overdue';
  } else if (days <= 7) {
    return 'Due soon';
  } else {
    return 'Not urgent';
  }
}

// Routes
app.get('/tasks', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM tasks ORDER BY created_date DESC');
    res.json(rows);
  } catch (error) {
    console.error('There was an error fetching tasks.', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/add_task', async (req, res) => {
  const { taskName, taskDescription, taskDueDate } = req.body;
  // Check if name and due date were provided
  if (!taskName || !taskDueDate) {
    return res.status(400).json({ error: 'Name and Due Date are required.'});
  }

  const createdDate = new Date();
  const dueDate = new Date(taskDueDate);
  const status = calculateStatus(dueDate, createdDate);

  const query = `
    INSERT INTO tasks (name, description, due_date, created_date, status)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
  try {
    const { rows } = await pool.query(query, [taskName, taskDescription, taskDueDate, createdDate, status]);
    res.status(200).json(rows[0])
  } catch (error) {
    console.error('There was an error adding a new task.', error);
    res.status(500).json({ error: 'Internal server error'});
  }
});

app.put('/edit_task/:id', async (req, res) => {
  const { id } = req.params;
  const { taskName, taskDescription, taskDueDate } = req.body;

  // Check if name and due date were provided
  if (!taskName || !taskDueDate || !id) {
    return res.status(400).json({ error: 'ID, Name and Due Date are required.'});
  }

  // Retrieve the created date of the existing task
  try {
    const existingTaskQuery = `SELECT created_date FROM tasks WHERE id = $1`;
    const existingTask = await pool.query(existingTaskQuery, [id]);

    if (existingTask.rows.length === 0) {
      return res.status(404).json({ error: 'The task was not found.'});
    }

    // Update the status according to the new due date
    const createdDate = existingTask.rows[0].created_date;
    const status = calculateStatus(new Date(taskDueDate), createdDate);

    const editTaskQuery = `
      UPDATE tasks
      SET name = $1, description = $2, due_date = $3, status = $4
      WHERE id = $5
      RETURNING *;
    `;
    const editTask = await pool.query(editTaskQuery, [taskName, taskDescription, taskDueDate, status, id]);
    if (editTask.rows.length === 0) {
      return res.status(404).json({ error: 'The task to be edited cannot be found.'});
    }
    res.json(editTask.rows[0]);
  } catch (error) {
    console.error('There was an error trying to edit the task:', error);
    res.status(500).json({ error: 'Internal server error'});
  }
});

ViteExpress.config({
  // Copy and paste of vite.config.ts just so vite-express does not need to import
  // vite, a devDependency, in runtime
  inlineViteConfig: {
    build: {
      outDir: './dist/client',
    },
  },
});

ViteExpress.listen(app, 3000, () =>
  console.log(`Server is listening on port 3000...`)
);

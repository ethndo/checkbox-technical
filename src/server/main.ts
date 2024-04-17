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

/**
 * calculateStatus: determines the status of the card based on the given creation
 * date and due date.
 * Returns:
 *  - Overdue: the due date is past the created date.
 *  - Due soon: the due date is within 7 days of the created date.
 *  - Not urgent: otherwise.
 */
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
};

/**
 * GET /tasks: retrieves all tasks available in the database in descending order by created date.
 * Returns:
 *  - A JSON list of all tasks.
 * Errors:
 *  - 500: Error adding retrieving the tasks.
 */
app.get('/tasks', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM tasks ORDER BY created_date DESC');
    res.json(rows);
  } catch (error) {
    console.error('There was an error fetching tasks.', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * POST /add_task: adds a new task to the database, with the corresponding status.
 * Body:
 *  - taskName: the name of the task to be added.
 *  - taskDescription: the description of the task to be added.
 *  - taskDueDate: the due date of the task to be added.
 * Returns:
 *  - The new task that has been added.
 * Errors:
 *  - 400: Invalid/missing input.
 *  - 500: Error adding the task.
 */
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

/**
 * PUT /edit_task: edits an existing task and updates the database accordingly.
 * Params:
 *  - id: the id of the respective task in the database.
 * Body:
 *  - taskName: the name of the task to be edited.
 *  - taskDescription: the description of the task to be edited.
 *  - taskDueDate: the due date of the task to be edited.
 * Returns:
 *  - The updated task.
 * Errors:
 *  - 400: Invalid/missing input.
 *  - 404: Task not found in the database.
 *  - 500: Error editing the task.
 */
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
    res.json(editTask.rows[0]);
  } catch (error) {
    console.error('There was an error trying to edit the task:', error);
    res.status(500).json({ error: 'Internal server error'});
  }
});

/**
 * GET /search_tasks: searches and retrieves results from the database based on a search term
 * that matches the name of tasks.
 * Params:
 *  - taskName: the input search string of the task.
 * Returns:
 *  - A JSON list of the matching tasks.
 * Errors:
 *  - 500: Error searching for tasks.
 */
app.get('/search_tasks', async (req, res) => {
  const { taskName } = req.query;

  const searchQuery = `
    SELECT * FROM tasks
    WHERE name ILIKE $1
    ORDER BY name;
  `;

  try {
    const { rows } = await pool.query(searchQuery, [`%${taskName}%`])
    res.json(rows);
  } catch (error) {
    console.error('There was an error trying to search for tasks:', error);
    res.status(500).json({ error: 'Internal server error' });
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

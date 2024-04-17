-- Add your schema initialisation script here if you're on Postgres and not using an ORM

-- Schema for Tasks
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    due_date DATE NOT NULL,
    created_date DATE DEFAULT CURRENT_DATE,
    status VARCHAR(50)
);

-- Index for searching through task names
CREATE INDEX idx_task_name ON tasks USING btree (name);
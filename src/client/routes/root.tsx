import React, { useState, useEffect, ChangeEvent } from 'react';
import { Box, Button, Card, Chip, Container, Dialog, DialogTitle, DialogActions, DialogContent, Fab, FormControl, IconButton, InputLabel, MenuItem, Select, TextField, Tooltip, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const TaskActionButton = ({ title, color, size, IconComponent, onClick }) => {
  return (
    <Tooltip title={title}>
      <Fab color={color} size={size} onClick={onClick}>
        <IconComponent />
      </Fab>
    </Tooltip>
  );
};

const TaskrTitle = () => {
  return (
    <Box>
      <Container align="center">
        <Typography variant="h3" color="primary">Taskr</Typography>
      </Container>
    </Box>
  );
};

const TaskSearchBar = ({ setTasks}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (searchTerm) => {
    fetch(`/search_tasks?taskName=${encodeURIComponent(searchTerm)}`)
    .then(response => response.json())
    .then(data => {
      setTasks(data);
    })
    .catch(error => {
      console.error('There was an error searching for tasks:', error);
    })
  };

  return (
    <TextField
      InputProps={{
        endAdornment: (
          <IconButton size="small" onClick={() => handleSearch(searchTerm)}>
            <SearchIcon />
          </IconButton>
        ),
      }}
      label="Search Tasks"
      size="small"
      name="searchTerm"
      onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
    />
  );
};

const TaskSortSelect = () => {
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel>Sort by</InputLabel>
      <Select label="Sort by">
        <MenuItem>Status</MenuItem>
        <MenuItem>Creation Date</MenuItem>
        <MenuItem>Due Date</MenuItem>
      </Select>
    </FormControl>
  )
};

const TaskEditDialog = ({ currentTask, open, handleClose, handleEdit }) => {
  const [taskName, setTaskName] = useState(currentTask.name);
  const [taskDescription, setTaskDescription] = useState(currentTask.description);
  const [taskDueDate, setTaskDueDate] = useState(new Date(currentTask.due_date).toISOString().slice(0, 10));
  const taskId = currentTask.id;

  const handleEditClick = () => {
    handleEdit({ taskName, taskDescription, taskDueDate, taskId });
    handleClose();
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Task</DialogTitle>
      <DialogContent>
        <TextField
          required
          margin="dense"
          label="Name"
          type="text"
          fullWidth
          variant="standard"
          name="name"
          value={taskName}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setTaskName(e.target.value)}
        />
        <TextField
          margin="dense" 
          label="Description"
          type="text"
          fullWidth
          variant="standard"
          name="description"
          value={taskDescription}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setTaskDescription(e.target.value)}
        />
        <TextField
          required
          margin="dense"
          label="Due Date"
          type="date"
          fullWidth
          variant="standard"
          name="dueDate"
          value={taskDueDate}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setTaskDueDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleEditClick}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

const TaskAddDialog = ({ open, handleClose, handleAdd }) => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDueDate, setTaskDueDate] = useState('');

  const handleAddClick = () => {
    handleAdd({ taskName, taskDescription, taskDueDate });
    handleClose();
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Task</DialogTitle>
      <DialogContent>
        <TextField
          required
          margin="dense"
          label="Name"
          type="text"
          fullWidth
          variant="standard"
          name="name"
          value={taskName}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setTaskName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Description"
          type="text"
          fullWidth
          variant="standard"
          name="description"
          value={taskDescription}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setTaskDescription(e.target.value)}
        />
        <TextField
          required
          margin="dense"
          label="Due Date"
          type="date"
          fullWidth
          variant="standard"
          name="dueDate"
          value={taskDueDate}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setTaskDueDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleAddClick}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export function TaskCards({ tasks, setTasks}) {
  const [currentTask, setCurrentTask] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);

  useEffect(() => {
    fetch('/tasks')
    .then(response => {
      if (response.ok) return response.json();
      throw new Error('Response not ok.')
    })
    .then(data => setTasks(data))
    .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  // Handles the currently open task being edited
  const handleOpenEdit = (task) => {
    setCurrentTask(task);
    setOpenEdit(true);
  };

  // Handles closing the currently open task being edited
  const handleCloseEdit = () => {
    setOpenEdit(false);
    setCurrentTask(null);
  };

  // Handles saving changes after a task has been edited
  const handleEdit = (task) => {
    fetch(`/edit_task/${task.taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        taskName: task.taskName,
        taskDescription: task.taskDescription,
        taskDueDate: task.taskDueDate
      })
    })
    .then(response => response.json())
    .then(data => {
      setTasks(tasks.map(t => t.id === task.taskId ? data : t));
    })
    .catch(error => {
      console.error('There was an error editing the task:', error);
    })
  };

  return (
    <Container>
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
        gap={4}
        p={2}
        borderRadius={1}
        sx={{ border: '1px solid #CBCBCB', overflowX: 'auto' }}
      >
        {tasks.map((task, index) => (
          <Card 
            key={index}
            sx={{
              minWidth: 300,
              margin: 1,
              boxShadow: 2,
              borderRadius: 3,
              transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 6
              }
            }}
          >
            <Box p={2} display="flex" flexDirection="column" gap={2}>
              <Typography variant="h5">{task.name}</Typography>
              <Chip label={task.status} color="info" variant="outlined"/>
              <Box>
                <Typography variant="body2">Created Date: {new Date(task.created_date).toLocaleDateString()}</Typography>
                <Typography variant="body2">Due Date: {new Date(task.due_date).toLocaleDateString()}</Typography>
              </Box>
              <Box>
                <Typography variant="body1">Description</Typography>
                <Typography variant="body2">{task.description}</Typography>
              </Box>
              <Box display="flex" justifyContent="center" gap={1}>
                <TaskActionButton title="Complete task" color="success" size="small" IconComponent={DoneIcon} />
                <TaskActionButton title="Edit task" color="warning" size="small" IconComponent={EditIcon} onClick={() => handleOpenEdit(task)} />
                <TaskActionButton title="Delete task" color="error" size="small" IconComponent={DeleteIcon} />
              </Box>
            </Box>
          </Card>
        ))}
      </Box>
      {currentTask && (
        <TaskEditDialog
          currentTask={currentTask}
          open={openEdit}
          handleClose={handleCloseEdit}
          handleEdit={handleEdit}
        />
      )}
    </Container>
  );
}

export default function Root() {
  const [tasks, setTasks] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);

   // Handles opening the add task dialog
   const handleOpenAdd = () => {
    setOpenAdd(true);
  }

  // Handles closing the add task dialog
  const handleCloseAdd = () => {
    setOpenAdd(false);
  }
  
  // Handles adding a new task
  const handleAdd = (task) => {
    fetch('/add_task', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        taskName: task.taskName,
        taskDescription: task.taskDescription,
        taskDueDate: task.taskDueDate
      })
    })
    .then(response => response.json())
    .then(data => {
      setTasks([...tasks, data]);
    })
    .catch(error => {
      console.error('There was an error adding a new task:', error);
    })
  };

  return (
    <>
      <Box display="flex" flexDirection="column" gap={4}>
        <TaskrTitle />
        <Box>
          <Container>
            <Box display="flex" alignItems="center" justifyContent="space-between" width="100%" gap={2}>
              <Box display="flex" alignItems="center" gap={2}>
                <TaskSearchBar setTasks={setTasks} />
                <TaskActionButton
                  title="Add a new task"
                  color="primary" size="small"
                  IconComponent={AddIcon}
                  onClick={() => handleOpenAdd()}
                />
              </Box>
              <Box display="flex" alignItems="center" gap={2}>
                <TaskActionButton title="Filter" color="primary" size="small" IconComponent={FilterAltIcon} />
                <TaskSortSelect />
              </Box>
            </Box>
          </Container>
        </Box>
        {openAdd &&(
          <TaskAddDialog
            open={openAdd}
            handleClose={handleCloseAdd}
            handleAdd={handleAdd}
          />
        )}
        <TaskCards tasks={tasks} setTasks={setTasks} />
      </Box>
    </>
  )
}
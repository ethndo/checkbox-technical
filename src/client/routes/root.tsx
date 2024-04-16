import React, { useState } from 'react';
import { Box, Button, Card, Chip, Container, Dialog, DialogTitle, DialogActions, DialogContent, Fab, FormControl, IconButton, InputLabel, MenuItem, Select, TextField, Tooltip, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const tasksData = [
  {"name": "task 1", "description": "task 1 description", "dueDate": "1/1/2024", "createdDate": "1/1/2001", "status": "Not urgent"},
  {"name": "task 2", "description": "task 2 description", "dueDate": "2/2/2024", "createdDate": "2/2/2001", "status": "Due soon"},
  {"name": "task 3", "description": "task 3 description", "dueDate": "3/3/2024", "createdDate": "3/3/2001", "status": "Overdue"}
];

export function TaskCards() {
  const [tasks, setTasks] = useState(tasksData);
  const [currentTask, setCurrentTask] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);

  // Handles the currently open task being edited
  const handleOpenEdit = (task) => {
    setCurrentTask(task);
    setOpenEdit(true);
  };

  // Handles closing the currently open task being edited
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  // Handles saving changes after a task has been edited
  const handleEdit = () => {
    setTasks(tasks.map(task => task.name === currentTask.name ? currentTask : task));
    handleCloseEdit();
  };

  // Handles the changes being requested to the task
  const handleChange = (event) => {
    const { name, value } = event.target;
    setCurrentTask({ ...currentTask, [name]: value });
  };

  return (
    <Container>
      <Box
        display="flex"
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
                <Typography variant="body2">Created Date: {task.createdDate}</Typography>
                <Typography variant="body2">Due Date: {task.dueDate}</Typography>
              </Box>
              <Box>
                <Typography variant="body1">Description</Typography>
                <Typography variant="body2">{task.description}</Typography>
              </Box>
              <Box display="flex" gap={1}>
                <Tooltip title="Complete task">
                  <Fab color="success" size="small">
                    <DoneIcon />
                  </Fab>
                </Tooltip>
                <Tooltip title="Edit task">
                  <Fab color="warning" size="small" onClick={() => handleOpenEdit(task)}>
                    <EditIcon />
                  </Fab>
                </Tooltip>
                <Tooltip title="Delete task">
                  <Fab color="error" size="small">
                    <DeleteIcon />
                  </Fab>
                </Tooltip>
              </Box>
            </Box>
          </Card>
        ))}
      </Box>
      {currentTask && (
        <Dialog open={openEdit} onClose={handleCloseEdit}>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogContent>
            <TextField margin="dense" label="Name" type="text" fullWidth variant="standard" name="name" value={currentTask.name} onChange={handleChange} />
            <TextField margin="dense" label="Description" type="text" fullWidth variant="standard" name="description" value={currentTask.description} onChange={handleChange} />
            <TextField margin="dense" label="Due Date" type="date" fullWidth variant="standard" name="dueDate" value={currentTask.dueDate} onChange={handleChange} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEdit}>Cancel</Button>
            <Button onClick={handleEdit}>Save</Button>
          </DialogActions>
        </Dialog>
      )}
    </Container>
  );
}

export default function Root() {
  return (
    <>
      <Box display="flex" flexDirection="column" gap={4}>
        <Box>
          <Container align="center">
            <Typography variant="h3" color="primary">Taskr</Typography>
          </Container>
        </Box>
        <Box>
          <Container>
            <Box display="flex" alignItems="center" justifyContent="space-between" width="100%" gap={2}>
              <Box display="flex" alignItems="center" gap={2}>
                <TextField
                  InputProps={{
                    endAdornment: (
                      <IconButton size="small">
                        <SearchIcon />
                      </IconButton>
                    ),
                  }}
                  label="Search Tasks"
                  size="small"
                />
                <Tooltip title="Add a new task">
                  <Fab color="primary" size="small">
                    <AddIcon />
                  </Fab>
                </Tooltip>
              </Box>
              <Box display="flex" alignItems="center" gap={2}>
                <Tooltip title="Filter">
                  <Fab color="primary" size="small">
                    <FilterAltIcon />
                  </Fab>
                </Tooltip>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel>Sort by</InputLabel>
                  <Select label="Sort by">
                    <MenuItem>Status</MenuItem>
                    <MenuItem>Creation Date</MenuItem>
                    <MenuItem>Due Date</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </Container>
        </Box>
        <TaskCards />
      </Box>
    </>
  )
}
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

const TaskSearchBar = () => {
  return (
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

const TaskEditDialog = ({ currentTask, open, handleClose, handleChange, handleEdit }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Task</DialogTitle>
      <DialogContent>
        <TextField margin="dense" label="Name" type="text" fullWidth variant="filled" name="standard" value={currentTask.name} onChange={handleChange} />
        <TextField margin="dense" label="Description" type="text" fullWidth variant="standard" name="description" value={currentTask.description} onChange={handleChange} />
        <TextField margin="dense" label="Due Date" type="date" fullWidth variant="standard" name="dueDate" value={currentTask.dueDate} onChange={handleChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleEdit}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

const TaskAddDialog = ({ open, handleClose, handleAdd }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Task</DialogTitle>
      <DialogContent>
        <TextField margin="dense" label="Name" type="text" fullWidth variant="standard" name="name" />
        <TextField margin="dense" label="Description" type="text" fullWidth variant="standard" name="description" />
        <TextField margin="dense" label="Due Date" type="date" fullWidth variant="standard" name="dueDate" InputLabelProps={{ shrink: true }} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleAdd}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

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
          handleClose={() => handleCloseEdit()}
          handleChange={() => handleChange()}
          handleEdit={() => handleEdit()}
        />
      )}
    </Container>
  );
}

export default function Root() {
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
  const handleAdd = ({ name, description, dueDate}) => {

  };

  return (
    <>
      <Box display="flex" flexDirection="column" gap={4}>
        <TaskrTitle />
        <Box>
          <Container>
            <Box display="flex" alignItems="center" justifyContent="space-between" width="100%" gap={2}>
              <Box display="flex" alignItems="center" gap={2}>
                <TaskSearchBar />
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
            handleClose={() => handleCloseAdd()}
            handleAdd={() => handleAdd()}
          />
        )}
        <TaskCards />
      </Box>
    </>
  )
}
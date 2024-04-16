import React from 'react';
import { Box, Container, Fab, FormControl, IconButton, InputLabel, MenuItem, Select, TextField, Tooltip, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

export default function Root() {
  return (
    <>
      <Box>
        <Container align="center">
          <Typography variant="h3">Taskr</Typography>
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
              <FormControl style={{ minWidth: 200 }}>
                <InputLabel>Sort by</InputLabel>
                <Select size="small">
                  <MenuItem>Status</MenuItem>
                  <MenuItem>Creation Date</MenuItem>
                  <MenuItem>Due Date</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  )
}
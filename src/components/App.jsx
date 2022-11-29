import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import AddForm from './AddForm';
import StoredPasswordsTable from './StoredPasswordsTable';


const App = () => {
  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Password Manager
            </Typography>
            <Stack direction="row">
              <Button color="inherit" href='/add'>Add Password</Button>
              <Button color="inherit" href='/'>Manage Passwords</Button>
            </Stack>
          </Toolbar>
        </AppBar>
      </Box>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<StoredPasswordsTable />} />
            <Route path="add" element={<AddForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
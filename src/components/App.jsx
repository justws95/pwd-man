import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import AddForm from './AddForm';
import Login from './Login';
import SignUp from './SignUp';
import StoredPasswordsTable from './StoredPasswordsTable';


const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

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
            <Route index element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="home" element={<StoredPasswordsTable />} />
            <Route path="add" element={<AddForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
/*
  NOTE:

  I did not write this code myself. This code was borrowed and modified
  from the provided Material UI templates available at https://mui.com/material-ui/getting-started/templates/.
  The repo link for this template is 
  https://github.com/mui/material-ui/tree/v5.10.16/docs/data/material/getting-started/templates/sign-in.

  This code is being used with the permission of the template provider.
*/
import React, { useState, useEffect } from 'react';
import * as validator from 'email-validator';
import { getAuth } from "firebase/auth";
import { useNavigate } from 'react-router-dom';


import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { logUserIn } from './utils';

const theme = createTheme();

const Login = () => {
  const [formReady, setFormReady] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [pwdInput, setPwdInput] = useState('');
  const navigate = useNavigate();


  const handleSubmit = (event) => {
    event.preventDefault();
    const user = logUserIn(emailInput, pwdInput);
  };

  const handleEmailChange = (event) => {
    event.preventDefault();
    setEmailInput(event.target.value);
  }

  const handlePwdChange = (event) => {
    event.preventDefault();
    setPwdInput(event.target.value);
  }


  useEffect(() => {
    let valid = false;
    
    if (pwdInput.length >= 8 && validator.validate(emailInput)) {
      valid = true;
    }

    setFormReady(valid);
  }, [pwdInput, emailInput]);

  useEffect(() => {
    const currentAuth = getAuth();

    if (currentAuth != null) {
      const user = currentAuth.currentUser;

      if (user) {
        navigate('/home');
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoFocus
              onChange={handleEmailChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              helperText="Password must be at least 8 characters"
              onChange={handlePwdChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!formReady}
            >
              Sign In
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Login;

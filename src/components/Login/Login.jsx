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
import { useNavigate } from 'react-router-dom';


import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { logUserIn } from './utils';

const theme = createTheme();

const Login = () => {
  const [formReady, setFormReady] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [emailPristine, setEmailPristine] = useState(true);
  const [emailValid, setEmailValid] = useState(false);
  const [pwdInput, setPwdInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const navigate = useNavigate();

  const handleErrorMsg = (msg) => {
    setErrorMsg(msg);
    setShowErrorMsg(true);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const callback = navigate;
    const errorCallback = handleErrorMsg;
    logUserIn(emailInput, pwdInput, callback, errorCallback);
  };

  const handleEmailChange = (event) => {
    event.preventDefault();
    const input = event.target.value;

    setEmailInput(input);

    if (emailPristine) {
      setEmailPristine(false);
    }

    const isValid = validator.validate(input);
    setEmailValid(isValid);
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
    const authToken = sessionStorage.getItem('Auth Token');

    if (authToken) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <React.Fragment>
      {showErrorMsg &&
        <Alert 
          severity="error"
        >
          <AlertTitle>Error</AlertTitle>
          <strong>{errorMsg}</strong>
        </Alert>
      }
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
                error={!emailPristine && !emailValid}
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
    </React.Fragment>
  );
}

export default Login;

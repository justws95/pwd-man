/*
  NOTE:

  I did not write this code myself. This code was borrowed and modified
  from the provided Material UI templates available at https://mui.com/material-ui/getting-started/templates/.
  The repo link for this template is 
  https://github.com/mui/material-ui/tree/v5.10.16/docs/data/material/getting-started/templates/sign-up.

  This code is being used with the permission of the template provider.
*/
import React, { useState, useEffect } from 'react';
import * as validator from 'email-validator';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
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

import { signUpUser } from './utils';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

const SignUp = () => {
  const navigate = useNavigate();
  const [formReady, setFormReady] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [pwdInput, setPwdInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [showErrorMsg, setShowErrorMsg] = useState(false);

  const handleErrorMsg = (msg) => {
    setErrorMsg(msg);
    setShowErrorMsg(true);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (pwdInput.length >= 8 && validator.validate(emailInput)) {
      const callback = navigate;
      const errorCallback = handleErrorMsg;
      signUpUser(emailInput, pwdInput, callback, errorCallback);
    }
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
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    onChange={handleEmailChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    onChange={handlePwdChange}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={!formReady}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="center">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
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

export default SignUp;

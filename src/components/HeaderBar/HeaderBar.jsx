import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Person2Icon from '@mui/icons-material/Person2';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const HeaderBar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = (event) => {
    event.preventDefault();
    const auth = getAuth();

    console.log('Logout has been called.')

    signOut(auth).then(() => {
        // Sign-out successful.
        console.log('User has been logged out successfully.')
      }).catch((error) => {
        console.error(`Unable to log user out: ${error}`);
      });
  }

  const handleLoginClick = (event) => {
    event.preventDefault();
    navigate('/');
  }

  const handleSignUpClick = (event) => {
    event.preventDefault();
    navigate('/signup');
  }

  useEffect(() => {
    const currentAuth = getAuth();

    if (currentAuth != null) {
      const user = currentAuth.currentUser;

      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  });

  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Password Manager
            </Typography>
            <Stack direction="row">
              { isLoggedIn &&
                <div>
                  <Button color="inherit" href='/add'>Add Password</Button>
                  <Button color="inherit" href='/'>Manage Passwords</Button>
                </div>
              }
              <PopupState variant="popover" popupId="account-popout-menu">
                {(popupState) => (
                  <div>
                    <IconButton aria-label="account-mgmt" {...bindTrigger(popupState)}>
                      <Person2Icon  />
                    </IconButton>
                    <Menu {...bindMenu(popupState)}>
                      { isLoggedIn ?
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        :
                        <div>
                          <MenuItem onClick={handleLoginClick}>Log In</MenuItem>
                          <MenuItem onClick={handleSignUpClick}>Sign Up</MenuItem>
                        </div>
                      }
                    </Menu>
                  </div>
                )}
              </PopupState>
            </Stack>
          </Toolbar>
        </AppBar>
      </Box>
    </React.Fragment>
  );
}

export default HeaderBar;

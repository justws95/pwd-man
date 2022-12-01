import React, { useState, useEffect } from 'react';
import * as urlRegex from 'url-regex';
import { useNavigate } from 'react-router-dom';


import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import GeneratePasswordModal from '../GeneratePasswordModal';

import { addNewPassword } from './utils';
import { Typography } from '@mui/material';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const AddForm = () => {
  const [submitReady, setSubmitReady] = useState(false);
  const [pwdGenModalIsOpen, seOpenPwdGenModal] = useState(false);
  const [formFields, setFormFields] = useState({
    site: '',
    userId: '',
    password: '',
    alternateName: '',
  });
  const [formFieldsPristineState, setFormFieldsPristineState] = useState({
    site: true,
    userId: true,
    password: true,
    alternateName: true,
  });
  const [pwdHidden, setPwdHidden] = useState(true);
  const [isValidSite, setIsValidSite] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handlePwdModalOpen = () => seOpenPwdGenModal(true);
  const handlePwdModalClose = () => seOpenPwdGenModal(false);

  const handleClickShowPassword = () => {
    setPwdHidden(!pwdHidden);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const checkSubmitReadyAndSet = () => {
    const ff = formFields;

    if (ff.site.length > 0 && ff.userId.length > 0 && ff.password.length > 0 && isValidSite) {
      setSubmitReady(true);
    } else {
      setSubmitReady(false);
    }
  }

  const handleSiteInputChange = (event) => {
    let update = formFields;
    update.site = event.target.value;

    let updatePristineState = formFieldsPristineState;

    if (formFieldsPristineState.site === true) {
      updatePristineState.site = false;
    }

    setFormFields(formFields => ({
      ...formFields,
      ...update
    }));

    setFormFieldsPristineState(formFieldsPristineState => ({
      ...formFieldsPristineState,
      ...updatePristineState
    }));

    const isValidURL = urlRegex({exact: true, strict: false}).test(formFields.site);
    setIsValidSite(isValidURL);
    
    checkSubmitReadyAndSet();
  };

  const handleUserIdInputChange = (event) => {
    let update = formFields;
    update.userId = event.target.value;

    let updatePristineState = formFieldsPristineState;

    if (formFieldsPristineState.userId === true) {
      updatePristineState.userId = false;
    }

    setFormFields(formFields => ({
      ...formFields,
      ...update
    }));

    setFormFieldsPristineState(formFieldsPristineState => ({
      ...formFieldsPristineState,
      ...updatePristineState
    }));

    checkSubmitReadyAndSet();
  };

  const handlePasswordInputChange = (event) => {
    let update = formFields;
    update.password = event.target.value;

    let updatePristineState = formFieldsPristineState;

    if (formFieldsPristineState.password === true) {
      updatePristineState.password = false;
    }
    
    setFormFields(formFields => ({
      ...formFields,
      ...update
    }));

    setFormFieldsPristineState(formFieldsPristineState => ({
      ...formFieldsPristineState,
      ...updatePristineState
    }));

    checkSubmitReadyAndSet();
  };

  const handleAlternateNameInputChange = (event) => {
    let update = formFields;
    update.alternateName = event.target.value;

    let updatePristineState = formFieldsPristineState;

    if (formFieldsPristineState.alternateName === true) {
      updatePristineState.alternateName = false;
    }

    setFormFields(formFields => ({
      ...formFields,
      ...update
    }));

    setFormFieldsPristineState(formFieldsPristineState => ({
      ...formFieldsPristineState,
      ...updatePristineState
    }));

    checkSubmitReadyAndSet();
  };

  const handleSubmit = () => {
    addNewPassword(formFields, setShowSuccessModal);
  }

  const handleModalClose = (event) => {
    event.preventDefault();
    setShowSuccessModal(false);
  }

  const navigate = useNavigate();

  useEffect(() => {
    const authToken = sessionStorage.getItem('Auth Token');

    if (!authToken) {
      navigate('/login');
    }
  }, [navigate]);


  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          <Grid item>
            <Item>
              <Box
                component="form"
                sx={{
                  '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
              >
                <div>
                  <TextField
                    required
                    id='outlined-required'
                    label='Site'
                    placeholder='Site'
                    value={formFields.site}
                    onChange={handleSiteInputChange}
                    error={(formFields.site.length <= 0 && formFieldsPristineState.site === false) || !isValidSite}
                    helperText={formFields.site.length <= 0 && formFieldsPristineState.site === false ? 'Site is required.' : null}
                  />
                  <TextField
                    required
                    id='outlined'
                    label='User ID'
                    placeholder='User ID'
                    value={formFields.userId}
                    onChange={handleUserIdInputChange}
                    error={formFields.userId.length <= 0 && formFieldsPristineState.userId === false}
                    helperText={formFields.userId.length <= 0 && formFieldsPristineState.userId === false ? 'User ID is required.' : null}
                  />
                  <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <InputLabel
                      required
                      htmlFor="outlined-adornment-password"
                      error={formFields.password.length <= 0 && formFieldsPristineState.password === false}
                    >
                      Password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={pwdHidden ? "password" : "text"}
                      value={formFields.password}
                      onChange={handlePasswordInputChange}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {pwdHidden  ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                    <FormHelperText 
                      id="filled-weight-helper-text"
                      error={formFields.password.length <= 0 && formFieldsPristineState.password === false}
                    >
                      {
                        formFields.password.length <= 0 && formFieldsPristineState.password === false ? 'Password is required.' : null
                      }
                    </FormHelperText>
                  </FormControl>
                  <TextField
                    id='outlined'
                    label='Alternate Name'
                    placeholder='Alternate Name'
                    helperText='Nickname for this record'
                    value={formFields.alternateName}
                    onChange={handleAlternateNameInputChange}
                  />
                </div>
              </Box>
            </Item>
            <Item>
              <Stack spacing={2} direction="row">
                <Button 
                  color="secondary" 
                  variant="outlined"
                  onClick={handlePwdModalOpen}
                >
                  Generate Password
                </Button>
                <GeneratePasswordModal 
                  isOpen={pwdGenModalIsOpen} 
                  handleClose={handlePwdModalClose}
                  currentState={formFields}
                />
                <Button 
                  color="success" 
                  variant="outlined"
                  disabled={!submitReady}
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </Stack>
            </Item>
          </Grid>
        </Grid>
      </Box>
      <Modal
        open={showSuccessModal}
        onClose={(event) => handleModalClose(event)}
        aria-labelledby="pwd-add-confirm-modal"
        aria-describedby="pwd-add-confirm-modal"
      >
        <Typography>My name Jeff</Typography>
      </Modal>
    </React.Fragment>
  );
}

export default AddForm;

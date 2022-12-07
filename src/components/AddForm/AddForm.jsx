import React, { useState, useEffect } from 'react';
import * as urlRegex from 'url-regex';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import GeneratePasswordModal from '../GeneratePasswordModal';

import { addNewPassword, getCurrentlyManagedSites } from './utils';
import { Typography } from '@mui/material';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '40%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


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
  const [currentSites, setCurrentSites] = useState([]);
  const [siteFieldErrMsg, setSiteFieldErrMsg] = useState('');

  const handlePwdModalOpen = () => seOpenPwdGenModal(true);
  const handlePwdModalClose = () => seOpenPwdGenModal(false);

  const handleClickShowPassword = () => {
    setPwdHidden(!pwdHidden);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const checkSubmitReadyAndSet = (overrideValidSite) => {
    const ff = formFields;

    if (
      ff.site.length > 0 && 
      ff.userId.length > 0 && 
      ff.password.length > 0 && 
      (isValidSite || overrideValidSite)
    ){
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
    let validSiteState = isValidURL;

    if (formFields.site.length <= 0 && formFieldsPristineState.site === false) {
      const errMsg = 'Site field is required'
      validSiteState = false;

      setIsValidSite(false);
      setSiteFieldErrMsg(errMsg);
    } else if (!isValidURL) {
      const errMsg = `${update.site} is not a valid website domain`;
      validSiteState = false;

      setIsValidSite(false);
      setSiteFieldErrMsg(errMsg);
    } else if (currentSites.includes(update.site)) {
      const errMsg = `Record for ${update.site} already exists!`;
      validSiteState = false;

      setIsValidSite(false);
      setSiteFieldErrMsg(errMsg);
    } else {
      validSiteState = true;
      setIsValidSite(true);
      setSiteFieldErrMsg(null);
    }
    
    checkSubmitReadyAndSet(validSiteState);
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

  const handleAddMore = (event) => {
    event.preventDefault();

    const updateFormFields = {
      site: '',
      userId: '',
      password: '',
      alternateName: '',
    }

    const updatePristine = {
      site: true,
      userId: true,
      password: true,
      alternateName: true,
    }

    setFormFields(formFields => ({
      ...formFields,
      ...updateFormFields
    }));

    setFormFieldsPristineState(formFieldsPristineState => ({
      ...formFieldsPristineState,
      ...updatePristine
    }));

    setShowSuccessModal(false);
  }

  const handleManagePasswords = (event) => {
    event.preventDefault();
    navigate('/');
  }

  const navigate = useNavigate();

  useEffect(() => {
    const authToken = sessionStorage.getItem('Auth Token');

    if (!authToken) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    getCurrentlyManagedSites()
    .then((sites) => {
      setCurrentSites(sites);
    })
  }, [setCurrentSites]);


  return (
    <React.Fragment>
      <Box>
        <Typography 
          id="modal-modal-title" 
          variant="h4" 
          component="h4"
          sx={{
            padding: '10px'
          }}
        >
          Add Password
        </Typography>
        <Grid 
          container 
          spacing={1} 
          columns={12}
          alignContent='center'
          sx={{
            paddingTop:'3em',
            paddingLeft: '2em',
          }}
        >
          <Grid item alignContent='center'>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
              alignContent='center'
            >
              <div>
                <TextField
                  required
                  id='outlined-required'
                  label='Site'
                  placeholder='Site'
                  value={formFields.site}
                  onChange={handleSiteInputChange}
                  error={!isValidSite}
                  helperText={!isValidSite ? `${siteFieldErrMsg}` : null}
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
                testValidity={checkSubmitReadyAndSet}
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
          </Grid>
        </Grid>
      </Box>
      <Modal
        open={showSuccessModal}
        onClose={(event) => handleModalClose(event)}
        aria-labelledby="pwd-add-confirm-modal"
        aria-describedby="pwd-add-confirm-modal"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            Password has been saved!
          </Typography>
          <Typography id="spring-modal-description" sx={{ mt: 2 }}>
            Would you like to add more?
          </Typography>
          <Stack 
            sx={{top: '50%',left: '50%', paddingTop: '2em'}} 
            direction="row"
            spacing={12}
          >
            <Button 
              variant="text" 
              color="secondary"
              sx={{padding: '5px'}}
              onClick={(event) => handleAddMore(event)}
            >
              Add Another
            </Button>
            <Button 
              variant="text" 
              color="success"
              sx={{padding: '5px'}}
              onClick={(event) => handleManagePasswords(event)}
            >
              Manage Passwords
            </Button>
          </Stack>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default AddForm;

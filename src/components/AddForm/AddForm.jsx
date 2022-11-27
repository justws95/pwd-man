import React, { useState } from 'react';

import GeneratePasswordModal from '../GeneratePasswordModal';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const AddForm = (props) => {
  const [submitReady, setSubmitReady] = useState(false);
  const [pwdGenModalIsOpen, seOpenPwdGenModal] = useState(false);
  const [formFields, setFormFields] = useState({
    site: '',
    userId: '',
    password: '',
    alternateName: '',
  });
  const [pwdHidden, setPwdHidden] = useState(true);

  const handlePwdModalOpen = () => seOpenPwdGenModal(true);
  const handlePwdModalClose = () => seOpenPwdGenModal(false);

  const handleSiteInputChange = (event) => {
    let update = formFields;
    update.site = event.target.value;

    setFormFields(formFields => ({
      ...formFields,
      ...update
    }));
  };

  const handleUserIdInputChange = (event) => {
    let update = formFields;
    update.userId = event.target.value;

    setFormFields(formFields => ({
      ...formFields,
      ...update
    }));
  };

  const handlePasswordInputChange = (event) => {
    let update = formFields;
    update.password = event.target.value;
    
    setFormFields(formFields => ({
      ...formFields,
      ...update
    }));
  };

  const handleAlternateNameInputChange = (event) => {
    let update = formFields;
    update.alternateName = event.target.value;

    setFormFields(formFields => ({
      ...formFields,
      ...update
    }));
  };

  return (
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
                />
                <TextField
                  required
                  id='outlined'
                  label='User ID'
                  placeholder='User ID'
                  helperText='User ID for this record'
                  value={formFields.userId}
                  onChange={handleUserIdInputChange}
                />
                <TextField
                  required
                  id='outlined-password-input'
                  label="Password"
                  type={pwdHidden ? "password" : "text"}
                  value={formFields.password}
                  onChange={handlePasswordInputChange}
                />
                <TextField
                  id='outlined'
                  label='Alternate Name'
                  placeholder='Alternate Name'
                  helperText='Alternate Name'
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
                updateFormState={handlePasswordInputChange}
              />
              <Button 
                color="success" 
                variant="outlined"
                disabled={!submitReady}
              >
                Submit
              </Button>
            </Stack>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AddForm;

import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { generateRandomString } from './utils';


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


const GeneratePasswordModal = ({ isOpen, handleClose, currentState, updateFormState }) => {
  const [newPwd, setNewPwd] = useState(null);

  const generateNewPassword = () => {
    const pwd = generateRandomString(18);
    setNewPwd(pwd);
  }

  const handlePwdAccept = () => {
    currentState.password = newPwd;
  }


  return (
    <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            Choose Password Options
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {newPwd}
          </Typography>
          <Stack sx={{top: '50%',left: '50%', padding: '10px'}} direction="row">
            <Button 
              variant="text" 
              color="error"
              sx={{padding: '5px'}}
              onClick={() => {
                setNewPwd(null);
                handleClose();
              }}
            >
              Close
            </Button>
            <Button 
              variant="text" 
              color="primary"
              sx={{padding: '5px'}}
              onClick={generateNewPassword}
            >
              {newPwd === null ? 'Generate' : 'Regenerate'}
            </Button>
            {newPwd != null &&
              <Button 
                variant="text" 
                color="success"
                sx={{padding: '5px'}}
                onClick={() => {
                  handlePwdAccept();
                  handleClose();
                }}
              >
                Use this password
              </Button>

            }
          </Stack>
        </Box>
      </Modal>
  );
}

export default GeneratePasswordModal;

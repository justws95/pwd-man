import React from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import './PageNotFound.css';


const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <Typography 
        variant="h1" 
        component="div" 
        sx={{ flexGrow: 1 }}
        align='center'
      >
        Page Not Found
      </Typography>
      <Box className='four_o_four_page'/>
      <Grid 
        container 
        alignItems={'center'} 
        columns={12}
        sx={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Grid item>
          <Button 
            variant='contained'
            onClick={(event) => {
              event.preventDefault();
              navigate('/');
            }}
          >
            Return Home
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default PageNotFound;

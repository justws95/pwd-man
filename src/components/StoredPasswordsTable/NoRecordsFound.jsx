import React from "react";
import { useNavigate } from "react-router-dom";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';


const NoRecordsFound = () => {
  const navigate = useNavigate();

  const handleCreateNew = (event) => {
    event.preventDefault();
    navigate('/add');
  }

  return (
    <React.Fragment>
      <Box sx={{
        paddingTop: '2em',
      }}>
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
            <Typography id="no-records-to-display-header" variant="h2">
              No records to display
            </Typography>
            <Typography id="no-records-to-display-sub-message" sx={{ mt: 2 }}>
              Get started by adding your first password!
            </Typography>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
              sx={{
                padding: '2em'
              }}
            >
              <Button
                variant="outlined"
                onClick={(event) => (handleCreateNew(event))}
              >
                Add Password
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
}

export default NoRecordsFound;

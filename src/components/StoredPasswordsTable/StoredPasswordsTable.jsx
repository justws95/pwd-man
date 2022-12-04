import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import LoadingAnimation from './../LoadingAnimation';
import NoRecordsFound from './NoRecordsFound';

import { getStoredRecords, deleteRecordEntry } from './utils';

import './StoredPasswordsTable.css';

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


const StoredPasswordsTable = () => {
  const [initialLoadPerformed, setInitialLoad] = useState(false);
  const [records, setRecords] = useState([]);
  const [errorFetching, setErrorFetching] = useState(false);
  const [showPassword, setShowPassword] = useState({});
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deletedRecord, setDeletedRecord] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [recordToBeDeleted, setRecordToBeDeleted] = useState('');

  useEffect((showPassword) => {
    getStoredRecords().then((data) => {
      setRecords(data);
      setErrorFetching(false);

      let updatePwdVis = showPassword;

      setShowPassword((showPassword) => ({
        ...showPassword,
        ...updatePwdVis
      }));

      setInitialLoad(true);   
    }).catch((error) => {
      console.error(`Error occurred while fetching stored records: ${error}`);
      setErrorFetching(true);
    })
  }, []);

  const handleDeleteModalOpen = () => setShowDeleteModal(true);

  const handleDeleteModalClose = (event) => {
    event.preventDefault();
    setShowDeleteModal(false);
  }

  const handleVisibilityToggle = (event, site) => {
    event.preventDefault();
    let visibilityUpdate = showPassword;
    visibilityUpdate[site] = !showPassword[site];

    setShowPassword((showPassword) => ({
      ...showPassword,
      ...visibilityUpdate
    }));
  }

  const handleDeleteClick = (event, site) => {
    event.preventDefault();
    setRecordToBeDeleted(site);
    handleDeleteModalOpen();
  }

  const handleConfirmDelete = (event) => {
    event.preventDefault();
    const entry = records.filter((r) => r.site === recordToBeDeleted)[0];

    deleteRecordEntry(entry.id).then(() => {
      setDeletedRecord(recordToBeDeleted);
      setDeleteSuccess(true);
      setRecordToBeDeleted('');
      setShowDeleteModal(false);

      // Update the visible records table
      const recordsUpdate = records.filter((r) => r.site !== recordToBeDeleted);
      setRecords(recordsUpdate);

    }).catch((error) => {
      console.error(`Error occurred while deleting record: ${error}`);
    });
  }

  const handlePwdEdit = (event, site) => {
    event.preventDefault();
    const entry = records.filter((r) => r.site === site)[0];
    navigate(`/edit?documentID=${entry.id}`);
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
      {errorFetching &&
        <Alert 
          severity="error"
        >
          <AlertTitle>Error</AlertTitle>
          Unable to retrieve records
        </Alert>
      }
      {deleteSuccess &&
        <Alert 
        severity="success"
        >
          <AlertTitle>Success</AlertTitle>
          Successfully deleted record for <strong>{deletedRecord}</strong>
        </Alert>
      }
      { (initialLoadPerformed && records.length > 0) &&
        <React.Fragment>
          <TableContainer component={Paper}>
            <Table 
              stickyHeader
              sx={{ minWidth: 650 }} 
              size="small" 
              aria-label="password-table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Site</TableCell>
                  <TableCell>Alternate Name</TableCell>
                  <TableCell>User ID</TableCell>
                  <TableCell>Password</TableCell>
                  <TableCell align="center">Show Password?</TableCell>
                  <TableCell align="center">Edit</TableCell>
                  <TableCell align="center">Delete?</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {records.map((row) => (
                  <TableRow
                    key={row.site}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.site}
                    </TableCell>
                    <TableCell>{row.alternateName || 'N/A'}</TableCell>
                    <TableCell>{row.userId}</TableCell>
                    <TableCell
                      className={`${(!showPassword[row.site] || showPassword[row.site] === false) ? 'unselectable-element' : ''}`}
                    >
                      { showPassword[row.site] ? row.password : '*'.repeat(21) }
                    </TableCell>
                    <TableCell align="center">
                      <IconButton 
                        aria-label="show-password"
                        onClick={(event) => handleVisibilityToggle(event, row.site)}
                      >
                        {
                          showPassword[row.site] ? <VisibilityOff /> : <Visibility />
                        }
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton 
                        aria-label="edit-password"
                        onClick={(event) => handlePwdEdit(event, row.site)}
                      >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton 
                        aria-label="delete"
                        onClick={(event) => handleDeleteClick(event, row.site)}
                      >
                        <DeleteForeverIcon/>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Modal
            open={showDeleteModal}
            onClose={handleDeleteModalClose}
            aria-labelledby="modal-pwd-gen"
            aria-describedby="modal-pwd-gen"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h4" component="h2">
                Are you sure?
              </Typography>
              <Typography id="spring-modal-description" sx={{ mt: 2 }}>
                This cannot be undone.
              </Typography>
              <Stack 
                sx={{top: '50%',left: '50%', paddingTop: '2em'}} 
                direction="row"
                spacing={12}
              >
                <Button 
                  variant="text" 
                  color="error"
                  sx={{padding: '5px'}}
                  onClick={(event) => handleDeleteModalClose(event)}
                >
                  Cancel
                </Button>
                <Button 
                  variant="text" 
                  color="success"
                  sx={{padding: '5px'}}
                  onClick={(event) => handleConfirmDelete(event)}
                >
                  Confirm Delete
                </Button>
              </Stack>
            </Box>
          </Modal>
        </React.Fragment>
      }
      { (initialLoadPerformed && records.length <= 0) &&
        <NoRecordsFound />
      }
      { !initialLoadPerformed &&
        <Grid
          className='loading-animation-box'
          spacing={0}
          alignItems="center"
          justify="center"
          sx={{paddingTop: '50%'}}
        >
          <Box 
            display="flex" 
            alignItems="center"
            justifyContent="center"
          >
            <LoadingAnimation/>
          </Box>
        </Grid>
      }
    </React.Fragment>
  );
}

export default StoredPasswordsTable;

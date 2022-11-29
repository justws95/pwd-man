import React, { useState, useEffect } from 'react';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { getStoredRecords, deleteRecordEntry } from './utils';


const StoredPasswordsTable = () => {
  const [records, setRecords] = useState([]);
  const [errorFetching, setErrorFetching] = useState(false);
  const [showPassword, setShowPassword] = useState({});
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deletedRecord, setDeletedRecord] = useState('');

  useEffect(() => {
    getStoredRecords().then((data) => {
      setRecords(data);
      setErrorFetching(false);

      // set password visibility defaults
      data.forEach((entry) => {
        showPassword[`${entry.site}`] = false;
      });
    }).catch((error) => {
      console.error(`Error occurred while fetching stored records: ${error}`);
      setErrorFetching(true);
    })
  }, []);

  const handleMouseDown = (event) => {
    event.preventDefault();
  };

  const handleDelete = (site) => {
    const entry = records.filter((r) => r.site === site)[0];

    deleteRecordEntry(entry.id).then(() => {
      setDeletedRecord(site);
      setDeleteSuccess(true);
    }).catch((error) => {
      console.error(`Error occurred while deleting record: ${error}`);
    })

  }

  const handlePasswordVisibility = (site) => {
    let visibilityUpdate = showPassword;
    visibilityUpdate[site] = !showPassword[site];

    setShowPassword(visibilityUpdate);
  }

  const generateShowPasswordIcon = (site) => {
    return (
      <React.Fragment>
        <TableCell align="right">
          <IconButton 
            aria-label="show-password"
            onClick={(event) => { 
              handleMouseDown(event);
              handlePasswordVisibility(site);
            }}
          >
            {
              showPassword[site] ? <VisibilityOff /> : <Visibility />
            }
          </IconButton>
        </TableCell>
      </React.Fragment>
    );
  }

  const generateRowDeleteIcon = (site) => {
    return (
      <React.Fragment>
        <TableCell align="right">
          <IconButton 
            aria-label="delete"
            onClick={(event) => { 
              handleMouseDown(event);
              handleDelete(site);
            }}
          >
            <DeleteForeverIcon/>
          </IconButton>
        </TableCell>
      </React.Fragment>
    );
  }


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
              {/*
                <TableCell align="right">Show Password?</TableCell>
                */
              }
              <TableCell align="right">Delete?</TableCell>
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
                <TableCell>
                  {/*
                    showPassword[row.site] ? row.password : '*************'
                    */
                    row.password
                  }
                </TableCell>
                {/*
                  generateShowPasswordIcon(row.site)
                  */
                }
                {
                  generateRowDeleteIcon(row.site)
                }
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}

export default StoredPasswordsTable;

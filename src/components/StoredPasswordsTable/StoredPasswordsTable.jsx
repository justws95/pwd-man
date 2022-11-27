import React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { getStoredRecords } from './utils';


const createData = async (
  site,
  nickname,
  userId,
  password
) => {
  try {
    const records = await getStoredRecords();

    console.log("Here are the fetched records");

    console.log(records);
  } catch (error) {
    console.log("Some weird exception occurred");
  } finally {
    return { site, nickname, userId, password };
  }
}


const rows = [
  createData('amazon.com', 'Money Pit', 'someEmail@email.com', 'Pa$$w0Rd!'),
  createData('facebook.com', 'Time Zuck', 'someEmail@email.com', 'Pr0krazt1nate'),
];


const StoredPasswordsTable = (props) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Site</TableCell>
            <TableCell align="right">Nickname</TableCell>
            <TableCell align="right">User ID</TableCell>
            <TableCell align="right">Password</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.site}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.site}
              </TableCell>
              <TableCell align="right">{row.nickname || 'N/A'}</TableCell>
              <TableCell align="right">{row.userId || 'N/A'}</TableCell>
              <TableCell align="right">{row.password}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default StoredPasswordsTable;

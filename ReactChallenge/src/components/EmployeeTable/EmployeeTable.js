
import { useSelector } from "react-redux";
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import FormCard from '../FormCard/FormCard';

  
function SimpleDialog(props) {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <Typography variant="h4" gutterBottom component="div" sx={{display:'flex',justifyContent:'center',pt:5,pd:5}}>
        EDIT DETAILS IN MODAL
      </Typography>
      <FormCard  row={props.row} handleClose={handleClose} />
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
 
function EmployeeTable() {
  const data = useSelector((state) => state.userDetails);
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [row, setRow] = React.useState({});
  const handleClickOpen = (row) => {
    setRow(row)
    setOpen(true);
  };
  const handleClose = (value) => {
    setOpen(false);
  };
  return (
    <>
    <Typography variant="h2" gutterBottom component="div" sx={{display:'flex',justifyContent:'center',pt:5,pd:5}}>
        EMPLOYEE DETAILS
      </Typography>
    <TableContainer component={Paper} className='App'>
      <Table sx={{m:2}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Serial No.</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Aadhar No.</TableCell>
            <TableCell align="center">PAN No.</TableCell>
            <TableCell align="center">Employee Type</TableCell>
            <TableCell align="center">Joining Date</TableCell>
            <TableCell align="center">Edit</TableCell>
            <TableCell align="center">Modal Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(row => (
            <TableRow
              key={row.id}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center">{row.emailId}</TableCell>
              <TableCell align="center">{row.aadharNumber}</TableCell>
              <TableCell align="center">{row.panNumber}</TableCell>
              <TableCell align="center">{row.employeeType}</TableCell>              
              <TableCell align="center">{row.joiningDate}</TableCell>
              <TableCell align="center">
                  <Button 
                    variant="outlined" 
                    startIcon={<EditIcon />}
                    onClick={()=>{
                      console.log(row)
                      history.push({
                        pathname: '/form',
                        state:{...row}
                      });
                    }}>
                    Edit
                  </Button>
              </TableCell>              
              <TableCell align="center">
                <Button 
                  variant="contained" 
                  startIcon={<EditIcon />}
                  onClick={()=>{handleClickOpen(row)}}>
                 Modal Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <SimpleDialog
        open={open}
        onClose={handleClose}
        row={row}
      />
    </TableContainer>
    </>
  );
}

export default EmployeeTable;


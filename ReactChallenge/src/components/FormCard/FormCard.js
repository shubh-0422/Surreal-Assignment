import React, { useEffect, useState } from "react";


import { useHistory } from "react-router";

import { useDispatch } from "react-redux";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import validator from 'validator'; 

import {editUser} from '../../redux/actions/user';

const FormCard = props => {
    const initialState = {
        id: 0,
        name:"",
        emailId: "",
        aadharNumber: "",
        panNumber: "",
        employeeType: "",
        joiningDate: "2000-01-01",
        isModal:true,
    };

    const  [state, setState] = useState(initialState);
	const dispatch = useDispatch();
	const history = useHistory();
    const theme = createTheme();


    useEffect(() => {
        console.log(props);
        if(props?.row){
            let date = props.row.joiningDate.split("-");
            setState({
                id : props.row?.id,
                name : props.row.name,
                emailId : props.row.emailId,
                aadharNumber : props.row.aadharNumber,
                panNumber : props.row.panNumber,
                employeeType : props.row.employeeType,
                joiningDate : date[2]+"-"+date[1]+"-"+date[0] ,         
            });
        }
            else if(props?.history?.location?.state){
            let date = props.history?.location?.state?.joiningDate.split("-");
            setState({
                id : props.history.location.state?.id,
                name : props.history.location.state?.name,
                emailId : props.history.location.state?.emailId,
                aadharNumber : props.history.location.state?.aadharNumber,
                panNumber : props.history.location.state?.panNumber,
                employeeType : props.history.location.state?.employeeType,
                joiningDate : date[2]+"-"+date[1]+"-"+date[0] ,         
            });
        }
	},[props]);

    const onPressSave= event =>{
        event.preventDefault();
        if(! /^[A-Za-z ]+$/.test(state.name)){
            alert("NAME IS INVALID")
            return false;
        }
        else if(! validator.isEmail(state.emailId)){
            alert("EMAIL IS INVALID")
            return false;
        }  
        else if(state.aadharNumber.length !==10){
            alert("AADHAR NUMBER IS INVALID")
            return false;
        }
        else if(! /^([a-zA-Z0-9]){10}?$/.test(state.panNumber)){
            alert("PAN NUMBER IS INVALID")
            return false
        }
        else{
            let date = (state.joiningDate).split("-")
            let joiningDate = date[2]+'-'+date[1]+"-"+date[0]
            dispatch(editUser({
                id : state.id,
                name : state.name,
                emailId : state.emailId ,
                aadharNumber : state.aadharNumber,
                panNumber : state.panNumber ,
                employeeType : state.employeeType ,
                joiningDate : joiningDate
            }))
            if(props?.row){
                props.handleClose()
            }
            else{
                history.push({
                    pathname: '/'
                });
            }
            return true;
        }
    }

    const setValue = event => {
        setState({
            ...state,
            [event.target.name] : event.target.value
        });
    };

    const onPressCancel=(event)=>{
        event.preventDefault(); 
        if(props?.row){
            props.handleClose()
        }
        else{
            history.push({
                pathname: '/'
          });
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop:5,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent:'center'
                    }}>
                    <Box component="form" noValidate  sx={{ mt: 0 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} >
                                <TextField
                                    disabled
                                    autoComplete=""
                                    name="id"
                                    fullWidth
                                    label="ID"
                                    value={state.id}
                                    autoFocus
                                    />
                            </Grid>
                            <Grid item xs={12} >
                                <TextField
                                    error={! /^[A-Za-z ]+$/.test(state.name)}
                                    autoComplete="given-name"
                                    name="name"
                                    required
                                    fullWidth
                                    label="Name"
                                    value={state.name}
                                    autoFocus
                                    onChange={setValue}
                                    />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    error={!validator.isEmail(state.emailId)}
                                    required
                                    fullWidth
                                    id="emailId"
                                    label="Email Address"
                                    name="emailId"
                                    autoComplete="emailId"
                                    value={state.emailId}
                                    onChange={setValue}
                                    />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    error={state.aadharNumber.length !==10}
                                    required
                                    fullWidth
                                    name="aadharNumber"
                                    label="Aadhar Number"
                                    type="number"
                                    id="aadharNumber"
                                    value={state.aadharNumber}
                                    onChange={setValue}
                                    />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    error={! /^([a-zA-Z0-9]){10}?$/.test(state.panNumber)}
                                    required
                                    fullWidth
                                    name="panNumber"
                                    label="PAN Number"
                                    type="name"
                                    id="panNumber"
                                    value={state.panNumber}
                                    onChange={setValue}
                                    />
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="employeeType">Employee Type</InputLabel>
                                        <Select
                                            name="employeeType"
                                            label="Employee Type"
                                            type="name"
                                            id="employeeType"
                                            value={state.employeeType}
                                            onChange={setValue}
                                        >
                                            <MenuItem value={"Full-Time"}>Full-Time</MenuItem>
                                            <MenuItem value={"Part-Time"}>Part-Time</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="joiningDate"
                                    type="date"
                                    label="Joining Date"
                                    id="joinDate"
                                    value={state.joiningDate}
                                    onChange={setValue}
                                />
                            </Grid>
                        </Grid>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent:'space-evenly',
                            }} >
                            <Grid item xs={12} sm={5}>
                                <Button
                                    fullWidth
                                    color="error"
                                    variant="outlined"
                                    sx={{ mt: 3, mb: 2 }}
                                    onClick={onPressCancel}
                                >
                                    cancel
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={5}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    onClick={onPressSave}
                                >
                                    save
                                </Button>
                            </Grid>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};
export default FormCard;
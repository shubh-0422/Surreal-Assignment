import React from "react";
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
import {connect} from 'react-redux';
import {editUser} from '../../redux/actions/user'


const theme = createTheme();

class FormCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            name:"",
            emailId: "",
            aadharNumber: "",
            panNumber: "",
            employeeType: "",
            joiningDate: "2000-01-01",
            isModal:true,
        };
       }
       componentDidMount(){
           if(this.props?.row){
            let temp=this.props.row.joiningDate.split("-");
            this.setState({
                id: this.props.row?.id,
                name: this.props.row.name,
                emailId: this.props.row.emailId,
                aadharNumber: this.props.row.aadharNumber,
                panNumber: this.props.row.panNumber,
                employeeType: this.props.row.employeeType,
                joiningDate: temp[2]+"-"+temp[1]+"-"+temp[0] ,         
            });
           }
          else if(this.props?.history?.location?.state){
            let temp=this.props.history?.location?.state?.joiningDate.split("-");
            this.setState({
                id: this.props.history.location.state?.id,
                name: this.props.history.location.state?.name,
                emailId: this.props.history.location.state?.emailId,
                aadharNumber: this.props.history.location.state?.aadharNumber,
                panNumber: this.props.history.location.state?.panNumber,
                employeeType: this.props.history.location.state?.employeeType,
                joiningDate: temp[2]+"-"+temp[1]+"-"+temp[0] ,         
            });
           }
       }
       onPressSave(e){
            e.preventDefault();
            if(! /^[A-Za-z ]+$/.test(this.state.name)){
                alert("NAME IS INVALID")
                return false;
            }
            else if(! validator.isEmail(this.state.emailId)){
                alert("EMAIL IS INVALID")
                return false;
            }  
            else if(this.state.aadharNumber.length !==10){
                alert("AADHAR NUMBER IS INVALID")
                return false;
            }
            else if(! /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/.test(this.state.panNumber)){
                alert("PAN NUMBER IS INVALID")
                return false
            }
            else{
                this.props.editUser({
                    id: this.state.id,
                    name:this.state.name,
                    emailId:this.state.emailId ,
                    aadharNumber:this.state.aadharNumber,
                    panNumber:this.state.panNumber ,
                    employeeType:this.state.employeeType ,
                    joiningDate:this.state.joiningDate
                })
                if(this.props?.row){
                    console.log(this.props);
                    this.props.handleClose()
                }
                else{
                this.props.history.push({
                    pathname: '/'
                  });

                }
                return true;
            }
            
            
       }
       onPressCancel(e){
        e.preventDefault(); 
        if(this.props?.row){
            console.log(this.props);
            this.props.handleClose()
        }
        else{
        this.props.history.push({
            pathname: '/'
          });

        }
    }

    render() {
        let state=this.state;
        return (
            <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                    <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                >
                <Box component="form" noValidate  sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
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
                        onChange={(e)=>this.setState({name:e.target.value})}
                        />
                    </Grid>
                    
                    <Grid item xs={12}>
                        <TextField
                        error={!validator.isEmail(state.emailId)}
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={state.emailId}
                        onChange={(e)=>this.setState({emailId:e.target.value})}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        error={state.aadharNumber.length !==10}
                        required
                        fullWidth
                        name="aadharNo"
                        label="Aadhar No."
                        type="number"
                        id="aadharNo"
                        value={state.aadharNumber}
                        onChange={(e)=>this.setState({aadharNumber:e.target.value})}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        error={! /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/.test(state.panNumber)}
                        required
                        fullWidth
                        name="panNo"
                        label="PAN No."
                        type="name"
                        id="panNo"
                        value={state.panNumber}
                        onChange={(e)=>this.setState({panNumber:e.target.value})}
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
                                onChange={(e)=>this.setState({employeeType:e.target.value})}
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
                        name="joinDate"
                        type="date"
                        id="joinDate"
                        value={state.joiningDate}
                        onChange={(e)=>this.setState({joiningDate:e.target.value})}
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
                        onClick={(e)=>
                            this.onPressCancel(e)
                        }
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
                        onClick={(e)=>
                            this.onPressSave(e)
                        }
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
    }
}
const mapStateToProps = ({user}) => {
    return {
    };
};
export default connect(mapStateToProps,{editUser})(FormCard);
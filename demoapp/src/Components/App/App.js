import React, {Component, Text} from 'react';
import logo from './../../logo.svg';
import './App.css';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Button, Input, Paper, TextField, TextareaAutosize} from '@material-ui/core';
import { render } from 'react-dom';
import axios from 'axios';

var currentStatus = "   Network Status: Waiting for response";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {myName: "", myEmail: "", myMsg: "", myStatus: "   Network Status: Waiting for Response"};
  }


  handleNameChange = (event) => {
    this.setState({myName: event.target.value});
    console.log("name = " + this.state.myName);
 }

  handleEmailChange = (event) => {
    this.setState({myEmail: event.target.value});
    console.log("email = " + this.state.myEmail);
  }

  handleMsgChange = (event) => {
    this.setState({myMsg: event.target.value});
    console.log("Msg = " + this.state.myMsg);
  }

  statusChange = (event) => {
    this.setState({myStatus: this.currentStatus});
   }

  doClear() {
    this.setState({myEmail: ''});
    this.setState({myName: ''});
    this.setState({myMsg: ''}); 
    this.statusChange();
  }

   handleClear = (event) => {
     console.log("Cleared form");
     this.doClear();
   }

   doValidateFormData() {
     // validate email format
    var validator = require("email-validator");
    if (!validator.validate(this.state.myEmail)) {
      alert("Invalid Email Address format.");
      return false;
    }
    else {
      if (this.state.myName == '') {
        alert("Please enter a name!");
        return false;
      }
      else {
        if (this.state.myMsg == '') {
        alert("Please enter a message to send!");
        return false;
        }
      }
    }
    return true;
   }
  
  handleSubmit = (e) => {
    e.preventDefault(); 

    // validate email format
    if (this.doValidateFormData()) {

      console.log("SUBMIT:  Name = " + this.state.myName + ", Email = " + this.state.myEmail + ", Msg = " + this.state.myMsg);
      var params = {'Name': this.state.myName, 'Email': this.state.myEmail, 'Msg': this.state.myMsg};

        // Make my network call here
          axios.post('https://2mmad1s0uh.execute-api.us-west-2.amazonaws.com/Demo/demo', params)
        //axios.get('https://app.memcpu.io/api/health')
         .then(res => {
           console.log(res);
           console.log(res.data);
           this.currentStatus = "   Network Status: Email successfully sent!";
           this.statusChange();
           } 
         ).catch( error => {
           this.currentStatus = "   Network Status: Email Failed to Send!";
           this.statusChange();
         })

        // clear for next time
         this.doClear(); 

    }
  }

  render(){
    return (
      <Container maxWidth="lg" className="App">
        <Paper>
        <Typography variant="h4" component="h1" gutterBottom>
            Larry's Contact Form using React + Material UI
          </Typography>
          <img src={logo} className="App-logo" alt="logo" />
          <form onSubmit={this.handleSubmit} novalidate>
            <Typography>
               Enter a Name
              <br />
              <TextField 
                onChange={this.handleNameChange}
                value={this.state.myName}
                type="text" 
                name="inputname"
                cols="50" 
                rows="1"/>
            </Typography>
            <br />
            <br />
  
            <Typography>
              Enter an Email Address:
              <br />
              <TextField 
                 onChange={this.handleEmailChange}
                 value={this.state.myEmail}
                 type="text" 
                 name="email" 
                 cols="50" 
                 rows="1" />
            </Typography>
            <br />
            <br />
  
            <Typography>
              Enter a Message to Send:
              <br />
              <TextareaAutosize 
                 onChange={this.handleMsgChange}
                 value={this.state.myMsg}
                 type="text" 
                 name="message" 
                 cols="100" 
                 rows="3" />
            </Typography>
            <br />
            <br />
          <br />
          <Button variant="contained" color="primary" type="submit">
            Submit
            </Button>
            <Button variant="contained" color="secondary" onClick={this.handleClear}>
            Clear
            </Button>
            <TextField
                 name="status" 
                 fullWidth={true}
                 InputProps={{ disableUnderline: true }}
                 OnChange = {this.statusChange}
                 value={this.state.myStatus}>
            </TextField>
          </form>
        </Paper>
      </Container>
    );
  }
}

export default App;

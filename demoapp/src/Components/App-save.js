import React, {Component} from 'react';
import logo from './../../logo.svg';
import './App.css';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Button, Paper } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import { render } from 'react-dom';


class App extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit(e) {
    console.log('The name is: ' + this.inputname.value);
    console.log('The email is: ' + this.emailaddress.value);
    console.log('The message is: ' + this.msg.value);
    this.debugname.value = this.inputname.value;
    e.preventDefault();
  }

  render(){
    return (
      <Container maxWidth="lg" className="App">
        <Paper>
        <Typography variant="h4" component="h1" gutterBottom>
            Sample Contact Form using React + Material UI
          </Typography>
          <img src={logo} className="App-logo" alt="logo" />
          <form id="contact-form" onSubmit={this.handleSubmit}>
            <label>
              Enter a Name:
              <br />
              <textarea 
                ref={(inputname) => this.inputname = inputname}
                type="text" 
                name="inputname"
                cols="50" 
                rows="1"/>
            </label>
            <br />
            <br />
  
            <label>
              Enter an Email Address:
              <br />
              <textarea 
                 ref={(emailaddress) => this.emailaddress = "email"}
                 type="text" 
                 name="email" 
                 cols="50" 
                 rows="1" />
            </label>
            <br />
            <br />
  
            <label>
              Enter a Message to Send:
              <br />
              <textarea 
                 ref={(msg) => this.msg = "message"}
                 type="text" 
                 name="message" 
                 cols="100" 
                 rows="3" />
            </label>
            <br />
            <br />
          </form>
          <br />
          <label name="debugname" ref={(debugname)}
            Debug />
          <br />
          <input type="submit" value="Submit" />
          <Button variant="contained" color="primary">
            Submit
          </Button>
        </Paper>
      </Container>
    );
  }
}

export default App;

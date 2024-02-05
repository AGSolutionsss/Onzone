import React, { Component } from 'react';
import { Form, FormGroup, Input } from 'reactstrap';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import QueueAnim from 'rc-queue-anim';
import { NotificationContainer, NotificationManager,} from "react-notifications";
import AppConfig from 'Constants/AppConfig';
import {baseURL} from '../../../api';


export default class Forgotpwd extends Component {

   constructor(props) {
      
      super(props);
  
      this.state = {username: ''}
      this.state = {email: ''}
    }

   showSuccess(){

      alert('success');
   }

   onResetPassword() {


      if (this.state.email !== "" && this.state.username !== "") {
        

        fetch(
         baseURL+`/send-password?username=${this.state.username}&email=${this.state.email}`,
          {
            method: "POST",
          }
        )
          .then((response) => response.json())
          
          .then((response)=> {
             NotificationManager.success("New Password Sent to your Email");
          })
          
          .catch((error) => {
         NotificationManager.error("Email Not sent.");
          });
      } else {
         NotificationManager.warning("Please enter an User Name & Email");
      }
    }

   render() {
      return (
         <QueueAnim type="bottom" duration={2000}>
            <div className="rct-session-wrapper" key="1">
               <AppBar position="static" className="session-header">
                  <Toolbar>
                     <div className="container">
                        <div className="d-flex justify-content-between">
                           <div className="session-logo">
                           <Link to="/">
                                 <img src={AppConfig.appLogo} alt="session-logo" className="img-fluid" width="180" height="180" />
                                 <span><h1 style={{ color: "#fff", marginTop: "-33px", marginLeft: "50px" }}></h1></span>
                              </Link>
                           </div>
                        </div>
                     </div>
                  </Toolbar>
               </AppBar>
               <div className="session-inner-wrapper p-4 h-100 p-md-0">
                  <div className="row">
                     <div className="col-sm-8 col-lg-5 mx-auto">
                        <div className="session-body text-center">
                           <div className="session-head mb-30">
                              <h2>Get started with {AppConfig.brandName}</h2>
                              
                           </div>
                           <Form>
                              {/* <FormGroup className="has-wrapper">
                                 <Input value={username} type="text" name="user-pwd" id="pwd" className="has-input input-lg"
                                 placeholder="Username" onChange={(event) =>this.setState({ password: event.target.value })}
                                 required />
                              
                                 <span className="has-icon">
                                 <VisibilityOffOutlinedIcon />
                                 </span>
                              </FormGroup> */}
                              <FormGroup className="has-wrapper">
                                 <Input type="text" name="Username" id="signin" className="has-input input-lg" placeholder="Enter User Name" onChange={(event) => this.setState({ username: event.target.value })} />
                                 <span className="has-icon"><i className="ti-user"></i></span>
                              </FormGroup>
                              <FormGroup className="has-wrapper">
                                 <Input type="email" name="user-mail" id="email" className="has-input input-lg" placeholder="Enter Email Address" onChange={(event) => this.setState({ email: event.target.value })} />
                                 <span className="has-icon"><i className="ti-email"></i></span>
                              </FormGroup>
                              <FormGroup>
                              <Button color="primary" className="btn-info text-white btn-block btn-large w-100" variant="contained" id="signin"
                                 onClick={() => this.onResetPassword()}>Reset Password</Button>

                              </FormGroup>
                              <Button component={Link} to="/signin" className="btn-dark btn-block btn-large text-white w-100">Already having account?  Login</Button>
                           </Form>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </QueueAnim>
      );
   }
}

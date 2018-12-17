import React, { Component } from 'react';

import './RegisterPage.css'
import {
  Row,
  Col,
  Container,
  Media,
  Jumbotron,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,

  Button
   } from 'reactstrap';
   import { Link } from 'react-router-dom';
   import DayPickerInput from 'react-day-picker/DayPickerInput';
   import 'react-day-picker/lib/style.css';
import "react-datepicker/dist/react-datepicker.css";
import logo from '../img/loginLogo.png';
import showcasePic from '../img/WebShowcaseProjectPresentation.png';
import axios from 'axios';
import { history } from '../_helper';

class RegisterPage extends Component {
    constructor(probs) {
      super(probs); 
      this.state = {
        username: '',
        password: '',
        phoneNumb:'',
        fname:'',
        lname:'',
        dob:undefined,

      
        errors: {}

      };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleUsernameChange = this.handleUsernameChange.bind(this);
      this.handlePasswordChange = this.handlePasswordChange.bind(this);
      this.handleFnameChange = this.handleFnameChange.bind(this);
      this.handleLnameChange = this.handleLnameChange.bind(this);
      this.handleDoBChange = this.handleDoBChange.bind(this);
    }

    handleValidation(){

      let username = this.state.username;
      let password = this.state.password;
      let errors = {};
      let formIsValid = true;
  
      //Name
      if(!username){
        formIsValid = false;
        errors["name"] = "Xin điền tên đăng nhập";
      }
  
  
    
      if(!password){
        formIsValid = false;
        errors["password"] = "Xin điền mật khẩu";
      }
      
    /*  if(!this.refs.check_me.checked){
        formIsValid = false;
        errors["checkbox"] = "Chọn đồng ý để tiếp tục";
      }
      */
      this.setState({errors: errors});
      return formIsValid;
    }


    handleUsernameChange(e) {
      this.setState({ username : e.target.value })
    }
    handlePasswordChange(e) {
      this.setState({ password : e.target.value })
    }
    handleFnameChange(e) {
      this.setState({ fname : e.target.value })
    }
    handleLnameChange(e) {
      this.setState({ lname : e.target.value })
    }
    handleDoBChange(selectedDay, modifiers, dayPickerInput) {
      const input = dayPickerInput.getInput();
      this.setState({
        dob:input.value,
      });
    }

    handleSubmit(e) {
      e.preventDefault();

      if(this.handleValidation()){
        
      

      axios.post('https://demo1clickapi.herokuapp.com/api/user/register',{ 
        username: this.state.username,
        password: this.state.password,
        firstName: this.state.fname,
        lastName: this.state.lname,
        dob: this.state.dob
        },)
        .then(function (response) {
          if(response.data.status ==='SUCCESS'){
            alert("Đăng ký thành công");
            history.push("/login");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      }
      else{
        alert("Xin điền đầy đủ thông tin")
      }
    }
    render(){
      
        return (
            
            <Container fluid className='container-fluid'  >
              <Row style={{margin:"0"}}>
                <Col sm="6" id="ColLeft"> 

                  
                  <Row>
                    <Col xs="12" id="TopLeft">        
                    <Media  src ={showcasePic} id="loginShowcasePic"  />
  
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="12" id="BotLeft">
                      <p id="copyright">©2018 OneClick Inc, All Rights Reservered </p>
                    </Col>
                  </Row>  
                </Col>
              
                <Col sm="6" >
                  <Row>
                    <Col xs="12">
                    <Link to="/"><Media id="registerLogo" src={logo}  /> </Link>
                      <Jumbotron  id ="registerForm">
                        <Container id="tempCont">
                          <Row id="RowJump">
                            <Col xs="8" id="registerFormLeftCol">
                              <h1 id ="dangkyText"> Đăng ký </h1>
                              <Form id ="registerFormGroup" onSubmit={this.handleSubmit}>
                                
                                <FormGroup id="usernameFormGroup">
                                  <Label>Username</Label>
                                  
                                  <Input type="text" name="username"  id="registerUsername" value={this.state.username} onChange={this.handleUsernameChange} required autofocus />
                                  <span className="error">{this.state.errors["name"]}</span>
                                </FormGroup>
                                
                                <FormGroup id="passwordFormGroup">
                                  <Label for="registerPassword">Mật khẩu</Label>
                                  <Input type="password" name="password" id="registerPassword" value={this.state.password} onChange={this.handlePasswordChange} required />
                                  <span className="error">{this.state.errors["password"]}</span>
                                </FormGroup>
                                
                                <Row form>
                                  <Col xs={6}>
                                    <FormGroup>
                                      <Label >Họ</Label>
                                      <Input type="text" name="lname" id="registerLname" value={this.state.lname} onChange={this.handleLnameChange}/>
                                      
                                    </FormGroup>
                                  </Col>
                                  <Col xs={6}>
                                    <FormGroup>
                                      <Label >Tên</Label>
                                      <Input type="text" name="fname" id="registerFname" value={this.state.fname} onChange={this.handleFnameChange} />
                                      
                                    </FormGroup>
                                  </Col>
                                </Row>
                                <FormGroup id="DoBFormGroup">
                                  <Label for="registerDoB">Ngày sinh</Label>
                                  
                                  <div>
                                  <DayPickerInput className="form-control" name="registerDoB"  id="registerDoB" onDayChange={this.handleDoBChange}/>
                                  </div>
                                </FormGroup>
                                <FormGroup style={{marginTop:"5%"}} check>
                                    <Label check>
                                        <Input type="checkbox" ref="check_me" />{' '}
                                        Tôi đồng ý với điều khoản của website
                                    </Label>
                                    <span className="error">{this.state.errors["checkbox"]}</span>

                                </FormGroup>
                                <Button type="submit" id="registerBtn" onClick={this.handleSubmit}>Đăng kí</Button>
                               {/* <Link to="/register" className="btn btn-link">Register</Link>
                                */}
                                
                              </Form>
                              
                            </Col>
  
                            <Col xs="4" id="loginRightCol">
                              
                            </Col>
                          </Row>
                        </Container>
                        </Jumbotron>
                    </Col>
                  </Row>
                </Col>
                
              </Row>
              
            </Container>
          );
    }
}

export default RegisterPage;
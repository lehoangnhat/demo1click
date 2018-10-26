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
  Link,

  Button
   } from 'reactstrap';
import logo from '../img/loginLogo.png';
import showcasePic from '../img/WebShowcaseProjectPresentation.png';
import axios from 'axios';

class RegisterPage extends Component {
    constructor(probs) {
      super(probs); 
      this.state = {
        username: '',
        password: '',
        phoneNumb:'',
        fname:'',
        lname:'',
        dob:''
      };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleUsernameChange = this.handleUsernameChange.bind(this);
      this.handlePasswordChange = this.handlePasswordChange.bind(this);
      this.handleFnameChange = this.handleFnameChange.bind(this);
      this.handleLnameChange = this.handleLnameChange.bind(this);
      this.handleDoBChange = this.handleDoBChange.bind(this);
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
    handleDoBChange(e) {
      this.setState({ dob : e.target.value })
    }

    handleSubmit(e) {
      e.preventDefault();
      axios.post('https://demo1clickapi.herokuapp.com/api/user/register',{ 
        username: this.state.username,
        password: this.state.password,
        firstName: this.state.fname,
        lastName: this.state.lname,
        dob: this.state.dob
        },)
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
      /*
      this.setState({ submitted: true });
      axios({
        method: 'post',
        url: 'http://localhost:9997/api/user/register',
        data: {
          email: this.state.email,
          username: this.state.username,
          password: this.state.password,
          phoneNumb: this.state.phoneNumb
        }
      });*/
    }
    render(){
      
        return (
            
            <Container fluid className='container-fluid'  >
              <Row style={{margin:"0"}}>
                <Col xs="6" id="ColLeft"> 

                  
                  <Row>
                    <Col xs="12" id="TopLeft">        
                    <Media  src ={showcasePic} fluid={false} id="loginShowcasePic"  />
  
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="12" id="BotLeft">
                      <p id="copyright">©2018 OneClick Inc, All Rights Reservered </p>
                    </Col>
                  </Row>  
                </Col>
              
                <Col xs="6" >
                  <Row>
                    <Col xs="12">
                      <Media id="registerLogo" src={logo} fluid={false} />
                      <Jumbotron  id ="registerForm">
                        <Container id="tempCont">
                          <Row id="RowJump">
                            <Col xs="8" id="registerFormLeftCol">
                              <h1 id ="dangkyText"> Đăng ký </h1>
                              <Form id ="registerFormGroup" >
                                
                                <FormGroup id="usernameFormGroup">
                                  <Label>Username</Label>
                                  <Input type="text" name="username"  id="registerUsername" value={this.state.username} onChange={this.handleUsernameChange} />
                                </FormGroup>
                                
                                <FormGroup id="passwordFormGroup">
                                  <Label for="loginPassword">Mật khẩu</Label>
                                  <Input type="password" name="password" id="loginPassword" value={this.state.password} onChange={this.handlePasswordChange}/>
                                </FormGroup>
                                {/*
                                <FormGroup id="usernameFormGroup">
                                  <Label for="registerUsername">Họ Tên</Label>
                                  <Input type="text" name="registerUsername"  id="registerUsername" onChange={this.handleUsernameChange} />
                                </FormGroup>
                                */}
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
                                  <Input type="text" name="registerDoB"  id="registerDoB" value={this.state.dob} onChange={this.handleDoBChange}/>
                                </FormGroup>
                                <FormGroup style={{marginTop:"5%"}} check>
                                    <Label check>
                                        <Input type="checkbox" />{' '}
                                        Tôi đồng ý với điều khoản của website
                                    </Label>
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
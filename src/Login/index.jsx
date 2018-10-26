import React, { Component } from 'react';
import axios from 'axios';
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
import logo from '../img/loginLogo.png';
import showcasePic from '../img/WebShowcaseProjectPresentation.png';
import { history } from '../_helper';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);

    // reset login status
    //this.props.dispatch(userActions.logout());

    this.state = {
        username: '',
        password: '',
        submitted: false
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUsernameChange(e) {
      this.setState({ username : e.target.value })
    }
    handlePasswordChange(e) {
      this.setState({ password : e.target.value })
    }

    handleSubmit(e) {
        e.preventDefault();
        
       /* axios.post('http://localhost:9997/api/user/login',
        {
        username: this.state.email,
        password: this.state.password
        })
      .then(function (response) {
        console.log('saved successfully');
      });*/
      
      let self = this
        axios({
          method: 'post',
          url: 'https://demo1clickapi.herokuapp.com/api/user/login',
          data: {
            username: this.state.username,
            password: this.state.password
          },
          

        })
        .then(function (response) {
          self.setState({submitted:true});
          sessionStorage.setItem('token', response.data);
          history.push("/");
          console.log(response);
          console.log(sessionStorage.getItem('token'))
        })
        .catch(function (error) {
          console.log('Error ')
        })
      }
  
    





    render() {
      
        return (
        
          <Container fluid className='container-fluid'  >
            <Row style={{margin:"0"}}>
              <Col xs="6" id="ColLeft">
                
                <Row >
                  <Col xs="12" id="TopLeft">        
                  <Media  src ={showcasePic} fluid="false" id="loginShowcasePic"  />

                  </Col>
                </Row>
                <Row >
                  <Col xs="12" id="BotLeft">
                    <p id="copyright">©2018 OneClick Inc, All Rights Reservered </p>
                  </Col>
                </Row>  
              </Col>
            
              <Col xs="6" >
                <Row>
                  <Col xs="12">
                    <Media id="loginLogo" src={logo} fluid="false" />
                    <Jumbotron  id ="loginForm">
                      <Container id="tempCont">
                        <Row id="RowJump">
                          <Col xs="8" id="loginFormLeftCol">
                            <h1 id ="dangnhapText"> Đăng Nhập </h1>
                            <Form id ="loginFormGroup" >
                              
                              <FormGroup id="emailFormGroup">
                                <Label for="loginEmail">Tài khoản</Label>
                                <Input type="text" name="text"  id="loginEmail" placeholder="Tên đăng nhập" value={this.state.username}  onChange={this.handleUsernameChange} />
                              </FormGroup>
                              <FormGroup id="passwordFormGroup">
                                <Label for="loginPassword">Mật khẩu</Label>
                                <Input type="password" name="password" id="loginPassword" placeholder="Mật khẩu" value={this.state.password}  onChange={this.handlePasswordChange} />
                              </FormGroup>
                              <Button id="loginBtn" onClick={this.handleSubmit}>Đăng nhập</Button>
                             {/* <Link to="/register" className="btn btn-link">Register</Link>
                              */}
                              <FormGroup id="forgetLink">
                                <Link to="/register"> Quên mật khẩu </Link>
                              </FormGroup>
                              <FormGroup id="registerLink">
                                <Link  to="/register" > Đăng ký tài khoản mới </Link>
                              </FormGroup>
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

export default Login;

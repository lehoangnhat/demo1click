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
import {NotificationContainer, NotificationManager} from 'react-notifications';

import 'react-notifications/lib/notifications.css';


class Login extends Component {
  constructor(props) {
    super(props);

    // reset login status
    //this.props.dispatch(userActions.logout());

    this.state = {
        username: '',
        password: '',
        errors: {}
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createNotification = this.createNotification.bind(this)
    }

    componentDidMount(){
      if(sessionStorage.getItem('isLogin')){
        history.push('/')
      }
    }


    createNotification (type) {
      return () => {
        switch (type) {
          case 'info':
            NotificationManager.info('Info message');
            break;
          case 'success':
            NotificationManager.success('', 'Đăng nhập thành công');
            break;
          case 'warning':
            NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
            break;
          case 'error':
            NotificationManager.error('Error message', 'Click me!', 5000, () => {
              alert('callback');
            });
            break;
        }
      }
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
      
      this.setState({errors: errors});
      return formIsValid;
    }

    handleUsernameChange(e) {
      this.setState({ username : e.target.value })
    }
    handlePasswordChange(e) {
      this.setState({ password : e.target.value })
    }

    handleSubmit(e) {
      
        e.preventDefault();
        
        if(this.handleValidation()){
        
      
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
          console.log(response.data)
          if(response.data.status ==='SUCCESS'){
            alert("Đăng nhập thành công")
            self.setState({submitted:true});
            sessionStorage.setItem('isLogin', response.data);
            sessionStorage.setItem('userData',JSON.stringify(response.data.data));
            sessionStorage.setItem('fName', response.data.data.firstName);
            sessionStorage.setItem('token',JSON.stringify(response.data.data.token ));
          

            history.push("/");
            console.log(response);
            
            
          }
          else if(response.data.status ==='ERROR'){
            NotificationManager.error('Error message', 'Click me!', 5000, () => {
              alert('callback');
            });
            let errors={}
            errors["name"] = "Sai tên đăng nhập hoặc mật khẩu";
            errors["password"] = "Sai tên đăng nhập hoặc mật khẩu";
            self.setState({errors: errors});
          }
        })
        .catch(function (error) {
          console.log('Error ')
        })

      }
      else{
        alert("Xin điền đầy đủ thông tin")
      }
    }
  
    





    render() {
      
        return (
        
          <Container fluid className='container-fluid'  >
          
            <Row style={{margin:"0"}}>
              <Col sm="6" id="ColLeft">
                
                <Row >
                  <Col sm='12' xs="12" id="TopLeft">        
                  <Media  src ={showcasePic} fluid="false" id="loginShowcasePic"  />

                  </Col>
                </Row>
                <Row >
                  <Col xs="12" id="BotLeft">
                    <p id="copyright">©2018 OneClick Inc, All Rights Reservered </p>
                  </Col>
                </Row>  
              </Col>
            
              <Col sm="6" >
                <Row>
                  <Col xs="12">
                  <Link to="/"> <Media id="loginLogo" src={logo} fluid="false" /> </Link>
                    <Jumbotron  id ="loginForm" >
                      <Container id="tempCont">
                        <Row id="RowJump">
                          <Col xs="8" id="loginFormLeftCol">
                            <h1 id ="dangnhapText"> Đăng Nhập </h1>
                            <Form onSubmit={this.handleSubmit} id ="loginFormGroup"  >
                              
                              <FormGroup id="emailFormGroup">
                                <Label for="loginEmail">Tài khoản</Label>
                                <Input type="text" name="text"  id="loginEmail" placeholder="Tên đăng nhập" value={this.state.username}  onChange={this.handleUsernameChange} />
                                <span className="error">{this.state.errors["name"]}</span>
                              </FormGroup>
                              <FormGroup id="passwordFormGroup">
                                <Label for="loginPassword">Mật khẩu</Label>
                                <Input type="password" name="password" id="loginPassword" placeholder="Mật khẩu" value={this.state.password}  onChange={this.handlePasswordChange} />
                                <span className="error">{this.state.errors["password"]}</span>
                              </FormGroup>
                              <FormGroup className="col-md-12 col-sm-12" style={{margin:0,paddingLeft:30,paddingRight:30}} >
                              <Button id="loginBtn" type="submit" onClick={this.handleSubmit}>Đăng nhập</Button>
                              <NotificationContainer/>
                              </FormGroup>
                             {/* <Link to="/register" className="btn btn-link">Register</Link>
                              */}
                             {/* <FormGroup id="forgetLink">
                                <Link to="#"> Quên mật khẩu </Link>
                              </FormGroup>
                            */}
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

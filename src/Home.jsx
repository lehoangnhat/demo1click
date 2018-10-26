import React, { Component } from 'react';
//import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
//import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Jumbotron, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  Container,
  Media,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroupAddon,
  Card, CardBody, CardImg, CardGroup, CardSubtitle,
  Button, CardHeader, CardFooter, CardBlock,
  CardTitle, CardText } from 'reactstrap';
import logo from './img/logo.png';
import showcasePic from './img/WebShowcaseProjectPresentation.png';

import './Home.css';
import { history } from './_helper';
import Login from './Login'; 
import PropTypes from 'prop-types';
import profilePic from './img/profile.jpg';
import axios from 'axios';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
      isLogin: this.props.isLogin,
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleQueryChange = this.handleQueryChange.bind(this);
  }
  handleQueryChange(e) {
    this.setState({ query : e.target.value })
  }
  handleSearch(e){
    e.preventDefault();
    axios.get('https://demo1clickapi.herokuapp.com/api/product/search',
    {
        params: {
            query: this.state.query
        }
    })
    .then(function (response) {
      let data = response.data.data.items; 
      /*
*/
        console.log(data);
        console.log(response.data.data.items);
        history.push(
          {
            pathname: '/result',
            state:{
              data
    
             }
          })
      })
      .catch(function (error) {
        console.log(error);
      });
}
  
   render() {
      let loginCompo;
      
      if(!sessionStorage.getItem('token')){
          loginCompo=
          <Media style ={{marginLeft:10}}>
              <Media left>
              <i className="fas fa-sign-in-alt" style={{marginRight:5}}></i>
              </Media>
              <Media body>
              <Link to="/login" >Đăng nhập/ Đăng kí</Link>
              </Media>
          </Media>
      }
      else{
          loginCompo=
          
          <Media style ={{marginLeft:10}}>
              <Media left>
                  <i className="fas fa-shopping-cart" style={{marginRight:5}}></i>
              </Media>
              <Media body>
                  Name
              </Media>
              <Media id="profilePic" src={profilePic} />

          </Media>
        
      }
    
      return (
        
        <Container fluid={true} className='container-fluid'  >
          <Row style={{padding:0, margin:0}} >
            <Col xs="6" >
              <Row>
                <Col xs="12" id="Rectangle-topLeft">          
                <Media id="logo" src={logo} fluid="false" />
        
                  <p id="introText">
                  1Click là nơi bạn có thể tìm thấy những mặt hàng cần thiết, cũng như bán sản phẩm từ chính cửa hàng của bạn.
                  <br/>
                  <br/>
                  Với 1Click, bạn không cần phải mất nhiều thời gian và chi phí để xây dựng cửa hàng online cho mình.
                  Tất cả chỉ mất vài giây click chuột, và hơn hết là hoàn toàn miễn phí.
                  </p>

                <Media id="showcasePic" src ={showcasePic} fluid="false"  />
                </Col>
              </Row>

              <Row>
                <Col xs="12" id ="Rectangle-botLeft-Left">
                  <p id="HomeCopyright">©2018 OneClick Inc, All Rights Reservered </p>
                  
                </Col>

              
              </Row>
            </Col>
           
            <Col xs="6" >
              <Row>
                <Col xs="12"  id="Rectangle-topRight">

                  
                  <Media id ="HomeLoginSignUp">
                    
                    <Media >
                      <Media left>
                      <i className="fas fa-edit" style={{marginRight:5}}></i>
                       
                      </Media>
                      <Media  body>
                        <a href="#">Đăng tin bán hàng </a>
                      </Media>
                    </Media>
                    {loginCompo}
                    
                  </Media>

                  

                  
                  <Form id="HomeSearcForm" inline>
                    
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    
                      <Input type="text" id="HomeSearchProductName" placeholder="Tìm sản phẩm"
                      value={this.state.query} onChange={this.handleQueryChange}/>

                    </FormGroup>
                   
                    <Button id ="HomeSearchBtn" onClick={ this.handleSearch}>
                      Tìm kiếm
                      </Button>
                    
                  </Form>
                  
                </Col>
              </Row>

              <Row>
                <Col xs="12" id ="bot-Right">
                
                </Col>
              </Row>
            </Col>
           
          </Row>
          
          
        </Container>
        
      );
    }
   
}
export default Home;

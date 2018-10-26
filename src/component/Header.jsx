import React, { Component } from 'react';

import {
    Row,
    Col,
    Container,
    Media,
    
    Form,
    Nav,
    Navbar,
    NavItem,
    NavbarBrand,
    NavbarToggler,
    NavLink,
    Collapse,
    UncontrolledDropdown,
    
    FormGroup,
    
    Input,
    
    Button } from 'reactstrap';


import './Header.css';
import logo from '../img/loginLogo.png';
import profilePic from '../img/profile.jpg';
import { Link } from 'react-router-dom';


class Header extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleQueryChange = this.handleQueryChange.bind(this);
        this.state = {
          isOpen: false,
          
        };
      }
    toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
    }
    handleQueryChange(e) {
        this.props.handleQueryChange(e);
    }
    handleSearch(e){
        this.props.handleSearch(e);
        
        
    }
    


    render() {
    let loginCompo;
    
    if(!sessionStorage.getItem('token')){
        loginCompo=
        <Media style ={{marginLeft:"5%"}}>
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
            <Link to="/cart">
              <i className="fas fa-shopping-cart" style={{marginRight:5}}></i>
            </Link>
                
            </Media>
            <Media body>
                Name
            </Media>
            <Media id="profilePic" src={profilePic} />

        </Media>
        

       
       
    }
      return (
          /*
        <Navbar id="SellerHeader" light expand="md">
        <NavItem style={{marginTop:"0.4%",marginBottom:"1.5%", marginLeft:"4%",height:"65%", width:"14%"}}>
                <Media id="HeaderLogo" src={logo} />
            </NavItem>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/components/">Components</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
            </NavItem>
            
          </Nav>
        </Collapse>
      </Navbar>
      */
        
        <Navbar id="SellerHeader" light expand="md">
             <NavbarBrand style={{paddingTop:"0.4%", paddingBottom:"2vh" ,marginLeft:"4%"}} href="/">
                <Media object src={logo} style={{maxWidth:"194px", maxHeight:"46px"}} />
             </NavbarBrand>
             
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
            <Nav style={{marginLeft:"3%", padding:0}} navbar>
            <NavItem style={{width:"41vw",padding:0,margin:0}}>
                
                <Row style={{padding:0,paddingTop:0, margin:0}} form="true">
                    
                    <Col style={{padding:5, margin:0, marginTop:"3%"}} md={6}>
                        <FormGroup>
                            <Input ref="searchBox" type="search" id="searchProductName" placeholder="Tìm sản phẩm"
                             value={this.props.query} onChange={this.handleQueryChange} />
                        </FormGroup>
                    </Col>
                    <Col style={{padding:5, margin:0, marginTop:"3%"}} md={3}>
                        
                        <Button id ="HeaderSearchBtn" onClick={this.handleSearch} >Tìm kiếm</Button>
                        
                    </Col>
                </Row>
                   
            
            </NavItem>
            <NavItem id ="NavLoginSignUp">
                <Media >
                
                    <Media  >
                        <Media left>
                        <i className="fas fa-edit" ></i>
                        </Media>
                        <Media id="dangtinText" body>
                            <Link to="/createPost" >Đăng tin bán hàng</Link>
                        </Media>
                    </Media>
                    
                    {loginCompo}
                    
                
                </Media>
                
            </NavItem>
            </Nav>
        </Collapse>
        </Navbar>
    
      );
    }
}
export default Header;
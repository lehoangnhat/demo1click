
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
    NavLink,
    FormGroup,
    Label,
    Input,
    
    Button } from 'reactstrap';
import logo from '../img/loginLogo.png';
import ggplay from '../img/ggplay.png';
import appstore from '../img/appstore.png';
import './Footer.css';

class Footer extends Component {
    render() {
      return (
        <Row id="FooterContainer" >
           
            
            <Col xs="12">
            <Row id="TopFooter">
                <Col xs="4">
                    <Media id="FooterLogo" src={logo} fluid="false" />
                </Col>

                <Col xs="2">
                    <h5 id="TextUD">ỨNG DỤNG</h5>
                    <Media id="imgAppstore" src={appstore}/>
                    <Media id="imgGooglePlay"src ={ggplay}/> 
                </Col>

                <Col xs="2" >
                    <h5 id="TextHoTro">HỖ TRỢ KHÁCH HÀNG</h5>
                    <Nav vertical>
                        <NavLink href="#">Trung tâm trợ giúp</NavLink>
                        <NavLink href="#">An toàn mua bán</NavLink>
                        <NavLink href="#">Truyền thông</NavLink>
                    </Nav>
                </Col>

                <Col xs="2">
                    <h5 id="TextHoTro">VỀ ONECLICK</h5>
                    <Nav vertical>
                        <NavLink  href="#">Giới thiều</NavLink>
                        <NavLink  href="#">Tuyển dụng</NavLink>
                        <NavLink  href="#">Blog</NavLink>
                    </Nav>
                </Col>

                <Col xs="2">
                    
                </Col>
            </Row>
            <Row >
                <Col xs="12" id="about">
                    <p id="allRight">©2018 OneClick Inc, All Rights Reservered  </p>
                </Col>
            </Row>
            </Col>
           
           
        </Row>
        
      );
    }
}
export default Footer;
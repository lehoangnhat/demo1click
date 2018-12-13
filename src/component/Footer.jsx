
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
           
            
            <Col md="12">
            <Row id="TopFooter">
                <Col id="logoCol" md="3">
                    <Media id="FooterLogo" src={logo} />
                </Col>

                <Col id="UDCol" md="3">
                    <h5 id="TextUD">ỨNG DỤNG</h5>
                    <Media className="img-fluid" id="imgAppstore" src={appstore}/>
                    <Media className="img-fluid" id="imgGooglePlay"src ={ggplay}/> 
                </Col>

                <Col id="HTCol" md="3" >
                    <h5 id="TextHoTro">HỖ TRỢ KHÁCH HÀNG</h5>
                    <Nav vertical>
                        <NavLink href="#">Trung tâm trợ giúp</NavLink>
                        <NavLink href="#">An toàn mua bán</NavLink>
                        <NavLink href="#">Truyền thông</NavLink>
                    </Nav>
                </Col>

                <Col id="HTCol" md="3">
                    <h5 id="TextHoTro">VỀ ONECLICK</h5>
                    <Nav vertical>
                        <NavLink  href="#">Giới thiệu</NavLink>
                        <NavLink  href="#">Tuyển dụng</NavLink>
                        <NavLink  href="#">Blog</NavLink>
                    </Nav>
                </Col>

                
            </Row>
            <Row >
                <Col md="12" id="about">
                    <p id="allRight">©2018 OneClick Inc, All Rights Reservered  </p>
                </Col>
            </Row>
            </Col>
           
           
        </Row>
        
      );
    }
}
export default Footer;
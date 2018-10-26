import React, { Component } from 'react';

import Header from '../component/Header';
import Footer from '../component/Footer';
import { 
    Form,
    FormGroup,
    Label,
    Input,
    Dropdown,
    DropdownItem,
    DropdownToggle,
    DropdownMenu,
    CustomInput,
    Media,
    BreadcrumbItem,
    Breadcrumb,
    Row,
    Col,
    Container, Jumbotron } from 'reactstrap';

class Seller_Dashboard extends Component{

    render(){
        return (
            <Container fluid={true} >
                <Header/>
                <Jumbotron id="DashboardJumbo">
                    <Row style={{margin:"0"}}>
                        <Col  xs="12" id="topRow"  >
                            <Label id="textHello">Xin chào ! </Label>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="3">
                            <Nav vertical>
                                <NavItem>
                                    <NavLink href="#">Quản lý tài khoản</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="#">Đơn hàng đang mua</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="#">Sản phẩm đang bán</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="#">Lịch sử giao dịch</NavLink>
                                </NavItem>
                            </Nav>
                        </Col>

                        <Col xs="9">

                        </Col>
                    </Row>

                    
                </Jumbotron>

                <Footer/>
            </Container>
        );
    }
}


export default Seller_Dashboard;


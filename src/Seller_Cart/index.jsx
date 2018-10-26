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


import './Seller_Cart.css';


class Seller_Cart extends Component{
    constructor(props) {
        super(props);
        this.state = {
            
        };
        
    }
    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    onMouseEnter() {
        this.setState({dropdownOpen: true});
    }

    onMouseLeave() {
        this.setState({dropdownOpen: false});
    }
    render(){
        


        return (
            <Container fluid="true" >
                <Header/>
                <Row>
                    <Col xs="9">
                        <Jumbotron id="jumboCartLeft">
                            <Row>
                                <Label>Giỏ hàng của bạn</Label>
                            </Row>
                            <Row>
                                
                            </Row>
                        </Jumbotron>
                    </Col>
                    <Col xs="3">
                    <Jumbotron id="jumboCartRight">

                        
                    </Jumbotron>
                    </Col>
                </Row>

                
            </Container>
        );
    }
}
export default Seller_Cart;
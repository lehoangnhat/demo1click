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

import { Menu } from 'react-data-menu';
import './Seller_CreatePost.css';


class Seller_CreatePost extends Component{
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.state = {
            dropdownOpen: false,
            file: '',
            imagePreviewUrl: ''
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
            <Container fluid={true} >
                <Header/>
                
                <Jumbotron id="jumboCreatePost">
                
                    <Row style={{margin:"0"}}>
                        <Col  xs="12" id="topRow"  >
                            <Label id="textDangtin">Đăng tin bán hàng </Label>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12">
                        <Form id="createPostForm">
                            <FormGroup>
                            <Label for="ProductNameBox">Tên mặt hàng</Label>
                            <Input type="text" name="ProductNameBox" id="ProductNameBox" placeholder="Nhập tên sản phẩm " />
                            </FormGroup>
                            <Row form>
                                <Col xs={4}>
                                    <FormGroup>
                                    <Label for="price">Giá bán</Label>
                                    <Input type="text" name="price" id="createPostPriceBox" placeholder="VND"/>
                                    </FormGroup>
                                </Col>
                                <Col xs={4}>
                                    <FormGroup>
                                    <Label for="quantity">Số lượng</Label>
                                    <Input type="text" name="quantity" id="createPostQuantityBox" placeholder="1 "/>
                                    </FormGroup>
                                </Col>
                                <Col xs={4}>
                                    <FormGroup>
                                    <Label for="producer">Nhà sản xuất</Label>
                                    <Input type="text" name="producer" id="createPostProducerBox" placeholder="Sony "/>
                                    </FormGroup>  
                                </Col>
                            </Row>

                            <FormGroup>
                                <Label for="exampleSelectMulti">Select Multiple</Label>
                                <Dropdown direction="right" onMouseOver={this.onMouseEnter} onMouseLeave={this.onMouseLeave} isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                        <DropdownToggle caret>
                                            Dropright
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem>Another Action</DropdownItem>
                                            <DropdownItem>Another Action</DropdownItem>
                                        </DropdownMenu>
                                </Dropdown>
                                

                            </FormGroup>

                            <FormGroup row>
                                <Label xs="3">Tình trạng sản phẩm :</Label>
                                
                                <Col xs="2">
                                    <CustomInput type="radio" id="radioNew" name="customRadio" label="Mới" />
                                </Col>
                                <Col xs="3">
                                    <CustomInput type="radio" id="radioUsed" name="customRadio" label="Đã qua sử dụng" />
                                </Col>
                                <Col xs="2">
                                    <CustomInput type="radio" id="radioOld" name="customRadio" label="Cũ"  />
                                </Col>
                                
                            </FormGroup>
                            
                        </Form>
                        



                        </Col>



                    </Row>
                </Jumbotron>
                
                
            </Container>
        );
    }
}
export default Seller_CreatePost;
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
  Progress,
  Button
   } from 'reactstrap';
import { history } from '../_helper';
import { Link } from 'react-router-dom';
import './Address.css'
import addressPic from '../img/address.jpg'



class Address extends Component {
    constructor(props) {
      super(props);
  
      // reset login status
      //this.props.dispatch(userActions.logout());
      let userData= JSON.parse(sessionStorage.getItem('userData'));
      this.state = {
        name: userData.lastName + ' ' + userData.firstName,
        sdt:'',
        address:'',
        note:''
      }
      this.handleSubmit=this.handleSubmit.bind(this);
      this.handleChange=this.handleChange.bind(this)
    }
    componentDidMount(){
        this.props.handleChangeState(false);
        
    }
    componentWillUnmount(){
        this.props.handleChangeState(true);
    }

    handleSubmit(e){
        e.preventDefault();
        history.push({
            pathname: '/payment',
            state: { sdt: this.state.sdt,
                    address: this.state.address,
                    note: this.state.note
                }
        });
    }
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    render(){
        return(
            <Container id="addressContain" fluid >
                <Jumbotron id="addressJumbo">
                    <Row>
                    <Col sm='2' md='2'>
                        <p className='paymentTab'> #Madonhang </p>
                        <Progress value={100} />
                        </Col>

                        <Col sm='4' md='4'>
                        <p className='paymentTab'> Đăng nhập</p> 
                        <Progress value={100} />                    
                        </Col>

                        <Col sm='4' md='4'>
                        <p className='paymentTabSelected'> Địa chỉ giao hàng </p>
                        <Progress value={50} />
                        </Col>
                        <Col sm='2' md='2'>
                        <p className='paymentTab'> Thanh toán </p> 
                        <Progress value={0} />
                        </Col>

                    </Row>
                    <Row>
                        <Col sm='6' md='6' style={{margin:0, padding:0}}>
                            <Media id='addressPic' src={addressPic}/>
                        </Col>

                        <Col sm='6' md='6'>
                            <Form id="addressForm">
                                <FormGroup>
                                    <Label >Họ và Tên</Label>
                                    <Input type="text" name="customerName" value={this.state.name} onChange={this.handleChange}/>
                
                                </FormGroup>

                                <FormGroup>
                                    <Label >Số điện thoại</Label>
                                    <Input type="text" name="phoneNumb"  onChange={this.handleChange}/>
                
                                </FormGroup>

                                <FormGroup>
                                    <Label >Địa chỉ giao hàng</Label>
                                    <Input type="textarea" name="address" onChange={this.handleChange}/>
                
                                </FormGroup>
                                <FormGroup>
                                    <Label >Ghi chú</Label>
                                    <Input type="textarea" name="note" onChange={this.handleChange}/>
                
                                </FormGroup>
                                <div id="addressBtnHolder">
                                <Button id="addressBtn" type="submit" onClick={this.handleSubmit}>
                                    Tiếp tục
                                </Button>
                                </div>
                                
                            </Form>
                        </Col>
                    </Row>

                </Jumbotron>
            </Container>



        )

    }

}

export default Address
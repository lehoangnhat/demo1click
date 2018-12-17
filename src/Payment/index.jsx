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
import './Payment.css'
import paymentPic from '../img/payment.jpg'
import 'react-credit-cards/es/styles-compiled.css';
import Card from 'react-credit-cards';
import {
    formatCreditCardNumber,
    formatCVC,
    formatExpirationDate,
    formatFormData,
  } from './utils';
  import { connect } from 'react-redux';
  import { removeFromCart } from '../_action/cartActions';
  import { cartCheckout } from '../_action/cartActions';
let userData= JSON.parse(sessionStorage.getItem('userData'));

class Payment extends Component {
    constructor(props) {
      super(props);
  
      
  
      this.state = {
        number: '',
        name: '',
        expiry: '',
        cvc: '',
        issuer: '',
        focused: '',
        formData: null,
        sdt:'',
        address:'',
        note:'',

        showATM:false
      }
      this.handleRadioButton = this.handleRadioButton.bind(this)
    }

    componentDidMount(){
        this.props.handleChangeState(false);
        
    }
    componentWillUnmount(){
        this.props.handleChangeState(true);
    }

    handleCallback = ({ issuer }, isValid) => {
        if (isValid) {
          this.setState({ issuer });
        }
      };
    
      handleInputFocus = ({ target }) => {
        this.setState({
          focused: target.name,
        });
      };
    
      handleInputChange = ({ target }) => {
        if (target.name === 'number') {
          target.value = formatCreditCardNumber(target.value);
        } else if (target.name === 'expiry') {
          target.value = formatExpirationDate(target.value);
        } else if (target.name === 'cvc') {
          target.value = formatCVC(target.value);
        }
    
        this.setState({ [target.name]: target.value });
      };
    
      handleSubmit = e => {
        e.preventDefault();
        if(this.state.showATM==true){
        const { issuer } = this.state;
        const formData = [...e.target.elements]
          .filter(d => d.name)
          .reduce((acc, d) => {
            acc[d.name] = d.value;
            return acc;
          }, {});
    
        this.setState({ formData });
        this.form.reset();
        }
        else{
            
        }

        this.props.cartCheckout();
        alert('Thanh toán thành công')
      };
      handleRadioButton(value) {
        this.setState({
            showATM: value
        });
      }

    render(){
        const { name, number, expiry, cvc, focused, issuer, formData } = this.state;
        let formATM;
        if(!this.state.showATM) {
            formATM = <div> </div>
          }
        else if(this.state.showATM) {
        
         formATM = (
            <div id="formATM">
            <Card
            number={number}
            name={name}
            expiry={expiry}
            cvc={cvc}
            focused={focused}
            callback={this.handleCallback}
            issuer="visa"
        />
        <form ref={c => (this.form = c)} onSubmit={this.handleSubmit}>
            <div className="form-group" style={{marginTop:'2%'}}>
            <input
                type="tel"
                name="number"
                className="form-control"
                placeholder="Card Number"
                pattern="[\d| ]{16,22}"
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
            />
            <small>E.g.: 49..., 51..., 36..., 37...</small>
            </div>
            <div className="form-group">
            <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Name"
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
            />
            </div>
            <div className="row">
            <div className="col-6">
                <input
                type="tel"
                name="expiry"
                className="form-control"
                placeholder="Valid Thru"
                pattern="\d\d/\d\d"
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
                />
            </div>
            <div className="col-6">
                <input
                type="tel"
                name="cvc"
                className="form-control"
                placeholder="CVC"
                pattern="\d{3,4}"
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
                />
            </div>
            </div>
            <input type="hidden" name="issuer" value={issuer} />
            
        </form>
        </div>
        )
    }

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
                        <p className='paymentTab'> Địa chỉ giao hàng </p>
                        <Progress value={100} />
                        </Col>
                        <Col sm='2' md='2'>
                        <p className='paymentTabSelected'> Thanh toán </p> 
                        <Progress value={50} />
                        </Col>
                    </Row>
                    <Row>
                        <Col sm='6' md='6' style={{margin:0, padding:0}}>
                            <Media id='paymentPic' src={paymentPic}/>
                        </Col>

                        <Col sm='6' md='6' style={{textAlign: 'center'}}>
                        <Form style={{display:'inline-block', textAlign:'left', marginTop:'2%'}}>
                        <FormGroup check>
                            <Label check>
                            <Input type="radio" name="radio1" id="notATM" value={false} onChange={()=>this.handleRadioButton(false)} defaultChecked/>
                            Thanh toán khi nhận hàng
                            </Label>
                        </FormGroup>

                        <FormGroup check>
                            <Label check>
                            <Input type="radio" name="radio1" id="ATM" value={true} onChange={()=>this.handleRadioButton(true)} />
                            Thanh toán qua ATM
                            </Label>
                        </FormGroup>
                        </Form>


                        {formATM}
                        <div id="thanhtoanBtnHolder">
                            <Button id="thanhtoanBtn" type="submit" onClick={this.handleSubmit}>
                                Thanh toán
                            </Button>
                        </div>
                        </Col>
                    </Row>

                </Jumbotron>
            </Container>



        )

    }

}

function mapStateToProps(state, props) {
    return {
        cart: state.cart
    };
}

function mapDispatchToProps(dispatch) {
    return {
        cartCheckout: ()=> dispatch(cartCheckout()),
        removeFromCart: item => dispatch(removeFromCart(item)),
      
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Payment)
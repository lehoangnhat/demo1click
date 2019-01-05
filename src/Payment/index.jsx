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
        address:this.props.address,
        note:this.props.note,
        productIdList:[],
        productQuantityList:[],
        buyQuantity:this.props.buyQuantity,
        showATM:false,
        listBuy:[]
      }
      this.handleRadioButton = this.handleRadioButton.bind(this);
      this.validateForm = this.validateForm.bind(this);
      this.handleDecreaseQuantity = this.handleDecreaseQuantity.bind(this);
      this.handleSendAddress = this.handleSendAddress.bind(this);
      this.handleSubmit=this.handleSubmit.bind(this);
     
    }
    validateForm(formId)
    {
        var inputs, index;
        var form=document.getElementById(formId);
        inputs = form.getElementsByTagName('input');
        console.log(inputs)
        for (index = 0; index < inputs.length; ++index) {
            // deal with inputs[index] element.
            if(inputs[index].name!='issuer'){
                if (inputs[index].value==null || inputs[index].value=="")
                {
                 
                    return false;
                }
            }
        }
        return true
    }

    componentDidMount(){
        this.props.handleChangeState(false);
        let tempTotal =0;
        let tmpListID =[];
        let tmpQList = [];
        let tmpBuyList =[];
        
        this.props.cart.map(( item, index) => {
            
            tmpListID.push(item.id);
            tmpQList.push(item.quantity);
            tmpBuyList.push(item)
        });
        
        this.setState({
            
            productIdList: tmpListID,
            listBuy:tmpBuyList,
            productQuantityList:tmpQList
            
        })
    }
    componentWillUnmount(){
        this.props.handleChangeState(true);
    }

    handleSendAddress(){
        
        let token = JSON.parse(sessionStorage.getItem('token'));

        let self = this;
        axios({
        url: 'https://demo1clickapi.herokuapp.com/api/user/order',
        method: 'post',
        headers:{
            "x-access-token": token,
        },
        data:{
            productIDs:self.state.listBuy,
            note:self.state.note,
            shippingAddress:self.state.address
        }
        
        
        
        }).then(function (response){
         
            //self.props.cartCheckout();
            //self.handleDecreaseQuantity();


        }).catch(function (error) {
            console.log(error);
          });
    }

    handleDecreaseQuantity(){
    
        let self=this;
        for(var i=0;i<this.state.productIdList.length;i++){
            
            let pid = this.state.productIdList[i];
            
            let pQuant = parseInt(this.state.productQuantityList[i]) - parseInt(this.state.buyQuantity[i])
            console.log(pQuant)
            axios({
                url: 'https://demo1clickapi.herokuapp.com/api/product/'+pid,
                method: 'put',
                data:{
                    quantity:pQuant.toString()
                }
                
                
                
                }).then(function (response){
                });
        }
        alert('Thanh toán thành công')
        self.props.cartCheckout();
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
    
      handleSubmit(e){
        e.preventDefault();
        if(this.state.showATM==true){
            if(!this.validateForm('tmpForm')){
                alert('Xin điền đầy đủ thông tin')
            }
            else{
                this.handleDecreaseQuantity();
                this.handleSendAddress();
                this.form.reset();
        }
    }
        else{
            
            this.handleDecreaseQuantity();
            this.handleSendAddress();
         // this.props.cartCheckout();
            
        }

        
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
            formATM = <div id="thanhtoanBtnHolder">
            <Button id="thanhtoanBtn" onClick={this.handleSubmit}>
                Thanh toán
            </Button>
        </div>
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
        <form ref={c => (this.form = c)} onSubmit={this.handleSubmit} id="tmpForm">
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
            <div id="thanhtoanBtnHolder" className="form-actions">
                <button className="btn btn-primary btn-block" id="thanhtoanBtn" onClick={this.handleSubmit}>
                    Thanh toán
                </button>
            </div>
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
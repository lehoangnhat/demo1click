import React, { Component } from 'react';

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
    Container, Jumbotron,
    Button,
    Card,
    CardText,
    CardBody,
    CardTitle,
    CardImg
} from 'reactstrap';

import './Seller_Cart.css';

import { connect } from 'react-redux';
import { removeFromCart } from '../_action/cartActions';
import { cartCheckout } from '../_action/cartActions';
import data from '../data/data.json';
import ReactLoading from 'react-loading';
import axios from "axios";
import { history } from '../_helper';

class Seller_Cart extends Component{
    constructor(props) {
        super(props);
        this.state = {
            productsTemp: data,
            totalPrice: 0,
            productIdList:[],
            productQuantityList:[],
        };

        this.handleRemove = this.handleRemove.bind(this);
        this.handleCheckout = this.handleCheckout.bind(this);
        this.handleDecreaseQuantity = this.handleDecreaseQuantity.bind(this);
    }
    


    componentDidMount(){
        this.props.handleChangeState(false);
        
    }
    componentWillUnmount(){
        this.props.handleChangeState(true);
    }
    componentWillReceiveProps(nextprops){
        let tempTotal =0;
        let tmpListID =[];
        let tmpQList = [];
        nextprops.cart.map(( item, index) => {
            tempTotal = tempTotal + parseInt(item.price);
            tmpListID.push(item.id);
            tmpQList.push(item.quantity);
        });
        
        this.setState({
            totalPrice: tempTotal,
            productIdList: tmpListID,
            productQuantityList:tmpQList
        })
    }
    handleDecreaseQuantity(){

        for(var i=0;i<this.state.productIdList.length;i++){
            console.log('updatequantity')
            let pid = this.state.productIdList[i];
            let pQuant = this.state.productQuantityList[i] - 1
            console.log(pQuant)
            axios({
                url: 'https://demo1clickapi.herokuapp.com/api/product/'+pid,
                method: 'put',
                data:{
                    quantity: pQuant-1
                }
                
                
                
                }).then(function (response){
                    console.log(response.data)
        
                });
        }
    }

    handleRemove(item){
        this.props.removeFromCart(item);
        this.setState({
            totalPrice: this.props.cart.length
        })
    }

    handleCheckout(){
        history.push('/address')


       /* let token = JSON.parse(sessionStorage.getItem('token'));

        let self = this;
        axios({
        url: 'http://localhost:9997/api/user/order',
        method: 'post',
        headers:{
            "x-access-token": token,
        },
        data:{
            productIDs:self.state.productIdList,
            note:'',
            shippingAddress:''
        }
        
        
        
        }).then(function (response){
            //alert('Thành công');
            //self.props.cartCheckout();
            //self.handleDecreaseQuantity();


        });

        */
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
        const formatter = new Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0
          })
      const cartList = this.props.cart.map(( item, index) =>{
        return (
            <Media key={index} style={{paddingBottom:"1%",paddingTop:"1%",borderBottom:"1px #E9E9E9 solid"}}> 
            <Media left src={item.images+'.jpg'} alt="productImg" id="cartProductImg"/>
            <Media body>
            
                <Media id="cartProductName">{item.name}</Media>
               {/* <Media id="cartSellerName"> Người bán: </Media>
                */}
                <Media id="cartPrice"> {formatter.format(item.price)} </Media>
                <Media id="cartRemoveText"  onClick={ () => { this.handleRemove(item)
            }} 
                    onMouseEnter={() => {
                        document.body.style.cursor = "pointer";
                    }}
                    onMouseLeave={() => {
                        document.body.style.cursor = "default";
                    }}> 
                    Xóa 
                </Media>
            </Media>
        </Media>
        )

       
        /*
        
    */
      });

        return (
            <Container id="cartContain" fluid >
            {this.props.loading ? <ReactLoading id="loading" type="spin" color="grey" height={200} width={200} /> :  null}
                <Row>
                    <Col xs="9" md="9">
                    <Jumbotron id="jumboCartLeft">
                            <Row style={{ height:"6%",backgroundColor:"#FAFAFA"}}>
                                <Label id="cartLeftLabel">Giỏ hàng của bạn</Label>
                            </Row>
                            <Row >
                                <Col style={{paddingBottom:"2%",paddingTop:"2%"}} md="12" xs="12">
                                    {cartList}
                                </Col>
                            </Row>
                        </Jumbotron>
                    </Col>
                    <Col style={{padding:0, margin:0 }} md="3">
                    <Jumbotron id="jumboCartRight">
                    <Row style={{height:"6%",backgroundColor:"#FAFAFA"}}>
                        <Col xs="12" md="12">
                        <Label id="cartRightLabel" >Hóa đơn</Label>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12" xs="12">
                            <Row>
                            <Label id="tongGiaText">Tổng giá</Label>
                            </Row>
                            <Row>
                            <Label id="totalNumb">{formatter.format(this.state.totalPrice)} </Label>
                            </Row>
                            <Row>
                            <Button id="checkoutButton" onClick={this.handleCheckout}> Thanh toán </Button>
                            </Row>
                        </Col>

                    </Row>
                        
                    </Jumbotron>
                    </Col>
                </Row>

                
            </Container>
        );
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
export default connect(mapStateToProps, mapDispatchToProps)(Seller_Cart);
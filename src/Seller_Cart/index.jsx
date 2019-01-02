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
            listBuy:[],
            quantity:[],
            defaultQuant:1
        };

        this.handleRemove = this.handleRemove.bind(this);
        this.handleCheckout = this.handleCheckout.bind(this);
        this.handleChangeQuantity = this.handleChangeQuantity.bind(this);
       
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
        let tmpBuyList =[];
        let tmpQuanList=[];
        nextprops.cart.map(( item, index) => {
            tempTotal = tempTotal + parseInt(item.price);
            tmpListID.push(item.id);
            tmpQList.push(item.quantity);
            tmpBuyList.push(item)
            tmpQuanList.push(1)
        });
        
        this.setState({
            totalPrice: tempTotal,
            productIdList: tmpListID,
            productQuantityList:tmpQList,
            listBuy:tmpBuyList,
            quantity:tmpQuanList
        })
    }
    
    handleChangeQuantity(e,index){
        let tmpQ = this.state.quantity;
        tmpQ[index] = e.target.value;
        this.setState({
            quantity:tmpQ
        }) 

    }

    handleRemove(item){
        this.props.removeFromCart(item);
        
    }

    handleCheckout(){
        
        //this.handleDecreaseQuantity();
        if(this.state.productIdList.length<=0){
            alert("Không có hàng")
        }
        else{
            this.props.handleCartQuantity(this.state.quantity)
            history.push('/address')
        }
        


        // let token = JSON.parse(sessionStorage.getItem('token'));

        // let self = this;
        // axios({
        // url: 'http://localhost:9997/api/user/order',
        // method: 'post',
        // headers:{
        //     "x-access-token": token,
        // },
        // data:{
        //     productIDs:self.state.listBuy,
        //     note:'',
        //     shippingAddress:''
        // }
        
        
        
        // }).then(function (response){
        //     alert('Thành công');
        //     //self.props.cartCheckout();
        //     //self.handleDecreaseQuantity();


        // });

        
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
                <Row>
                <Col sm="8" md="8">
                    <Media id="cartProductName">{item.name}</Media>
                {/* <Media id="cartSellerName"> Người bán: </Media>
                    */}
                    <Media id="cartPrice"> {formatter.format(item.price)} </Media>
                    <Media id="cartRemoveText"  onClick={ () => { this.handleRemove(item)}} 
                        onMouseEnter={() => {
                            document.body.style.cursor = "pointer";
                        }}
                        onMouseLeave={() => {
                            document.body.style.cursor = "default";
                        }}> 
                        Xóa 
                    </Media>
                </Col>
                <Col sm="4" md="4">
                    <Input style={{maxWidth:"40%"}} type="number" step="1" value={this.state.quantity[index]} onChange={(e)=>this.handleChangeQuantity(e,index)} />
                </Col>
                </Row>
            </Media>
            
        </Media>
        )

       
        /*
        
    */
      });

        return (
            <Container id="cartContain" fluid >
            
                <Row>
                    <Col sm="9" md="9">
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
                    <Col style={{padding:0, margin:0 }} sm="3" md="3">
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
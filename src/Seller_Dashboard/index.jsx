import React, { Component } from 'react';

import { Router, Route, Link, Switch } from 'react-router-dom';
import { history } from '../_helper';

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
    Nav,
    NavLink,
    NavItem,

    Row,
    Col,
    Container, Jumbotron } from 'reactstrap';

import UserInfo from '../component/UserInfo';
import OrderList from '../component/OrderList';
import SellingList from '../component/SellingList';

import './Seller_Dashboard.css'

import axios from 'axios';
import ReactLoading from 'react-loading';

class Seller_Dashboard extends Component{
    constructor(props) {
        super(props);
        this.state={
            sellingProduct:[],
            orderProduct:[]
        }
        this.getSellingProduct = this.getSellingProduct.bind(this);
        this.getOrderProduct = this.getOrderProduct.bind(this);
        this.reloadOrderList = this.reloadOrderList.bind(this);
    }
    
    reloadOrderList(){
       
        this.getSellingProduct();
    }

    getSellingProduct(){
        let token = JSON.parse(sessionStorage.getItem('token'));
        let self= this;
        axios.get('https://demo1clickapi.herokuapp.com/api/user/product',
        {
            headers:{
                "x-access-token": token,
            }
        }).then(function(response) {
          
            
            self.setState({
                sellingProduct:response.data.data.items
            })
        }).catch(function(error) {
            
            console.log(error);
        })
    }
    getOrderProduct(){
        let token = JSON.parse(sessionStorage.getItem('token'));
        let self= this;
        axios.get('https://demo1clickapi.herokuapp.com/api/user/order',
        {
            headers:{
                "x-access-token": token,
            }
        }).then(function(response) {
            self.setState({
                orderProduct:response.data.data.items
            })   
        
        })
    }
    componentDidMount(){
        this.props.handleChangeState(false);
        this.getSellingProduct();
        this.getOrderProduct();

        
    }
    componentWillUnmount(){
        this.props.handleChangeState(true);
    }

    render(){
        let fname = sessionStorage.getItem('fName');
        return (
        <Router history={history}>
            <Container id="DashboardContainer" fluid >
            
                
                <Jumbotron id="DashboardJumbo">
                    <Row style={{margin:"0"}}>
                        <Col  xs="12" id="topRow"  >
                            <Label id="textHello">Xin chào {fname} ! </Label>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{borderRight:"1px solid #E9E9E9"}} sm="3" md="3">
                            <Nav vertical>
                                <NavItem>
                                    <Link to="/dashboard/">Quản lý tài khoản</Link>
                                </NavItem>
                                <NavItem>
                                    <Link to="/dashboard/order">Đơn hàng đã mua</Link>
                                </NavItem>
                                <NavItem>
                                <Link to="/dashboard/selling">Sản phẩm đang bán</Link>
                                </NavItem>
                
                            </Nav>
                        </Col>

                        <Col sm="9" md="9">
                            <Switch>
                                <Route exact path="/dashboard/" component={UserInfo} />
                                <Route path="/dashboard/order" render={(props) => <OrderList {...props} orderList={this.state.orderProduct} handleSelected={this.props.handleSelected} /> } />
                                <Route path="/dashboard/selling" render={(props) => <SellingList {...props} sellingList={this.state.sellingProduct} handleSelected={this.props.handleSelected} reloadOrderList={this.reloadOrderList} /> }/>
                            </Switch>
                        </Col>
                    </Row>

                    
                </Jumbotron>

            
            </Container>
        </Router>
        );
    }
}


export default Seller_Dashboard;


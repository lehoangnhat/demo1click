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
            console.log(response.data)
            
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
            console.log(response.data)
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
            {this.props.loading ? <ReactLoading id="loading" type="spin" color="grey" height={200} width={200} /> :  null}
                
                <Jumbotron id="DashboardJumbo">
                    <Row style={{margin:"0"}}>
                        <Col  xs="12" id="topRow"  >
                            <Label id="textHello">Xin chào {fname} ! </Label>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{borderRight:"1px solid #E9E9E9"}} xs="3">
                            <Nav vertical>
                                <NavItem>
                                    <Link to="/dashboard/">Quản lý tài khoản</Link>
                                </NavItem>
                                <NavItem>
                                    <Link to="/dashboard/order">Đơn hàng đang mua</Link>
                                </NavItem>
                                <NavItem>
                                <Link to="/dashboard/selling">Sản phẩm đang bán</Link>
                                </NavItem>
                             {/*   <NavItem>
                                    <Link to="#" >Lịch sử giao dịch</Link>
                                </NavItem>
                             */}
                            </Nav>
                        </Col>

                        <Col xs="9">
                            <Switch>
                                <Route exact path="/dashboard/" component={UserInfo} />
                                <Route path="/dashboard/order" render={(props) => <OrderList {...props} orderList={this.state.orderProduct} handleSelected={this.props.handleSelected} /> } />
                                <Route path="/dashboard/selling" render={(props) => <SellingList {...props} sellingList={this.state.sellingProduct} handleSelected={this.props.handleSelected} /> }/>
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


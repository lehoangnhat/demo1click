import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import './Seller_SearchResult.css'

import ProductList from './component/ProductList';
import axios from "axios";
import { history } from './_helper';

import {
    Row,
    Col,
    Container,
    Jumbotron,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
     } from 'reactstrap';

     import { connect } from 'react-redux';
     import { addToCart } from './_action/cartActions';

     import ReactLoading from 'react-loading';

class Seller_SearchResult extends Component{

    constructor(props) {
        super(props);
        this.state = {
          products: this.props.productsList,
          
        };
        
    }

   

    componentDidMount(){
        this.props.handleChangeState(false);
    }
    componentWillUnmount(){
        this.props.handleChangeState(true);
    }

    render() {
        return(
            
            <Container fluid id ="sellerContainer" >
                {this.props.loading ? <ReactLoading id="loading" type="spin" color="grey" height={200} width={200} /> :  null}
                <Row  id="productListRow"  >
                <Col  xs="3" id="FilterCol">

                    <Form id="producerFilter">
                        <Label for="exampleCheckbox">Filter 1</Label>
                        <hr style={{marginTop:0}}/>
                        <FormGroup check inline>
                        
                        <Label check>
                            <Input type="checkbox" /> Apple
                        </Label>
                        </FormGroup>
                        <FormGroup check inline>
                        <Label check>
                            <Input type="checkbox" /> Sony
                        </Label>
                        </FormGroup>
                    </Form>
                    <Form id="priceFilter">
                        <Label >Filter 2</Label>
                        <hr style={{marginTop:0}}/>
                        <FormGroup check inline>
                        
                        <Label check>
                            <Input type="checkbox" /> 3 - 10 triệu
                        </Label>
                        </FormGroup>
                        <FormGroup check >
                        <Label check>
                            <Input type="checkbox" /> 10 - 20 triệu
                        </Label>
                        </FormGroup>
                        
                    </Form>
                   
                </Col>
                
                <Col  xs="9">
                    <Jumbotron id="resultJumbo">
                    <ProductList
                        productsList={this.props.productsList}
                        handleSelected={this.props.handleSelected}
                        
                    />
                    
                    </Jumbotron>
                </Col>
                </Row>
                
                 
                    
            </Container>
        )
    }
}
function mapStateToProps(state, props) {
    return {
        products: state.products
    }
}
function mapDispatchToProps(dispatch) {
    return {
        addToCart: item => dispatch(addToCart(item))
    }
}


export default  connect(mapStateToProps, mapDispatchToProps)(Seller_SearchResult);
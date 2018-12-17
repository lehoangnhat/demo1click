import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import './Seller_SearchResult.css'

import ProductList from './component/ProductList';
import axios from "axios";
import { history } from './_helper';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css'
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
          priceRange: { min: 0, max: 5000000 },
        };
        
    }

   

    componentDidMount(){
        this.props.handleChangeState(false);
    }
    componentWillUnmount(){
        this.props.handleChangeState(true);
    }

    render() {
        const formatter = new Intl.NumberFormat('de-DE', {
            style: 'decimal',
            
            minimumFractionDigits: 0
          })
        return(
            
            <Container fluid id ="sellerContainer" >
                {this.props.loading ? <ReactLoading id="loading" type="spin" color="grey" height={"10%"} width={"10%"} /> :  null}
                <Row  id="productListRow"  >
                <Col  sm="3" md="2" id="FilterCol">

                    {/*<Form id="producerFilter">
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
        */}
                    <Form id="priceFilter">
                        <Label >Lọc theo giá</Label>
                        <hr style={{marginTop:0}}/>
                        
                        <InputRange
                
                            maxValue={10000000}
                            minValue={0}
                            value={this.state.priceRange}
                            onChange={priceRange => this.setState({ priceRange })}
                            step={100000}
                            formatLabel={value =>formatter.format(value) }
                            />
                    
                        
                    </Form>
                   
                </Col>
                
                <Col  sm="9" md="8">
                    <Jumbotron id="resultJumbo">
                    <ProductList
                        productsList={this.props.productsList}
                        handleSelected={this.props.handleSelected}
                        priceMin = {this.state.priceRange.min}
                        priceMax = {this.state.priceRange.max}
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
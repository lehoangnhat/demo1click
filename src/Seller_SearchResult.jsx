import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import './Seller_SearchResult.css'
import Header from './component/Header';
import Footer from './component/Footer';

import ProductList from './component/ProductList';
import axios from "axios";

import {
    Row,
    Col,
    Container,
    Jumbotron,
    Form,
    FormGroup,
    Label,
    Input,
     } from 'reactstrap';

class Seller_SearchResult extends Component{

    constructor(props) {
        super(props);
        this.state = {
          products: this.props.location.state.data,
          query:"",
          isSubmit:false
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.handleQueryChange = this.handleQueryChange.bind(this);
        this.updateProducts = this.updateProducts.bind(this);
    }

    updateProducts(){
        this.setState({isSubmit:true })
    }

    handleQueryChange(e) {
        this.setState({ query : e.target.value })
    }

    handleSearch(e) {
        e.preventDefault();
        let self=this;
        axios.get('http://localhost:9997/api/product/search',
        {
            params: {
                query: this.state.query
            }
        })
        .then(function (response) {
            console.log(response.data.data.items);
            self.setState({products : response.data.data.items,
                            isSubmit: true
            })
            self.updateProducts(response.data.data.items)
            
          })
          .catch(function (error) {
            console.log(error);
          });

    }
    

    render() {
        return(
            <Container fluid id ="sellerContainer" >
                <Header
                handleSearch={this.handleSearch}
                handleQueryChange={this.handleQueryChange}
                query ={this.state.query}
                updateProducts = {this.updateProducts}
                />
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
                        productsList={this.state.products}
                    />
                    
                    </Jumbotron>
                </Col>
                </Row>
                <Footer/>
                
                 
                    
            </Container>
        )
    }
}

export default Seller_SearchResult;
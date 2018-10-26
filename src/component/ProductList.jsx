import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Product from './Product';
import {
  Row,
  Col,
  Container,
   } from 'reactstrap';
import LoadingProducts from "../Loader/Products";
import NoResults from "../Empty/NoResults";
import JwPagination from 'jw-react-pagination';
import './ProductList.css';
/*const ProductList = ({ products, showDetails }) => {*/
  const customStyles = {
    ul: {
        backgroundColor: 'red'
    },
    li: {
        border: '1px solid green'
    },
    a: {
        color: 'blue'
    }
};
const customStyle={
  ul: {
    width: '40%',
    marginTop: '',
  },
  a:{
    backgroundColor: '#FFFFFF',
    border: '1px solid #E9E9E9',
    boxSizing: 'border-box',
    margin:'0.5%',
    width:'11%',
    
    
  }

};
const customLabels = {
    
  first: '<<',
  last: '>>',
  previous: '<',
  next: '>'
    
};
  class ProductList extends Component {
    constructor(props) {
      super(props); 
     
            
            
      this.onChangePage = this.onChangePage.bind(this);

      // store example items and current page of items in local state
      this.state = {
          isChange: this.props.isChange,
          productsData: this.props.productsList,
          pageOfItems: []
      };
    }
    onChangePage(pageOfItems) {
      // update local state with new page of items
      this.setState({ pageOfItems });
    }
    render() {
    

    let view;

    view = (
      <Row id="ProductList">
        
        {this.state.pageOfItems.map(product => 
                  <Product
                    key={product.id}
                    price={product.price}
                    name={product.name}
                    image={product.image}
                    id={product.id}
                    location ={product.location}
                    description = {product.description}
                  />
                )}
        
      </Row>
      );
    
  return <div>{view} <JwPagination pageSize={12} items={this.props.productsList} onChangePage={this.onChangePage} labels={customLabels} styles={customStyle} /></div>;
  }
}



export default ProductList;
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

import { connect } from 'react-redux';
import { addToCart } from '../_action/cartActions';

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
          productsData: this.props.productsList,
          pageOfItems: []
      };
    }
    onChangePage(pageOfItems) {
      // update local state with new page of items
      this.setState({ pageOfItems });
    }
    componentDidMount(){
      
    }
    render() {
    let view;
    
    let term = this.props.filterTerm;
  
    view = (
      <Row id="ProductList">
        
        {this.state.pageOfItems
       // .filter((product)=>product.name.includes(term) )
        //.filter((product)=>product.price > 1000)
        .map((product,index) => 
                  <Product 
                    index ={index}
                    product={product}
                    handleSelected={this.props.handleSelected}
                    selectedP={this.props.selectedP}
                  />
                )
                }
        
      </Row>
      );
    
    
    
  return (
    
    <div>{view} <JwPagination pageSize={12} items={this.props.productsList} onChangePage={this.onChangePage} labels={customLabels} styles={customStyle} /></div>
  );
  
  }
}
function mapStateToProps(state, props) {
  return {
      products: state.products
  };
}
function mapDispatchToProps(dispatch) {
  return {
      addToCart: item => dispatch(addToCart(item))
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
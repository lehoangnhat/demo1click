import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';

import './Product.css'; 
import { history } from '../_helper';
import { connect } from 'react-redux';
import { addToCart } from '../_action/cartActions';

class Product extends Component{
/*const Product = ({ product, showDetails }) => (
  */

  constructor(props) {
    super(props);
  }
  render() {
    let product = this.props.product;
    let image = this.props.product.images + '.jpg';
    
    let name = this.props.product.name;
    let price = this.props.product.price;
    let location =this.props.product.location;
    let id = this.props.product.id;
    let description = this.props.product.description;
    const formatter = new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0
    })
    return (
      <Card key={this.props.index} id="productCard" onClick={() => {
        this.props.handleSelected(product);
        document.body.style.cursor = "default";
        history.push({
          pathname: '/detail'
        }); 
        
      }
      } 
      onMouseEnter={() => {
        document.body.style.cursor = "pointer";
      }}
      onMouseLeave={() => {
        document.body.style.cursor = "default";
      }}
      >
      <CardImg top src={image} alt="productImg" id="cardImg"/>
      <CardBody>
          <CardTitle id="productName">{name}</CardTitle>
          <CardText id="price">{formatter.format(price)}</CardText>
         
        </CardBody>
      </Card>
      
    );
  }
}
/*
*/
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


export default connect(mapStateToProps, mapDispatchToProps)(Product);
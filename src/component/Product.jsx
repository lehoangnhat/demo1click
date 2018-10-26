import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';

import './Product.css'; 
import { history } from '../_helper';

class Product extends Component{
/*const Product = ({ product, showDetails }) => (
  */

  constructor(props) {
    super(props);
  }
  render() {
    let image = this.props.image;
    let name = this.props.name;
    let price = this.props.price;
    let location =this.props.location;
    let id = this.props.id;
    let description = this.props.description;
    return (
      <Card id="productCard" onClick={() => history.push({
        pathname: '/detail',
        state:{
          image,
          name,
          price,
          location,
          description,

          id

         }
      })
    }>
      <CardImg top src={image} alt="productImg" id="cardImg"/>
      <CardBody>
          <CardTitle id="productName">{name}</CardTitle>
          <CardText id="price">Giá:{price}</CardText>
          <CardText id="location">Địa chỉ{location}</CardText>
        </CardBody>
      </Card>
    );
  }
}


export default Product;
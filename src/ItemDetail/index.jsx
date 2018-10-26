import React, { Component } from 'react';

import Header from '../component/Header';
import Footer from '../component/Footer';

import './ItemDetail.css';
import Slider from "react-slick";
import {history} from "../_helper/history"
import data from '../data/data.json';
import redshoe from '../img/redshoe.jpg'

import { 
    Media,
    BreadcrumbItem,
    Breadcrumb,
    Row,
    Col,
    Button,
    Container, Jumbotron } from 'reactstrap';
import Product from '../component/Product';
import axios from 'axios'
class ItemDetail extends Component{
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      cart: [],
      quantity: 1,
      query:""
    };
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleQueryChange = this.handleQueryChange.bind(this);
  }
  getProducts() {
        
    this.setState({
      products: data
    });

  }
  componentWillMount() {
    this.getProducts();
  }

  handleQueryChange(e) {
    this.setState({ query : e.target.value })
}

handleSearch(e) {
    e.preventDefault();
    let self=this;
    axios.get('https://demo1clickapi.herokuapp.com/api/product/search',
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


  handleAddToCart(selectedProducts) {
    let cartItem = this.state.cart;
    let productID = selectedProducts.id;
    let productQty = selectedProducts.quantity;
    if (this.checkProduct(productID)) {
      console.log("hi");
      let index = cartItem.findIndex(x => x.id == productID);
      cartItem[index].quantity =
        Number(cartItem[index].quantity) + Number(productQty);
      this.setState({
        cart: cartItem
      });
    } else {
      cartItem.push(selectedProducts);
    }
    this.setState({
      cart: cartItem,
      cartBounce: true
    });
  }
  checkProduct(productID) {
    let cart = this.state.cart;
    return cart.some(function(item) {
      return item.id === productID;
    });
  }
      render() {
        let itemData = this.state.products
        .map(product => {
          return (
            
              <Product 
                key={product.id}
                price={product.price}
                name={product.name}
                image={product.image}
                id={product.id}
                location ={product.location}
                
              />
            
          );  
      });
        let settings = {
          dots: true,
          infinite: true,
          speed: 500,
          autoplay:true,
          autoplay: true,
          autoplaySpeed: 2000,
          pauseOnHover: true,
          slidesToShow: 5,
          slidesToScroll: 1,
          initialSlide: 0,
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                initialSlide: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
        };
        
        let buyButton;
    
    if(!sessionStorage.getItem('token')){
      buyButton=
        <Button onClick={() => history.push('/login') } > Đăng nhập để mua hàng </Button>
    }
    else{
      buyButton=
      <Button onclick={this.props.addToCart}> Thêm vào giỏ hàng </Button>
    }
        return (
          <Container fluid={"true"} id="DetailContainer" >
            <Header
            cartItems={this.state.cart}
            
            />

            <Jumbotron id="topJumbo">
                    <Row>
                    <Col xs="12">
                    <Breadcrumb>
                        <BreadcrumbItem active>Home</BreadcrumbItem>
                    </Breadcrumb>
                    </Col>
                    </Row>
                    <Row>
                      <Col xs="7">
                        <Media src="this.props.location.state.image" alt="image" id ="thumbnailPic"/>
                        <p>
                        {this.props.location.state.description}
                        </p>
                       
                          
                      </Col>

                      <Col xs="5">
                        <h2> {this.props.location.state.name} </h2>
                        <h3> Giá {this.props.location.state.price} </h3>
                        <h3> Địa chỉ {this.props.location.state.price} </h3>
                        {buyButton}
                      </Col>
                    </Row>
                    

                </Jumbotron>
                
                    <Row id ="recommendRow">
                      <Col xs="12">
                        <Media>Sản phẩm tương tự </Media>
                      </Col>
                    </Row>
                    <Row id="recommendSlider">
                      <Col xs="12"  >
                     
                        <Slider  {...settings} >
                          
                          {itemData}
                        
                        </Slider>
                      
                      </Col>
                    </Row>
                <Footer/>

                
        </Container>
            
            
        );
       
      }
    }
    
    
    export default ItemDetail;
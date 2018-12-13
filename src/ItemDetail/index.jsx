import React, { Component } from 'react';



import './ItemDetail.css';
import Slider from "react-slick";
import {history} from "../_helper/history"
import data from '../data/data.json';

import axios from "axios";
import ReactLoading from 'react-loading';
import { 
    Media,
    BreadcrumbItem,
    Breadcrumb,
    Row,
    Col,
    Button,
    Container, Jumbotron } from 'reactstrap';
import Product from '../component/Product';


import { connect } from 'react-redux';
import { addToCart } from '../_action/cartActions';

class ItemDetail extends Component{
  constructor(props) {
    super(props);
    this.state = {
      productsTemp: [],
      isAdded:false,
    };
    this.handleAddAnimation = this.handleAddAnimation.bind(this);
    
  }

 

  handleAddAnimation(){
    this.setState({
      isAdded: true
    },
    function() {
      setTimeout(() => {
        this.setState({
          isAdded: false,
          selectedProduct: {}
        });
      }, 2000);
    });
  }
  getProducts() {
    let sID = this.props.selected.id;
    let self = this;
    axios.get('https://demo1clickapi.herokuapp.com/api/product/related/'+sID,
    {
      params:{
        page:1,
        limit:20
      }
    })
    .then(function (response) {
        console.log(response.data);
        let data= response.data.data.items;
        self.setState({
          productsTemp: data
        });
        
      })
      .catch(function (error) {
        console.log(error);
      });

    

  }
  componentWillMount() {
    this.getProducts();
  }
  componentDidMount(){
    this.props.handleChangeState(false);
    if(this.props.selected.length ===0){
      history.push('/')
    }
}
componentWillUnmount(){
    this.props.handleChangeState(true);
}
      render() {
        let itemData = this.state.productsTemp
        .map(product => {
          return (
            
              <Product 
                product = {product}
                handleSelected={this.props.handleSelected}
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
              breakpoint: 1280,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
                infinite: true,
                dots: true
              }
            },
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
        <Button id="detailBtn" onClick={() => history.push('/login') } > Đăng nhập để mua hàng </Button>
    }
    else{
      buyButton=
      <Button id="detailBtn" onClick={() => {
        this.props.addToCart(this.props.selected);
        this.handleAddAnimation();
        
      }
      }> {!this.state.isAdded ? "Thêm vào giỏ hàng" : "✔ Đã thêm"}   </Button>
    }
    const formatter = new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0
    })
        return (
          <Container fluid={"true"} id="DetailContainer" >
          {this.props.loading ? <ReactLoading id="loading" type="spin" color="grey" height={200} width={200} /> :  null}
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
                        <Media src={this.props.selected.images+'.jpg'} alt="image" id ="thumbnailPic"/>
                        <p style={{paddingLeft:"5%"}}>
                        {this.props.selected.description}
                        </p>
                       
                          
                      </Col>

                      <Col xs="5">
                        <h2> {this.props.selected.name} </h2>
                        <h6> {this.props.selected.categoryID} </h6>
                        <h3 style={{color:"#FEAF34"}}> {formatter.format(this.props.selected.price)} </h3>
                        
                        {buyButton}
                      </Col>
                    </Row>
                    

                </Jumbotron>
                <Jumbotron id="recommendJumbo">
                    <Row id ="recommendRow">
                      <Col style={{padding:"1%",backgroundColor:"#FAFAFA"}} xs="12">
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
              </Jumbotron>

                
        </Container>
            
            
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
  
    export default connect(mapStateToProps, mapDispatchToProps)(ItemDetail);
import React, { Component } from 'react';
//import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
//import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Jumbotron, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  Container,
  Media,
  Form,
  FormGroup,
  Label,
  Input,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  InputGroupAddon,
  Card, CardBody, CardImg, CardGroup, CardSubtitle,
  Button, CardHeader, CardFooter, CardBlock,
  Badge,
  CardTitle, CardText } from 'reactstrap';
import logo from './img/logo.png';
import showcasePic from './img/WebShowcaseProjectPresentation.png';

import './Home.css';

import profilePic from './img/blank_male.png';
import axios from 'axios';
import categoryData from './data/category.json';
import { connect } from 'react-redux';
import { removeFromCart } from './_action/cartActions';
import { cartCheckout } from './_action/cartActions';
import Suggestions from './component/Suggestion'

import Autosuggest from 'react-autosuggest';
import AutosuggestHighlightMatch from 'autosuggest-highlight/match';
import  AutosuggestHighlightParse from 'autosuggest-highlight/parse';
import ReactLoading from 'react-loading';


function getSuggestionProduct(){
  let suggestList=[];
  axios({
    url: 'https://api.myjson.com/bins/zpkwk',
    method: 'get',
  }).then(function (response){
    
    for(var i=0;i<response.data.length;i++){
      suggestList.push(response.data[i])
    }
    
    
  })
 

  return suggestList
  

}


const product = getSuggestionProduct();

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value) {
  const escapedValue = escapeRegexCharacters(value.trim());
  
  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('\\b' + escapedValue, 'i');
  
  return product.filter(product => regex.test(getSuggestionValue(product)));
}

function getSuggestionValue(suggestion) {
  return `${suggestion.name}`;
  
}

function renderSuggestion(suggestion, { query }) {
  const suggestionText = `${suggestion.name} `;
  const matches = AutosuggestHighlightMatch(suggestionText, query);
  const parts = AutosuggestHighlightParse(suggestionText, matches);

  return (
    <span className={'suggestion-content ' + suggestion.twitter}>
      <span className="name">
        {
          parts.map((part, index) => {
            const className = part.highlight ? 'highlight' : null;

            return (
              <span className={className} key={index}>{part.text}</span>
            );
          })
        }
      </span>
    </span>
  );
}

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: this.props.query,
      isLogin: this.props.isLogin,
      category: categoryData,

      results: this.props.results,

      value: '',
      suggestions: []
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.loginToggle = this.loginToggle.bind(this);
    this.getFeatureProduct = this.getFeatureProduct.bind(this);
    this.handleCategoryClick= this.handleCategoryClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
    this.props.handleQueryChangeTemp(newValue)
  };
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  
  componentDidMount(){
    //this.getFeatureProduct();
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleSearch(e)
    }
  }

  handleCategoryClick(event,categoryName){

    this.props.handleCategoryClick(event,categoryName);

  }
  getFeatureProduct(){
    axios.get('http://localhost:9997/api/product/new',
    {
      
    })
    .then(function (response) {
      console.log(response.data) 
      
    })
      .catch(function (error) {
        console.log(error);
      });
  }
  loginToggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  handleQueryChange(e) {
    this.props.handleQueryChange(e)
    /*
    this.setState({ query : e.target.value })
    */
  }

  handleLogout(e){
    this.props.handleLogout(e);
  }
  handleSearch(e){
    this.props.handleSearch(e)
    /*
    e.preventDefault();
    axios.get('http://localhost:9997/api/product/search',
    {
        params: {
            query: this.state.query
        }
    })
    .then(function (response) {
      let data = response.data.data.items; 
      /*

        console.log(data);
        console.log(response.data.data.items);
        history.push(
          {
            pathname: '/result',
            state:{
              data,
             }
          })
      })
      .catch(function (error) {
        console.log(error);
      });*/
}



   render() {
      let loginCompo;
      const value = this.state.value;
      const suggestions  = this.state.suggestions;
      const inputProps = {
      placeholder: "Tìm sản phẩm",
      value,
      onChange: this.onChange
      };
  
      if(!sessionStorage.getItem('isLogin')){
          loginCompo=(
          <Media style ={{marginLeft:10}}>
              <Media left>
              <i className="fas fa-sign-in-alt" style={{marginRight:5}}></i>
              </Media>
              <Media body>
              <Link to="/login" >Đăng nhập/ Đăng kí</Link>
              </Media>
          </Media>
          )
      }
      else{
        let userName = sessionStorage.getItem("fName");
        loginCompo=(
                
                <Media style ={{ marginLeft:"10%"}} className="align-items-center">
                    <Media left>
                    <Link to="/cart">
                    <i className="fas fa-shopping-cart" style={{marginRight:5}}>
                    
                      {this.props.cart.length > 0 ? 
                        <Badge color="danger">{this.props.cart.length}</Badge>
                        :
                        null

                      } 
                    </i>
                    </Link>
                    </Media>
                    <Media>
                        {userName}
                        
                    </Media>
                    <Dropdown style={{marginLeft:"10%",padding:0}} isOpen={this.state.dropdownOpen} toggle={this.loginToggle}>
                    <DropdownToggle
                    tag="span"
                    onClick={this.loginToggle}
                    data-toggle="dropdown"
                    aria-expanded={this.state.dropdownOpen}
                    >
                     
                    
                    
                    <Media id="HomeProfilePic" src={profilePic} 
                    onMouseEnter={() => {
                      document.body.style.cursor = "pointer";
                    }}
                    onMouseLeave={() => {
                        document.body.style.cursor = "default";
                    }} />

                    </DropdownToggle>
                    <DropdownMenu style={{padding:"20%"}} right>
                    <div onClick={this.loginToggle}>
                          <Link to='/dashboard'>Thông tin tài khoản</Link>
                        </div>
                        <div onClick={this.loginToggle}>
                          <Link to='/dashboard/selling'>Đơn hàng đang bán</Link>
                        </div>
                        <div onClick={this.loginToggle}>
                          <Link to='/dashboard/order'>Đơn hàng đang mua</Link>
                        </div>
                        <div onClick={this.loginToggle}>
                            <Link to="/" onClick={this.handleLogout} > Đăng xuất </Link>
                        </div>
                    </DropdownMenu>
                
                
                
                
            </Dropdown>
                   
                    
                    
                    
                    
                    
            </Media>
            
        )

        
      }

      let categoryView = this.state.category.map((item,index)=>{
        return(
        <Col sm="4" xs="4" style={{margin:0,padding:0}} key={index} onClick={(e)=> this.handleCategoryClick(e,item.name)}
        onMouseEnter={() => {
          document.body.style.cursor = "pointer";
        }}
        onMouseLeave={() => {
          document.body.style.cursor = "default";
        }}
        >
          
          <div className="categoryText">
            {item.name}
          </div>
          <img className="img-responsive" alt="categoryImg" src={item.image} />
          
          
        

          </Col>
        )}
    );
      let dangtinCompo;
      if(sessionStorage.getItem('isLogin'))
      dangtinCompo =  
        <Link to='/createPost'>Đăng tin bán hàng </Link>
      
      else{
        dangtinCompo=
        <Link to='/login' onClick={()=>alert('Vui lòng đăng nhập')}>Đăng tin bán hàng </Link>
      }



      return (
        
        <Container fluid id="homeContainer"  >
        {this.props.loading ? <ReactLoading id="loading" type="spin" color="grey" height={200} width={200} /> :  null}
          <Row style={{padding:0, margin:0}} >
            <Col sm="6"  >
              <Row>
                <Col md="12" xs="12" id="Rectangle-topLeft">          
                <Media id="logo" src={logo} fluid="false" />
        
                  <p id="introText">
                  1Click là nơi bạn có thể tìm thấy những mặt hàng cần thiết, cũng như bán sản phẩm từ chính cửa hàng của bạn.
                  <br/>
                  <br/>
                  Với 1Click, bạn không cần phải mất nhiều thời gian và chi phí để xây dựng cửa hàng online cho mình.
                  Tất cả chỉ mất vài giây click chuột, và hơn hết là hoàn toàn miễn phí.
                  </p>

                <Media id="showcasePic" src ={showcasePic} fluid="false"  />
                </Col>
              </Row>

              <Row>
                <Col md="12" xs="12" id ="Rectangle-botLeft-Left">
                  <p id="HomeCopyright">©2018 OneClick Inc, All Rights Reservered </p>
                  
                </Col>

              
              </Row>
            </Col>
           
            <Col sm="6" xs="12"  >
              <Row>
                <Col md="12" xs="12"  id="HometopRight">

                  
                  <Media id ="HomeLoginSignUp" className="align-items-center">
                    
                    <Media >
                      <Media left>
                      <i className="fas fa-edit" style={{marginRight:5}}></i>
                       
                      </Media>
                      <Media  body>
                      
                        {dangtinCompo}
                      </Media>
                    </Media>
                    {loginCompo}
                    
                  </Media>

                  

                  
                  <Form id="HomeSearcForm" onSubmit={this.handleSearch} inline>
                  
                    <FormGroup >
                    
                   {/*  <Input type="text" id="HomeSearchProductName" placeholder="Tìm sản phẩm"
                      value={this.props.query} onChange={this.handleQueryChange} onKeyPress={this.handleKeyPress}/>
      */}
                    <Autosuggest 
                        suggestions={suggestions}
                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                        getSuggestionValue={getSuggestionValue}
                        renderSuggestion={renderSuggestion}
                        inputProps={inputProps}

                        />
                    
                    </FormGroup>
                   
                    <Button id ="HomeSearchBtn" onClick={ this.handleSearch}>
                      Tìm kiếm
                      </Button>
                      
                  </Form>
                  
                </Col>
              </Row>

              <Row style={{margin:0,padding:0}}>
                <Col style={{margin:0,padding:0}} md="12" sm="12" id ="HomeBotRight">
                  <Row id="categoryContainer" style={{margin:0,padding:0}}>
                    
                  {categoryView}
                    
                  </Row>
                </Col>
              </Row>
            </Col>
           
          </Row>
          
          
        </Container>
        
      );
    }
   
}
function mapStateToProps(state, props) {
  return {
      cart: state.cart
  };
}
function mapDispatchToProps(dispatch) {
  return {
      cartCheckout: ()=> dispatch(cartCheckout()),
      removeFromCart: item => dispatch(removeFromCart(item)),
    
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);

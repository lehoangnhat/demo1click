import React, { Component } from 'react';

import {
    Row,
    Col,
    Container,
    Media,
    
    Form,
    Nav,
    Navbar,
    NavItem,
    NavbarBrand,
    NavbarToggler,
    NavDropdown,
    MenuItem,
    NavLink,
    Collapse,
    DropdownItem ,
    Dropdown,
    DropdownMenu,
    DropdownToggle,
    UncontrolledDropdown,
    
    FormGroup,
    Badge,
    
    Input,
    
    Button } from 'reactstrap';


import './Header.css';
import logo from '../img/loginLogo.png';
import profilePic from '../img/blank_male.png';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { removeFromCart } from '../_action/cartActions';
import { cartCheckout } from '../_action/cartActions';

import Autosuggest from 'react-autosuggest';
import AutosuggestHighlightMatch from 'autosuggest-highlight/match';
import  AutosuggestHighlightParse from 'autosuggest-highlight/parse';
import axios from 'axios';

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
class Header extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleQueryChange = this.handleQueryChange.bind(this);
        this.loginToggle = this.loginToggle.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this)
        this.state = {
          isOpen: false,
          dropdownOpen: false,

          value: '',
      suggestions: []
        };
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
    
    toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
    }
    handleKeyPress(e) {
        if (e.key === 'Enter') {
          this.handleSearch(e)
        }
    }
    handleQueryChange(e) {
        this.props.handleQueryChange(e);
    }
    handleSearch(e){
        this.props.handleSearch(e);
        
    }
    handleLogout(e){
        this.props.handleLogout(e);
    }
    loginToggle() {
        this.setState({
          dropdownOpen: !this.state.dropdownOpen
        });
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
        <Media style={{ height:'100%'}} className="align-items-center">
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
                
                <Media style={{ height:'100%'}} className="align-items-center">
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
                    <Media >
                        {userName}
                        
                    </Media>
                    <Dropdown style={{marginLeft:"5%",padding:0}} isOpen={this.state.dropdownOpen} toggle={this.loginToggle}>
                    <DropdownToggle
                    tag="span"
                    onClick={this.loginToggle}
                    data-toggle="dropdown"
                    aria-expanded={this.state.dropdownOpen}
                    >
                     
                    
                    <img id="profilePic" src={profilePic} onMouseEnter={() => {
                        document.body.style.cursor = "pointer";
                    }}
                    onMouseLeave={() => {
                        document.body.style.cursor = "default";
                    }}/>
                    
                    </DropdownToggle>
                    <DropdownMenu style={{paddingLeft:"10%"}}right>
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
    let dangtinCompo;
      if(sessionStorage.getItem('isLogin'))
      dangtinCompo =  
        <Link to='/createPost'>Đăng tin bán hàng </Link>
      
      else{
        dangtinCompo=
        <Link to='/login' onClick={()=>alert('Vui lòng đăng nhập')}>Đăng tin bán hàng </Link>
      }

      return (
        
        
        <Navbar id="SellerHeader" light expand="md">
             <NavbarBrand style={{  paddingTop:"0.4%", paddingBottom:"2vh" ,marginLeft:"4%"}} >
               <Link to="/"> <Media object src={logo} style={{maxWidth:"194px", maxHeight:"46px"}} /> </Link>
             </NavbarBrand>
             
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
            <Nav style={{marginLeft:"3%", padding:0}} navbar>
            <NavItem id="NavHeaderSearch"  >
               <Form onSubmit={this.handleSearch}>
                <Row style={{padding:0, margin:0}}>
                    
                    <div className="col-md-7 offset-md-2">
                        
                      {/*  <Input ref="searchBox" type="search" id="searchProductName" placeholder="Tìm sản phẩm"
                            value={this.props.query} onChange={this.handleQueryChange}  onKeyPress={this.handleKeyPress} />
                        */}
                        <Autosuggest 
                        suggestions={suggestions}
                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                        getSuggestionValue={getSuggestionValue}
                        renderSuggestion={renderSuggestion}
                        inputProps={inputProps}

                        />
                    </div>
                    <div className="col-md-3">
                        
                        <Button id ="HeaderSearchBtn" onClick={this.handleSearch} >Tìm kiếm</Button>
                        
                    </div>
                </Row>
                
              </Form>
            </NavItem>
            <NavItem  id ="NavLoginSignUp">
               <Row style={{ margin:0,height:'100%'}}>
                <div  className="col-md-5 offset-md-1">
                    <Media style={{ height:'100%'}} className="align-items-center">
                        <Media left>
                        <i className="fas fa-edit" ></i>
                        </Media>
                        <Media id="dangtinText" body>
                            {dangtinCompo}
                        </Media>
                    </Media>
                </div>
                <div className="col-md-6">
                    {loginCompo}
                </div>
                </Row>
                
                
                
            </NavItem>
            </Nav>
        </Collapse>
        </Navbar>
        
    
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
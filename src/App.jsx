import React, { Component } from 'react';

import Home from './Home';
import Login from './Login';
import './App.css';
import Seller_SearchResult from './Seller_SearchResult';
import ItemDetail from './ItemDetail';
import RegisterPage from './RegisterPage';
import Seller_CreatePost from './Seller_CreatePost';
import Seller_Cart from './Seller_Cart';
//import Login from './Guest_Search_Result';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from './_helper';





class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/result" component={Seller_SearchResult}/>
            <Route path="/detail" component={ItemDetail}/>
            <Route path="/register" component={RegisterPage} />
            <Route path="/createPost" component={Seller_CreatePost} />
            <Route path="/cart/:value" component={Seller_Cart}/>
           {/*<Route path="/result" component={Seller_CreatePost}/>*/}
        </div>
      </Router>
    
       /* <Home
        isLogin={false}
        />
    */
    

    // <div className="App">      
    //     <form className="navbar-form navbar-right" style={{marginRight: 15}}>
    //         <input type="text" className="form-control" placeholder="Search"></input>
    //     </form>
            
    // </div>
    );
  }
}

export default App;
//export default ParamsExample;
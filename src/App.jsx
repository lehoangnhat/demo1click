import React, { Component } from 'react';

import Home from './Home';
import Login from './Login';
import './App.css';
import Seller_SearchResult from './Seller_SearchResult';
import ItemDetail from './ItemDetail';
import RegisterPage from './RegisterPage';
import Seller_CreatePost from './Seller_CreatePost';
import Seller_Cart from './Seller_Cart';
import Dashboard from './Seller_Dashboard'

import Header from './component/Header';
import Footer from './component/Footer';

//import Login from './Guest_Search_Result';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { addToCart } from './_action/cartActions';

import { history } from './_helper';

import axios from "axios";




var TfIdf = require('./component/TfIdf')

var tfIdf = new TfIdf()

function xoa_dau(str) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  return str;
}

function tokenize(str){
  return str.split(' ');
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHome : true,        
      query :"",
      cart: [],
      selectedProduct :"",
      products:[],
      loading: false,
      tmpSuggest:[]
    };
    this.handleChangeState = this.handleChangeState.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handleSelected = this.handleSelected.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleCategoryClick = this.handleCategoryClick.bind(this);
    this.handleQueryChangeTemp= this.handleQueryChangeTemp.bind(this);
  }

  componentDidMount(){
    let tmpsize=0;
    let tmpdata=[];
    let self= this;
    axios({
      url: 'https://api.myjson.com/bins/zpkwk',
      method: 'get',
      }).then(function (response){
        tmpsize= response.data.length;
       if(response.data.length>=10){
              tmpsize = 10;
            }
       for(var i=0;i<tmpsize;i++){
         tmpdata.push(response.data[i]);
       }
       self.setState({
        tmpSuggest:tmpdata
      })
      })
    
  }

  handleQueryChangeTemp(value){
    this.setState({
      query:value
    })
  }

  handleCategoryClick(e,categoryName){
    e.preventDefault();
    this.setState({
      loading:true
    })
    let self=this;
    axios.get('https://demo1clickapi.herokuapp.com/api/product/search',
    {
        params: {
            query: categoryName
        }
    })
    .then(function (response) {
      let data = response.data.data.items; 
      /*
*/
        console.log(data);
        console.log(response.data.data.items);
        self.setState({
          products : response.data.data.items,
          loading:false      
        })
      
        history.push(
          {
            pathname: '/result',
          })
        
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  handleLogout(e){
    e.preventDefault();
    sessionStorage.clear();
    
  }
  
  handleChangeState(_isHome){
    this.setState({
      isHome : _isHome,
    })
  }

  handleQueryChange(e) {
    this.setState({ query : e.target.value })
  }

  handleSearch(e) {
    e.preventDefault();
    this.setState({
      loading:true
    })
    let self=this;
    axios.get('https://demo1clickapi.herokuapp.com/api/product/search',
    {
        params: {
            query: this.state.query
        }
    })
    .then(function (response) {
        
      
        let resultArr=[];
  
        let itemList = response.data.data.items;
        let bm25score;
        let queryTerm = tokenize(self.state.query);
        for(var i =0;i<itemList.length;i++){
            let tempArr={weight:0,item:null}
            resultArr.push(tempArr);

        }
        for(var i=0;i<queryTerm.length;i++){
          
          var tempTerm = xoa_dau(queryTerm[i]).toLowerCase();
          //var tempTerm = queryTerm[i].toLowerCase();
          bm25score = tfIdf.weights(itemList,tempTerm)
          for(var j=0; j<bm25score.length;j++){
            resultArr[j].weight = resultArr[j].weight + bm25score[j].weight;
            resultArr[j].item = bm25score[j].items;
          }
          
        }
        const sortedResult = [].concat(resultArr)
          .sort((a, b) => parseFloat(a.weight,10) - parseFloat(b.weight,10)).reverse();
        let finalResult = []
        for(var i=0;i<sortedResult.length;i++){
          finalResult.push(sortedResult[i].item);
        }
       
        self.setState({
          products : finalResult,   
          loading: false,
        })
        
        history.push(
          {
            pathname: '/result',
          })




          // var tmpdata2=[];
          // let tmpsize=0;
          // console.log(tmpdata2)
          //  if(self.state.products.length >0){  
          
          // let count = 0;
          // axios({
          //   url: 'https://api.myjson.com/bins/zpkwk',
          //   method: 'get',
          //   }).then(function (response){
          //   tmpsize = response.data.length;
          //   console.log(response.data)
          //   if(response.data.length>=10){
          //     tmpsize = 10;
          //   }
          //   for(var i=0;i<tmpsize;i++){
          //     console.log(i);
          //   }
          //   console.log('tmp2');
          // console.log(tmpdata2)
          // })
       
        
        


        
      
      

       
        
      }).catch(function (error) {
        console.log(error);
      })
      

  }

  handleSelected(_product){
    this.setState({
      selectedProduct : _product
    })

    let updatedObj =this.state.tmpSuggest
    
        
        let tempobj = {'name':_product.name,
                          'image':_product.images +'.jpg'
                      }; 
        updatedObj.unshift(tempobj);
        
     
        updatedObj = updatedObj.filter((thing, index, self) =>
          index === self.findIndex((t) => (
            t.place === thing.place && t.name === thing.name
          ))
        )


        axios({
          url: 'https://api.myjson.com/bins/zpkwk',
          method: 'put',
          data: updatedObj
          
          
        }).then(function (response){
          console.log(response.data)
        });
  }



  render() {
    let headerComp ;
    let footerComp ; 
    const isHome = this.state.isHome;
    if(!isHome){
      headerComp =(
      <Header
        cartItems={this.state.cart}
        handleSearch={this.handleSearch}
        handleQueryChange={this.handleQueryChange}
        query ={this.state.query}
        handleLogout={this.handleLogout}
        handleQueryChangeTemp={this.handleQueryChangeTemp}
      />);

      footerComp = (
      <Footer
        handleChangeState = {this.handleChangeState}
      />);
    }


    return (
      <Router history={history}>
        <div className="container-fluid">
            {headerComp}
            
            <Route exact path="/" render={(props) => <Home {...props} handleLogout={this.handleLogout} handleQueryChangeTemp={this.handleQueryChangeTemp} loading={this.state.loading} results={this.state.products} value={this.state.query} query={this.state.query} handleSearch={this.handleSearch} handleQueryChange={this.handleQueryChange} handleCategoryClick={this.handleCategoryClick}/> } />
            <Route path="/login" component={Login} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/result"  render={(props) => <Seller_SearchResult {...props} loading={this.state.loading} selected={this.state.selectedProduct} handleSelected={this.handleSelected} productsList={this.state.products} handleChangeState={this.handleChangeState}  />   } />
            <Route path="/detail" render={(props) => <ItemDetail {...props} loading={this.state.loading} productsList={this.state.products} selected={this.state.selectedProduct} handleSelected={this.handleSelected} handleChangeState={this.handleChangeState}   /> } />
            
            <Route path="/createPost" render={(props) => <Seller_CreatePost {...props} loading={this.state.loading} handleChangeState={this.handleChangeState} />}/>
            <Route path="/cart" render={(props) => <Seller_Cart {...props} loading={this.state.loading} handleChangeState={this.handleChangeState}  /> }/>
            <Route path="/dashboard" render={(props) => <Dashboard {...props} loading={this.state.loading} handleChangeState={this.handleChangeState} handleSelected={this.handleSelected}  /> }/>
            {footerComp}
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
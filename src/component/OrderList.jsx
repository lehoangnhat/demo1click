import React, { Component } from 'react';

import axios from "axios";
import ProductList from './ProductList';

class OrderList extends Component{
    constructor(props) {
        super(props);
      }

    render(){
        let view =(
            <ProductList
            productsList={this.props.orderList}
            handleSelected={this.props.handleSelected}
            
            />
        )
        return(
            <div>
                {view}
            </div>
        )
    }

}

export default OrderList;
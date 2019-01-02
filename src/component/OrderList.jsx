import React, { Component } from 'react';

import axios from "axios";
import ProductList from './ProductList';
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Form, FormGroup,Label,
    Input,
    Row, Container, Col, Button,Modal, ModalBody,ModalHeader, ModalFooter ,Jumbotron} from 'reactstrap';

import "./OrderList.css"


class OrderList extends Component{
    constructor(props) {
        super(props);
      }
    componentDidMount(){
        console.log(this.props.orderList)
    }
    render(){
        let view =(
            this.props.orderList.map((order,index)=>
            
                order.productIDs.map((product,index)=>
                 
                    <Row key={index} style={{margin:"0", padding:"0", borderBottom:"2px solid #E9E9E9"}}>
                        <Col sm='12' md='6' style={{paddingLeft:"5%"}}>
                            <img className="img-responsive" src={product.images +'.jpg'} id="orderImg" alt="productImg" key={index} /> 
                            
                                <h5 id="orderName">{product.name}</h5>
                          
                            
                        </Col>
                        <Col sm='6' md='6' style={{paddingLeft:"10%"}}>
                            <p id="quantity"> Số lượng: {product.quantity}</p>
                            <p > Mã đơn hàng : </p> 
                            <p id="orderID" > {order._id} </p>
                        </Col>
                    
                    </Row>
                    
                )
             
            
            )
        )
        return(
            <div>
                {view}
            </div>
        )
    }

}

export default OrderList;
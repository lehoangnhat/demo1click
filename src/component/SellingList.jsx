import React, { Component } from 'react';

import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Row, Container, Col } from 'reactstrap';
import ProductList from './ProductList';
import './SellingList.css'
import { Link } from 'react-router-dom';

class SellingList extends Component{
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        let token = JSON.parse(sessionStorage.getItem('token'));
        let self= this;
        console.log(self.props.sellingList);
    }

    render(){
        const formatter = new Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0
          })
        let view =(
           
                
            this.props.sellingList.map((product,index) => 
                
                <Container id="sellingListProduct" key={index} 
                  >
                    <Row>
                        <Col xs='6' md='6'>
                            <img src={product.images} alt="productImg" id="cardImg"/>
                            <div>
                                <h4 id="productName">{product.name}</h4>
                                <p id="price">{formatter.format(product.price)}</p>
                                
                            </div>
                        </Col>
                        <Col xs='6' md='6'>
                            <p id="quantity"> Số lượng: {product.quantity}</p>
                            <div>
                                <Link to='/'> Cập nhật  </Link>
                            </div>
                        </Col>
                    
                </Row>
                  </Container>
                )
            
        );

        return(
            <div>
                {view}
            </div>
        )
    }

}

export default SellingList;
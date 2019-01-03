import React, { Component } from 'react';

import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Form, FormGroup,Label,
    Input,
    Row, Container, Col, Button,Modal, ModalBody,ModalHeader, ModalFooter ,Jumbotron} from 'reactstrap';
import ProductList from './ProductList';
import './SellingList.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactTags from 'react-tag-autocomplete';

import ReactDropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import { history } from '../_helper';
import NoResults from "../Empty/NoResults";

class SellingList extends Component{
    constructor(props) {
        super(props);
        this.state={
            openModal:false,
            productID:'',
            productName:'',
            productPrice:'',
            productQuantity:1,
            producer:'',
            tags: [],
            selectedCategory:'',
            imgUrl:'',
            description:'',

            dropdownOpen: false,
            file: '',
            imagePreviewUrl: '',


            selectedName:'',
            selectedPrice:'',

            sellingList:this.props.sellingList,
            refresh:false,
            suggestions: [
                { id: 1, name: "Điện thoại" },
                { id: 2, name: "Sony" },
                { id: 3, name: "Nike" },
                { id: 4, name: "Máy tính" },
                { id: 5, name: "Giày dép" }
            ],
            category:[],
            requirementKey:[]
        }
        this.handleUpdate = this.handleUpdate.bind(this)
        this.toggle = this.toggle.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleClickCategory = this.handleClickCategory.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.handleClickedProduct = this.handleClickedProduct.bind(this);
    }



    handleClickCategory(option){
       
        this.setState({
            selectedCategory: option.value
        })

        
    }
    handleDelete (i) {
        const tags = this.state.tags.slice(0)
        tags.splice(i, 1)
        this.setState({ tags })
      }
     
    handleAddition (tag) {
        const tags = [].concat(this.state.tags, tag)
        this.setState({ tags })
    }

    componentWillReceiveProps(nextprops){
       
        
        
        this.setState({
            sellingList : nextprops.sellingList
        })
    }

    componentDidMount(){
        
        let self=this;
        axios.get('https://demo1clickapi.herokuapp.com/api/category/search',
        {

        })
        .then(function (response) {
            
            for(var i =0; i<response.data.data.items.length;i++){
                self.state.category.push(response.data.data.items[i].name)
            }
            
        })
    }
    toggle() {
        this.setState({
            openModal: !this.state.openModal
        });
      }
    handleUpdate(){

        let pid = this.state.productID;
        let self = this;
        axios({
            url: 'https://demo1clickapi.herokuapp.com/api/product/'+pid,
            method: 'put',
            data:{
                name: self.state.productName,
                price:self.state.productPrice,
                quantity:self.state.productQuantity,
                tags:self.state.tags,
                images: self.state.imgUrl,
                categoryID:self.state.selectedCategory,
                description: self.state.description
            }
            
            
            
            }).then(function (response){
                
                self.toggle();
                self.props.reloadOrderList();
                
            });
            
    }
    handleImageChange(e) {
        
    
        let reader = new FileReader();
        let file = e.target.files[0];
        //const file = new Blob([e.target.files[0]], { type: 'image/jpg' });
        //let file = new Blob([e.target.files[0]], { type: 'image/jpg' });
        
        reader.onloadend = () => {
          this.setState({
            file: file,
            imagePreviewUrl: reader.result
          });
        }
        reader.readAsDataURL(file);

        
        

      }
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
        
    }

    handleClickedProduct(product){
         this.setState({
            productID: product.id,
            productName:product.name,
            productPrice:product.price,
            productQuantity:product.quantity,
            tags: product.tags,
            selectedCategory:product.categoryID,
            imgUrl:product.images,
            description:product.description,
            imagePreviewUrl:product.images
         })
        
        this.toggle();


    }
    render(){
        let {imagePreviewUrl} = this.state;
        let imagePreview = null;
        if (imagePreviewUrl) {
            imagePreview = (<img src={imagePreviewUrl} />);
        } else {
            imagePreview = (<div className="previewText"> Thêm hình ảnh</div>);
        }

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
                                <Button onClick={()=> this.handleClickedProduct(product)}> Cập nhật  </Button>
                            </div>
                        </Col>
                    
                </Row>
                  </Container>
                )
            );
        
        if(this.state.sellingList.length <=0){
            view= <div className="no-results">
            <img
              src="https://res.cloudinary.com/sivadass/image/upload/v1494699523/icons/bare-tree.png"
              alt="Empty Tree"
            />
            <p>Bạn hiện không bán mặt hàng nào</p>
            
          </div>
        }
        const sName= this.state.productName;
        const sPrice = this.state.productPrice;
        const sQuant = this.state.productQuantity;
        const sTags= this.state.tags;
        const sDesc = this.state.description;
        const sCategory = this.state.selectedCategory; 
       
        return(
            <div>
                {view}
                <Modal isOpen={this.state.openModal} toggle={this.toggle} >
                    <ModalHeader>
                        Cập nhật sản phẩm
                    </ModalHeader>
                    <Container style={{marginTop:'2%'}}>
                    <Form id="createPostForm">
                            <FormGroup>
                            <Label for="ProductNameBox">Tên mặt hàng</Label>
                            <Input type="text" name="productName" id="ProductNameBox"  value={sName} onChange={this.handleChange} />
                            </FormGroup>
                            <Row form>
                                <Col xs={6}>
                                    <FormGroup>
                                    <Label for="price">Giá bán</Label>
                                    <Input type="text" name="productPrice" id="createPostPriceBox"  value={sPrice} onChange={this.handleChange}/>
                                    </FormGroup>
                                </Col>
                                <Col xs={6}>
                                    <FormGroup>
                                    <Label for="quantity">Số lượng</Label>
                                    <Input type="text" name="productQuantity" id="createPostQuantityBox" value={sQuant} onChange={this.handleChange}/>
                                    </FormGroup>
                                </Col>
                                
                            </Row>
                       

                        <ReactDropdown id="listCategory" options={this.state.category} onChange={this.handleClickCategory} value={sCategory} placeholder="Chọn danh mục" />
                       
                            <Input type="file" name="file" style={{marginTop:"5%"}} onChange={this.handleImageChange} />
                            <Container id="imgPreview">
                                {imagePreview}
                            </Container>
                            <ReactTags
                                tags={sTags}
                                suggestions={this.state.suggestions}
                                handleDelete={this.handleDelete.bind(this)}
                                handleAddition={this.handleAddition.bind(this)} 
                                
                                />

                            <FormGroup style={{marginTop:"2%"}}>
                                <Label >Mô tả sản phẩm</Label>
                                <Input type="textarea" name="description" id="description" onChange={this.handleChange} value={sDesc}/>
                            </FormGroup>

                            <Button id="createPostBtn" onClick={this.handleUpdate}> Cập nhật </Button>
                        </Form>
                    </Container>
                </Modal>
            </div>
        )
    }

}

export default SellingList;
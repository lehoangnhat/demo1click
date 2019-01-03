import React, { Component } from 'react';


import { 
    Form,
    FormGroup,
    Label,
    Input,
    Dropdown,
    DropdownItem,
    DropdownToggle,
    DropdownMenu,
    CustomInput,
    Media,
    BreadcrumbItem,
    Breadcrumb,
    ListGroupItem,
    ListGroup,
    Row,
    Col,
    Button,
    Container, Jumbotron } from 'reactstrap';


import './Seller_CreatePost.css';
import ReactTags from 'react-tag-autocomplete';

import ImagesUploader from 'react-images-uploader';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';

import axios from 'axios';
import { history } from '../_helper';

import ReactDropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import ReactLoading from 'react-loading';

import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css' 

class Seller_CreatePost extends Component{
    
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleClickCategory = this.handleClickCategory.bind(this);
        this.hanldePostForm = this.hanldePostForm.bind(this);
        
        this.handleChange=this.handleChange.bind(this);
        this.state = {
            productName:'',
            productPrice:'',
            productQuantity:1,
            tags: [],
            selectedCategory:'',
            imgUrl:'',
            description:'',

            dropdownOpen: false,
            file: '',
            imagePreviewUrl: '',
            
            suggestions: [
                { id: 1, name: "Điện thoại" },
                { id: 2, name: "Sony" },
                { id: 3, name: "Nokia" },
                { id: 4, name: "Máy tính" },
                { id: 5, name: "Giày dép" }
            ],
            category:[],

            loading:false,
            errors:{}
        };
        
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
        this.props.handleChangeState(false);
        

    }
    componentWillUnmount(){
        this.props.handleChangeState(true);
    }

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    onMouseEnter() {
        this.setState({dropdownOpen: true});
    }

    onMouseLeave() {
        this.setState({dropdownOpen: false});
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

    handleValidation(){
        let {productName,productPrice,tags,selectedCategory,file} = this.state;

        let errors = {};
        let formIsValid = true;
    
        //Name
        if(!productName){
          formIsValid = false;
          errors["name"] = "Xin điền tên mặt hàng";
        }
    
      
        if(!productPrice){
          formIsValid = false;
          errors["price"] = "Xin điền giá";
        }

        if(!selectedCategory){
            formIsValid = false;
            errors["category"] = "Xin chọn danh mục";
        }

        if(!file){
            formIsValid = false;
            errors["img"] = "Xin thêm hình";
        }
        
        this.setState({errors: errors});
        return formIsValid;
      }


    hanldePostForm(){

        if(this.handleValidation()){

        this.setState({
            loading:true
        })

        let self = this;
        let file = this.state.file;
        let formData = new FormData();
        let clientID = "b5a79154dad9962";
        formData.append("image",file);
        

        axios.post("https://api.imgur.com/3/image" , formData , {
            "headers": {
            
            "Authorization": "Client-ID "+clientID
            }
            }).then(function(response) {
                if(response.data.success === true){
                self.setState({
                    imgUrl:response.data.data.link
                })
               
                let token = JSON.parse(sessionStorage.getItem('token'));
                
                
                let productName = self.state.productName;
                let productPrice = self.state.productPrice;
                let productQuantity = parseInt(self.state.productQuantity);
                let imgUrl = self.state.imgUrl;
                let producer = self.state.producer
                let tag = self.state.tags
                let category = self.state.selectedCategory;
                let description = self.state.description;
                axios.post("https://demo1clickapi.herokuapp.com/api/user/product",
                {
                    name: productName,
                    price:productPrice,
                    quantity:productQuantity,
                    tags:tag,
                    images: imgUrl,
                    producer: producer,
                    categoryID:category,
                    description: description
                }
                ,
                {
                    headers:{
                        "x-access-token": token,
                        
                    // 'token': `Bearer ${token}` 
                    }
                }
                ).then(function(response) {
                    
                    if(response.data.status ==='SUCCESS'){
                        alert('Thành công');
                        document.getElementById("createPostForm").reset();
                        self.setState({
                            imagePreviewUrl:"",
                            loading:false,
                            tags:[]
                        })
                    }
                }).catch(function(error) {
                    console.log("Error API")
                    console.log(error);
                })
            }
            }).catch(function(error) {
                console.log(error);
            });
        }
        else{
            alert("Xin điền đầy đủ thông tin")
        }
    }

    handleSubmit(e){
        e.preventDefault();
        this.hanldePostForm();
        
       /* confirmAlert({
            title: 'Xác nhận',
            message: 'Bạn chắc chắn chứ?',
            buttons: [
              {
                label: 'Có',
                onClick: ()=>
              },
              {
                label: 'Không',
                onClick: ()=> null
              }
            ]
          })
          *


        
        
        
          /* axios({
            method: 'post', //you can set what request you want to be
            url: 'http://localhost:9997/api/user/product',
            data: {
                name: productName,
                price:productPrice,
                quantity:productQuantity,
                tags:tag,
                images: imgUrl,
                categoryID:category,
                description: description
            },
            headers: {
                token : sessionStorage.getItem('token')
            }
          }).then(function(response) {
            console.log("response API")
            console.log(response.data)
            }).catch(function(error) {
                console.log("Error API")
                console.log(error);
            })*/
        


    }

    render(){
        let {imagePreviewUrl} = this.state;
        let imagePreview = null;
        if (imagePreviewUrl) {
            imagePreview = (<img src={imagePreviewUrl} />);
        } else {
            imagePreview = (<div className="previewText"> Thêm hình ảnh</div>);
        }
        return (
            <Container id="createPostContainer" fluid >
               
                
                <Jumbotron id="jumboCreatePost">
                
                    <Row style={{margin:"0"}}>
                        <Col  xs="12" id="topRow"  >
                            <Label id="textDangtin">ĐĂNG TIN BÁN HÀNG </Label>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12">
                        <Form id="createPostForm">
                            <FormGroup>
                            <Label for="ProductNameBox">Tên mặt hàng</Label>
                            <Input type="text" name="productName" id="ProductNameBox" placeholder="Nhập tên sản phẩm " onChange={this.handleChange} />
                            <span className="error">{this.state.errors["name"]}</span>
                            </FormGroup>
                            <Row form>
                                <Col xs={6}>
                                    <FormGroup>
                                    <Label for="price">Giá bán</Label>
                                    <Input type="text" name="productPrice" id="createPostPriceBox" placeholder="VND" onChange={this.handleChange}/>
                                    <span className="error">{this.state.errors["price"]}</span>
                                    </FormGroup>
                                    
                                </Col>
                                <Col xs={6}>
                                    <FormGroup>
                                    <Label for="quantity">Số lượng</Label>
                                    <Input type="text" name="productQuantity" id="createPostQuantityBox" placeholder="1 " onChange={this.handleChange}/>
                                    </FormGroup>

                                </Col>
                                
                            </Row>
                        {/*
                            <FormGroup>
                                <Label for="exampleSelectMulti">Select Multiple</Label>
                                <Dropdown direction="right" onMouseOver={this.onMouseEnter} onMouseLeave={this.onMouseLeave} isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                        <DropdownToggle caret>
                                            Dropright
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem>Another Action</DropdownItem>
                                            <DropdownItem>Another Action</DropdownItem>
                                        </DropdownMenu>
                                </Dropdown>
                                

                            </FormGroup>
                        */}

                        <ReactDropdown id="listCategory" options={this.state.category} onChange={this.handleClickCategory} value={this.state.selectedCategory} placeholder="Chọn danh mục" />
                        <span className="error">{this.state.errors["category"]}</span>
                            <Input type="file" name="file" style={{marginTop:"5%"}} onChange={this.handleImageChange} />
                            <span className="error">{this.state.errors["img"]}</span>
                            <Container id="imgPreview">
                                {imagePreview}
                            </Container>
                            <ReactTags
                                tags={this.state.tags}
                                suggestions={this.state.suggestions}
                                handleDelete={this.handleDelete.bind(this)}
                                handleAddition={this.handleAddition.bind(this)}
                                allowNew="true"
                                />

                            <FormGroup style={{marginTop:"2%"}}>
                                <Label >Mô tả sản phẩm</Label>
                                <Input type="textarea" name="description" id="description" onChange={this.handleChange} />
                            </FormGroup>

                            <Button id={this.state.loading?"createPostBtnLoading":"createPostBtn"} onClick={this.handleSubmit}> Gửi hàng &ensp; &ensp;</Button>
                        </Form>
                        



                        </Col>



                    </Row>
                </Jumbotron>
                
                
            </Container>
        );
    }
}
export default Seller_CreatePost;
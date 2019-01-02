import React, { Component } from 'react';
import {
    Row,
    Col,
    Container,
    Table, Button,
    Form,
    FormGroup,
    Label,
    Input,
    Modal, ModalBody,ModalHeader

} from 'reactstrap';
    import profilePic from '../img/blank_male.png';
import axios from 'axios'
import './UserInfo.css'

import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import "react-datepicker/dist/react-datepicker.css";


class UserInfo extends Component{
    constructor(props) {
        super(props);
        let userData= JSON.parse(sessionStorage.getItem('userData'));
        this.state = {
            fname: userData.firstName,
            lname: userData.lastName,
            dob: userData.dob,
            address:userData.address,
            email:userData.email,

            changeInfo: false,
            openModal:false,
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.toggle = this.toggle.bind(this);
        this.handleFnameChange = this.handleFnameChange.bind(this);
        this.handleLnameChange = this.handleLnameChange.bind(this);
        this.handleDoBChange = this.handleDoBChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
    }


    componentDidMount(){
   /*     let userData= JSON.parse(sessionStorage.getItem('userData'));
        axios({
            url: 'http://localhost:9997/api/user/',
            method: 'put',
            headers:{
                "x-access-token": token,
            },
            data:{
                email: 'test@gmail.com'
            }
            
            }).then(function (response){
              console.log('getInfo')
                console.log(response.data)
                
            });
            */
    }

    handleSubmit(e){
        e.preventDefault();
        
    


    }

    toggle() {
        this.setState({
            openModal: !this.state.openModal
        });
    }

    handleEmailChange(e){
        this.setState({ email : e.target.value })
    }
    

    handleAddressChange(e){
        this.setState({ address : e.target.value })
    }
    

    handleFnameChange(e) {
        this.setState({ fname : e.target.value })
    }
    handleLnameChange(e) {
        this.setState({ lname : e.target.value })
    }
    handleDoBChange(selectedDay, modifiers, dayPickerInput) {
        const input = dayPickerInput.getInput();
        this.setState({
          dob:input.value,
        });
    }

    handleUpdate(){
        let token = JSON.parse(sessionStorage.getItem('token'));
        axios({
            url: 'https://demo1clickapi.herokuapp.com/api/user/',
            method: 'put',
            headers:{
                "x-access-token": token,
            },
            data:{
                firstName: this.state.fname,
                lastName: this.state.lname,
                dob: this.state.dob,
                email: this.state.email,
                address:this.state.address
            }
            
            }).then(function (response){
                console.log(response.data)
                sessionStorage.setItem('userData',JSON.stringify(response.data.data));
                sessionStorage.setItem('fName', response.data.data.firstName);

                
            });
        this.toggle();


    }

    render(){
        let userData= JSON.parse(sessionStorage.getItem('userData'));
        return(
            <Container>
                <Row>
                    <Col xs="6" md="6">
                        <img src={profilePic} style={{maxWidth:"100px"}} alt="image"/>

                    </Col>
                    
                </Row>
                <Row>
                    <Col xs="12" md="12">
                        <Table borderless responsive>
                            <tbody>
                            <tr>
                                <th scope="row">Họ và Tên</th>
                                <td>{this.state.lname} {this.state.fname}</td>
                                
                            </tr>
                            <tr>
                                <th scope="row" xs="3"> Email</th>
                                <td>{this.state.email?this.state.email: <div> Chưa có </div> }</td>
                                
                            </tr>
                            <tr>
                                <th scope="row">Mật khẩu</th>
                                <td><a href="">Đổi mật khẩu </a></td>
                                
                            </tr>

                            <tr>
                                <th scope="row">Ngày sinh</th>
                                <td> {this.state.dob} </td>
                                
                            </tr>

                            <tr>
                                <th scope="row" xs="3"> Địa chỉ </th>
                                <td>{this.state.address? this.state.address  : <div> Chưa có </div> }</td>
                                
                            </tr>
                            
                           
                           </tbody>
                            
                        </Table>
                        <Button id="infoBtn" onClick={this.toggle}> Cập nhật thông tin </Button>
                    </Col>
                </Row>

                <Modal isOpen={this.state.openModal} toggle={this.toggle} >
                    <ModalHeader>
                        Cập nhật thông tin
                    </ModalHeader>
                    <Container style={{marginTop:'2%'}}>
                            <Form id ="registerFormGroup" >
        
                                
                                <Row form="true">
                                  <Col xs={6}>
                                    <FormGroup>
                                      <Label >Họ</Label>
                                      <Input type="text" name="lname" id="registerLname" value={this.state.lname} onChange={this.handleLnameChange}/>
                                     
                                    </FormGroup>
                                  </Col>
                                  <Col xs={6}>
                                    <FormGroup>
                                      <Label >Tên</Label>
                                      <Input type="text" name="fname" id="registerFname" value={this.state.fname} onChange={this.handleFnameChange} />
                                      
                                    </FormGroup>
                                  </Col>



                                </Row>

                                <FormGroup>
                                  <Label>Username</Label>
                                  
                                  <Input type="text" name="email"   value={this.state.email} onChange={this.handleEmailChange} />
                                  
                                </FormGroup>

                                <FormGroup>
                                  <Label>Địa chỉ</Label>
                                  <Input type="textarea" name="address"   value={this.state.address} onChange={this.handleAddressChange} />
                                </FormGroup>

                                <FormGroup id="DoBFormGroup">
                                  <Label for="registerDoB">Ngày sinh</Label>
                                  
                                  <div>
                                  <DayPickerInput className="form-control" value={this.state.dob} name="registerDoB"  id="registerDoB" onDayChange={this.handleDoBChange}/>
                                  </div>
                                </FormGroup>
                                

                            <Button id="infoBtn" onClick={this.handleUpdate} > Cập nhật </Button>
                        </Form>
                    </Container>
                </Modal>

            </Container>
        )
    }

}

export default UserInfo;
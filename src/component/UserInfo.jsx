import React, { Component } from 'react';
import {
    Row,
    Col,
    Container,
    Table } from 'reactstrap';
    import profilePic from '../img/blank_male.png';
let userData= JSON.parse(sessionStorage.getItem('userData'));
class UserInfo extends Component{
    render(){
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
                            
                            <tr>
                                <th scope="row">Họ và Tên</th>
                                <td>{userData.lastName} {userData.firstName}</td>
                                
                            </tr>
                            <tr>
                                <th scope="row" xs="3"> Email</th>
                                <td>{userData.email? userData.email: <a href=""> Bổ sung </a> }</td>
                                
                            </tr>
                            <tr>
                                <th scope="row">Mật khẩu</th>
                                <td><a href="">Đổi mật khẩu </a></td>
                                
                            </tr>

                            <tr>
                                <th scope="row">Ngày sinh</th>
                                <td> {userData.dob} </td>
                                
                            </tr>

                            <tr>
                                <th scope="row">Địa chỉ</th>
                                <td><a href="">Bổ sung </a></td>
                                
                            </tr>
                            
                            
                        </Table>
                    </Col>
                </Row>
            </Container>
        )
    }

}

export default UserInfo;
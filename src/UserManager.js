import React, { Component } from 'react';
import {Button,FormControl,Col,ListGroup,ListGroupItem,
    Popover,Modal,Form,FormGroup,ControlLabel,OverlayTrigger} from 'react-bootstrap';

const data = [];

export default class UserManager extends Component {
    constructor() {
        super();
        this.state = {
            deleteName: '',
            forbiddenName:'',
            recoverName:'',
            table:data,

            newUsername: "",
            newPassword: "",
            info: "",
            showModal: false,
            newNumber:"",
            newEmail:"",
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.deleteUser = this.deleteUser.bind(this);

        this.handleForbidden = this.handleForbidden.bind(this);
        this.forbiddenUser=this.forbiddenUser.bind(this);

        this.handleRecover=this.handleRecover.bind(this);
        this.recoverUser=this.recoverUser.bind(this);

        this.open=this.open.bind(this);
        this.close=this.close.bind(this);
        this.handleNewName=this.handleNewName.bind(this);
        this.handleNewPassword=this.handleNewPassword.bind(this);
        this.handleNewNumber=this.handleNewNumber.bind(this);
        this.handleNewEmail=this.handleNewEmail.bind(this);
        this.EnrollCheck=this.EnrollCheck.bind(this);

        this.queryAllUser=this.queryAllUser.bind(this);
    }

    deleteUser= () => {
        fetch('http://localhost:8080/User/Delete?name=' + this.state.deleteName,
            {
                method: 'POST',
                mode: 'cors',
            }
        )
            .then(response => {
                response.text()
                    .then(result => {
                        console.log("result: ", result);
                        alert(result);
                    });
            })
    };

    forbiddenUser= () => {
        fetch('http://localhost:8080/User/Forbidden?name=' + this.state.forbiddenName,
            {
                method: 'POST',
                mode: 'cors',
            }
        )
            .then(response => {
                response.text()
                    .then(result => {
                        console.log("result: ", result);
                        alert(result);
                    });
            })
    };

    recoverUser= () => {
        fetch('http://localhost:8080/User/Recover?name=' + this.state.recoverName,
            {
                method: 'POST',
                mode: 'cors',
            }
        )
            .then(response => {
                response.text()
                    .then(result => {
                        console.log("result: ", result);
                        alert(result);
                    });
            })
    };

    queryAllUser= () => {
        fetch('http://localhost:8080/User/List',
            {
                method: 'POST',
                mode: 'cors',
            }
        )
            .then(response => {
                response.json()
                    .then(result => {
                        console.log("result: ", result);
                        data.splice(0,data.length);
                        for(var i in result){
                            let add={"name":result[i].id,"phone":result[i].phone,
                                "email":result[i].email};
                            data.push(add);
                        }
                        this.setState({table:data});
                    });
            })
    };

    NewUserInfo(){
        fetch('http://localhost:8080/User/Register?name='+this.state.newUsername+'&pwd='
            +this.state.newPassword+'&phone='+this.state.newNumber+'&email='+this.state.newEmail,
            {
                method: 'POST',
                mode: 'cors',
            }
        )
            .then(function (response) {
                console.log('Request successful', response);
                return response.text();
            })
            .then(function (result) {
                alert(result);
                console.log("result: ", result);
            })
    }

    EnrollCheck(){
        let password = this.state.newPassword;
        let username = this.state.newUsername;
        let number=this.state.newNumber;
        let email=this.state.newEmail;
        let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]/;
        let reg2=/^1\d{10}$/;
        let reg3=/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        if (password === '' || username === ''||number === ''||email === '') {
            this.setState({info: '不得有信息缺失'})
        }
        else if (!reg.test(password)) {
            this.setState({info: '密码格式错误'})
        }
        else if (!reg3.test(email))
        {
            this.setState({info: '邮箱地址错误'});
        }
        else if (!reg2.test(number))
        {
            this.setState({info: '手机号输入错误'});
        }
        else {
            this.setState({info: '请稍等...'});
            this.NewUserInfo();
        }

    }

    handleDelete(event) {
        this.setState({deleteName: event.target.value});
    }
    handleForbidden(event) {
        this.setState({forbiddenName: event.target.value});
    }
    handleRecover(event) {
        this.setState({recoverName: event.target.value});
    }
    close() {
        this.setState({showModal: false});
    }
    open() {
        this.setState({showModal: true});
    }
    handleNewName(event) {
        this.setState({newUsername: event.target.value});
    }
    handleNewPassword(event) {
        this.setState({newPassword: event.target.value});
    }
    handleNewNumber(event) {
        this.setState({newNumber: event.target.value});
    }
    handleNewEmail(event) {
        this.setState({newEmail: event.target.value});
    }



    render() {
        const popoverFocus = (
            <Popover id="popover-trigger-focus" >
                {this.state.info}
            </Popover>
        );
        return (
            <div>
                <br/>
                <Button bsStyle="default" onClick={this.deleteUser}>删除用户</Button>
                <Col sm={4}>
                    <FormControl placeholder="请输入用户的名字"
                         onChange={this.handleDelete}/>
                </Col>
                <br/>
                <br/>
                <Button bsStyle="default" onClick={this.forbiddenUser}>禁用用户</Button>
                <Col sm={4}>
                    <FormControl placeholder="请输入用户的名字"
                                 onChange={this.handleForbidden}/>
                </Col>
                <br/>
                <br/>
                <Button bsStyle="default" onClick={this.recoverUser}>恢复用户</Button>
                <Col sm={4}>
                    <FormControl placeholder="请输入用户的名字"
                                 onChange={this.handleRecover}/>
                </Col>
                <br/>
                <br/>
                <Button bsStyle="primary" onClick={this.open}>点击添加新用户</Button>
                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>添加新用户页面</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form horizontal>
                            <FormGroup controlId="registerInterface">
                                <Col componentClass={ControlLabel} sm={2}>用户名</Col>
                                <Col sm={5}><FormControl type="New_username"
                                                         onChange={this.handleNewName}/></Col>
                            </FormGroup>

                            <FormGroup controlId="formHorizontalPassword">

                                <Col componentClass={ControlLabel} sm={2}>密码</Col>
                                <Col sm={5}>
                                    <FormControl type="New_password" placeholder="必须同时包含数字和字母"
                                                 onChange={this.handleNewPassword}/></Col>

                            </FormGroup>

                            <FormGroup controlId="formHorizontalEmail">
                                <Col componentClass={ControlLabel} sm={2}>邮箱</Col>
                                <Col sm={5}><FormControl type="email" placeholder="有效邮箱地址"
                                                         onChange={this.handleNewEmail}/></Col>
                            </FormGroup>

                            <FormGroup controlId="formHorizontalNumber">
                                <Col componentClass={ControlLabel} sm={2}>手机号</Col>
                                <Col sm={5}><FormControl type="phone" placeholder="有效电话"
                                                         onChange={this.handleNewNumber}/></Col>
                            </FormGroup>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={popoverFocus}>
                            <Button bsStyle="default" onClick={this.EnrollCheck} >确认</Button>
                        </OverlayTrigger>
                        <Button onClick={this.close} >取消</Button>
                    </Modal.Footer>
                </Modal>

                <br/>
                <br/>
                <Button bsStyle="primary" onClick={this.queryAllUser}>查询所有用户</Button>
                <ListGroup>{
                    this.state.table.map(function (item) {
                        return <ListGroupItem header={"用户名： "+item.name} >
                            <p>{"邮箱："+item.email}</p>
                            <p>{"电话："+item.phone}</p>
                        </ListGroupItem>
                    })
                }
                </ListGroup>
            </div>
        );

    }
}
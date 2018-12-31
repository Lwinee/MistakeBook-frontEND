import React, { Component } from 'react';
import { Form, FormGroup, Col,FormControl,Button,ControlLabel,Popover,ButtonToolbar,Modal,OverlayTrigger } from 'react-bootstrap';

export default class LoginManager extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            info: ""

        };
    }

    handleChangeName(event) {
        this.setState({username: event.target.value});
    }
    handleChangePassword(event) {
        this.setState({password: event.target.value});
    }
    handleChangeNumber(event) {
        this.setState({number: event.target.value});

    }
    handleChangeEmail(event) {
        this.setState({email: event.target.value});
    }


    LogIn(){
        fetch('http://localhost:8080/Manager/Login?name='+this.state.username+'&pwd='
            +this.state.password,
            {
                method: 'POST',
                mode: 'cors'
            }
        )
            .then(response=> {
                response.text()
                    .then(result=> {
                        alert(result);
                        if (result === "登陆成功")
                            window.location.href='/Manager';
                    })
            })
    }

    EnrollCheck(){
        let password = this.state.password;
        let username = this.state.username;
        let number=this.state.number;
        let email=this.state.email;
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


    LogInCheck() {
        let input_password = this.state.password;
        let input_username = this.state.username;
        if (input_password === '' || input_username === '') {
            alert('用户名或者密码不能为空');
        }
        else
        {
            this.LogIn();
            this.setState({info: 'success'});
        }
    }



    render() {

        return (
            <div>
                <Form horizontal>
                    <FormGroup controlId="formHorizontalEmail">
                        <Col componentClass={ControlLabel} sm={3}>用户名</Col>
                        <Col sm={9}>
                            <FormControl type="username" placeholder="Username"
                                         onChange={this.handleChangeName.bind(this)}  />
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="formHorizontalPassword">
                        <Col componentClass={ControlLabel} sm={3}>密码</Col>
                        <Col sm={9}>
                            <FormControl type="password" placeholder="Password"
                                         onChange={this.handleChangePassword.bind(this)}/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col smOffset={3} sm={9}>
                            <ButtonToolbar>
                                <Button bsStyle="default" onClick={this.LogInCheck.bind(this)} >登陆</Button>
                            </ButtonToolbar>
                        </Col>
                    </FormGroup>
                </Form>

            </div>
        )
    }
}

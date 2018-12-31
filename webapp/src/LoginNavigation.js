import React, { Component } from 'react';
import {Tabs,Tab, Col} from 'react-bootstrap';
import Login from "./Login";
import LoginManager from "./LoginManager";

export default class LoginNavigation extends Component {
    render() {
        return (
            <Col md={4}>
                <Tabs defaultActiveKey={2} id="uncontrolled-tab-example">
                    <br/>
                    <Tab eventKey={1} title="用户登录">
                        <Login/>
                    </Tab>
                    <Tab eventKey={2} title="管理员登陆">
                        <LoginManager/>
                    </Tab>
                </Tabs>
            </Col>

        );

    }
}
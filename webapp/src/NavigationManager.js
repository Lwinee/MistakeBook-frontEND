
import React, { Component } from 'react';
import {Tabs,Tab} from 'react-bootstrap';
import UserManager from "./UserManager";
import MistakeManager from "./MistakeManager";
import MistakeStatistics from "./MistakeStatistics";

export default class NavigationManager extends Component {

    render() {
        return (
            <Tabs defaultActiveKey={2} id="uncontrolled-tab-example">
                <Tab eventKey={1} title="用户管理">
                    <UserManager/>
                </Tab>
                <Tab eventKey={2} title="错题管理">
                    <MistakeManager/>
                </Tab>
                <Tab eventKey={3} title="错题统计">
                    <MistakeStatistics/>
                </Tab>
            </Tabs>
        );

    }
}
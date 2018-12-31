import React, { Component } from 'react';
import {Tabs,Tab} from 'react-bootstrap';
import Browse from "./Browse";

import 'quill/dist/quill.bubble.css';
import 'quill/dist/quill.min'
import Add from "./Add";
import Redo from "./Redo";
import MyMistake from "./myMistake";
import Search from "./Search";


export default class Navigation extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
        };
        this.passName=this.passName.bind(this);
    }

    passName(){
        let url = window.location.href;
        console.log("url: "+url);
        let loginUser = url.substring(url.lastIndexOf('=')+1, url.length);
        console.log("name: "+ loginUser);
        return loginUser;

    }

    render() {
        return (
            <Tabs defaultActiveKey={2} id="uncontrolled-tab-example">
                <Tab eventKey={1} title="浏览错题本" >
                    <Browse/>
                </Tab>
                <Tab eventKey={2} title="添加错题" >
                    <Add username={this.passName()} />
                </Tab>
                <Tab eventKey={3} title="错题重做" >
                    <Redo username={this.passName()}/>
                </Tab>
                <Tab eventKey={4} title="我的错题本" >
                    <MyMistake username={this.passName()} />
                </Tab>
                <Tab eventKey={5} title="查询错题">
                    <Search username={this.passName()} />
                </Tab>
            </Tabs>
    );

    }
}
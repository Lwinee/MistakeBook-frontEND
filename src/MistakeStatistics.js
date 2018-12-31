import React, { Component } from 'react';
import {Button,Col,ListGroup,ListGroupItem,
    Row,Nav,NavItem,Tab,FormControl} from 'react-bootstrap';

const userData = [];
const redoData = [];
const tagData = [];
export default class MistakeStatistics extends Component {
    constructor() {
        super();
        this.state = {
            amount: '',
            table:userData,
            table2:redoData,
            table3:tagData,
            name:"",
            tag:""
        };
        this.mistakeAmount=this.mistakeAmount.bind(this);
        this.everyUserMistakeAmount=this.everyUserMistakeAmount.bind(this);
        this.redoAmount=this.redoAmount.bind(this);
        this.handleRedoUser=this.handleRedoUser.bind(this);
        this.handleTag=this.handleTag.bind(this);
        this.tagMistake=this.tagMistake.bind(this);
    }

    mistakeAmount= () => {
        fetch('http://localhost:8080/Manager/MistakeAmount',
            {
                method: 'POST',
                mode: 'cors',
            }
        )
            .then(response => {
                response.text()
                    .then(result => {
                        console.log("result: ", result);
                        this.setState({amount:"          错题总数："+result});
                    });
            })
    };

    everyUserMistakeAmount= () => {
        fetch('http://localhost:8080/Manager/EveryUserMistakeAmount',
            {
                method: 'POST',
                mode: 'cors',
            }
        )
            .then(response => {
                response.json()
                    .then(result => {
                        console.log("result: ", result);
                        userData.splice(0,userData.length);
                        for(var i in result){
                            let add={"name":result[i].name,"amount":result[i].amount};
                            userData.push(add);
                        }
                        this.setState({table:userData});

                    });
            })
    };

    redoAmount= () => {
        fetch('http://localhost:8080/Manager/RedoAmount?name='+this.state.name,
            {
                method: 'POST',
                mode: 'cors',
            }
        )
            .then(response => {
                response.json()
                    .then(result => {
                        console.log("result: ", result);
                        redoData.splice(0,redoData.length);
                        for(var i in result){
                            let add={"mistakeID":result[i].mistakeID,"redoAmount":result[i].redoAmount};
                            redoData.push(add);
                        }
                        this.setState({table2:redoData});
                    });
            })
    };

    tagMistake= () => {
        fetch('http://localhost:8080/Manager/tagMistake?tag='+this.state.tag,
            {
                method: 'POST',
                mode: 'cors',
            }
        )
            .then(response => {
                response.json()
                    .then(result => {
                        console.log("result: ", result);
                        tagData.splice(0,tagData.length);
                        for(var i in result){
                            let add={"mistakeID":result[i].mistakeID,"title":result[i].title,
                            "tag":result[i].tag};
                            tagData.push(add);
                        }
                        this.setState({table3:tagData});
                    });
            })
    };
    handleRedoUser(event) {
        this.setState({name: event.target.value});
    }
    handleTag(event) {
        this.setState({tag: event.target.value});
    }


    render() {
        return (
            <div>
                <Tab.Container id="left-tabs-example"
                               defaultActiveKey="first">
                    <Row className="Clearfix">
                        <Col sm={3}>
                            <br/>
                            <Nav bsStyle="pills" stacked>
                                <NavItem eventKey="1" onClick={this.mistakeAmount}>
                                    错题总数
                                </NavItem>
                                <NavItem eventKey="2" onClick={this.everyUserMistakeAmount}>
                                    每个用户的错题总数
                                </NavItem>
                                <NavItem eventKey="3" >
                                    每个用户的错题重做数量
                                </NavItem>
                                <NavItem eventKey="4" >
                                    按照标签进行错题数量统计
                                </NavItem>
                            </Nav>
                        </Col>
                        <Col sm={9}>
                            <Tab.Content animation>
                                <Tab.Pane eventKey="1">
                                   <br/>
                                    {this.state.amount}
                                </Tab.Pane>
                                <Tab.Pane eventKey="2">
                                    <br/>
                                    <ListGroup>{
                                        this.state.table.map(function (item) {
                                            return <ListGroupItem header={"用户名： "+item.name} >
                                                <p>{"错题总数："+item.amount}</p>
                                            </ListGroupItem>
                                        })
                                    }
                                    </ListGroup>
                                </Tab.Pane>

                                <Tab.Pane eventKey="3">
                                    <br/>
                                    <Button bsStyle="default" onClick={this.redoAmount}>请输入查询用户</Button>
                                    <Col sm={4}>
                                        <FormControl placeholder="请输入用户名"
                                                     onChange={this.handleRedoUser}/>
                                    </Col>
                                    <br/>
                                    <br/>
                                    <ListGroup>{
                                        this.state.table2.map(function (item) {
                                            return <ListGroupItem header={"错题ID： "+item.mistakeID} >
                                                <p>{"重做次数："+item.redoAmount}</p>
                                            </ListGroupItem>
                                        })
                                    }
                                    </ListGroup>
                                </Tab.Pane>


                                <Tab.Pane eventKey="4">
                                    <br/>
                                    <Button bsStyle="default" onClick={this.tagMistake}>查询</Button>
                                    <Col sm={4}>
                                        <FormControl placeholder="请输入标签"
                                                     onChange={this.handleTag}/>
                                    </Col>
                                    <br/>
                                    <br/>
                                    <ListGroup>{
                                        this.state.table3.map(function (item) {
                                            return <ListGroupItem header={"错题ID： "+item.mistakeID} >
                                                <p>{"标题："+item.title}</p>
                                                <p>{"标签："+item.tag}</p>
                                            </ListGroupItem>
                                        })
                                    }
                                    </ListGroup>
                                </Tab.Pane>
                            </Tab.Content>


                        </Col>
                    </Row>
                </Tab.Container>




            </div>
        );

    }
}
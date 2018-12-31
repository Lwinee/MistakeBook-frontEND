import React, { Component } from 'react';
import {Button,FormControl,Col,ListGroup, ListGroupItem,Modal} from 'react-bootstrap';

import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';



Date.prototype.Format = function (fmt){
    var o = {
        "M+": this.getMonth() + 1,  //月份
        "d+": this.getDate() ,  //日
        "h+": this.getHours() ,  //24小时制
        "m+": this.getMinutes(),  //分
        "s+": this.getSeconds(),  //秒
        "q+": Math.floor((this.getMonth()+3)/3),  //季度
        "S": this.getMilliseconds()  //毫秒
    };
    if(/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+k+")").test(fmt))
            fmt = fmt.replace(RegExp.$1,(RegExp.$1.length === 1) ? (o[k]):(("00"+o[k]).substr((""+o[k]).length)));
    return fmt;

};
function formatTime(timeSecond){
    var d = new Date(timeSecond);
    return d.Format("yyyy-MM-dd hh:mm:ss");
}

const data = [];


export default class Search extends Component {
    constructor() {
        super();
        this.state = {
            mistakeID: '',
            title:'',
            cause:'',
            mistakeDate:'',
            times:'',
            table: data,
            showModal: false
        };
        this.searchMistake = this.searchMistake.bind(this);
        this.queryRedo = this.queryRedo.bind(this);
        this.close=this.close.bind(this);
        this.showImage=this.showImage.bind(this);
    }

    showImage = () => {
        this.setState({
            showModal: true
        });
        fetch('http://localhost:8080/CRUD/getPic?mistakeID='+this.state.mistakeID,
            {
                method: 'GET',
                mode: 'cors',
            }
        )
            .then(response=> {
                console.log('Request successful', response);
                const blob = response.blob();
                return blob
                    .then(blob => {
                        console.log("result: ", blob);
                        let reader = new FileReader();
                        reader.readAsDataURL(blob);
                        reader.onload = ()=> {
                            this.setState({
                                img:reader.result
                            })
                        }
                    });
            });
    };
    close(){
        this.setState({showModal: false});
    }

    searchMistake = () => {
        this.setState({title: ""});
        this.setState({cause: ""});
        this.setState({mistakeDate:""});
        fetch('http://localhost:8080/CRUD/SearchMistake?id=' + this.state.mistakeID,
            {
                method: 'POST',
                mode: 'cors',
            }
        )
            .then(response => {
                response.json()
                    .then(result => {
                        console.log("result: ", result);
                        this.setState({title: result.mistakeTitle});
                        this.setState({cause: result.mistakeCause});
                        this.setState({mistakeDate: formatTime(result.mistakeDate.time)});
                    });
    })
    };

    handleSearchID(event) {
        this.setState({mistakeID: event.target.value});
    }

    queryRedo = () => {
        fetch('http://localhost:8080/CRUD/QueryRedo?id=' + this.state.mistakeID,
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
                            let add={"times":result[i].times,"answer":result[i].answer,
                                "date":formatTime(result[i].redoDate.time)};
                            data.push(add);
                        }
                        this.setState({table:data});
                        data.splice(0,data.length);
                    });
            })
    };



    render() {

        return (
            <div>

                <br/>
                    <Button bsStyle="default" onClick={this.searchMistake}>查询</Button>
                <Col sm={4}>
                    <FormControl placeholder="请输入要查询的错题id"
                                 onChange={this.handleSearchID.bind(this)}/>
                </Col>
                <br/>
                <br/>
                <br/>

                <Button onClick={this.showImage}>Show Image</Button>
                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>图片信息</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <img src={this.state.img} alt="" height="500" width="570"/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close}>取消</Button>
                    </Modal.Footer>
                </Modal>

                <br/>
                <br/>

                <div>
                    <ListGroup>
                        <ListGroupItem header="标题">{this.state.title}</ListGroupItem>
                        <ListGroupItem header="错误原因" bsStyle="danger">{this.state.cause}</ListGroupItem>
                        <ListGroupItem header="错题记录日期" >{this.state.mistakeDate}</ListGroupItem>
                    </ListGroup>
                </div>
                <br/>
                <Button bsStyle="primary" onClick={this.queryRedo}>点击查看重做记录</Button>
                <br/>
                <ListGroup>{
                    this.state.table.map(function (item) {
                        return <ListGroupItem header={"第"+item.times+"次重做"} >
                                  <p>{"重做答案："+item.answer}</p>
                                  <p>{"重做日期："+item.date}</p>

                            </ListGroupItem>
                    })
                }
                </ListGroup>
            </div>
        );
    }
}
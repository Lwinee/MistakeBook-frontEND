import React, { Component } from 'react';
import {Button,FormControl,Col} from 'react-bootstrap';

export default class MistakeManager extends Component {
    constructor() {
        super();
        this.state = {
            deleteID: '',
            addPage:'',
            deletePage:''

        };
        this.handleDelete = this.handleDelete.bind(this);
        this.deleteMistake = this.deleteMistake.bind(this);

        this.handleAddFirstPage=this.handleAddFirstPage.bind(this);
        this.addPageMistake=this.addPageMistake.bind(this);
        this.deletePageMistake=this.deletePageMistake.bind(this);
        this.handleDeleteFirstPage=this.handleDeleteFirstPage.bind(this);
    }

    deleteMistake= () => {
        fetch('http://localhost:8080/CRUD/DeleteMistake?id=' + this.state.deleteID,
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

    deletePageMistake= () => {
        fetch('http://localhost:8080/Manager/DeletePageMistake?id=' + this.state.deletePage,
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

    addPageMistake= () => {
        fetch('http://localhost:8080/Manager/AddPageMistake?id=' + this.state.addPage,
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

    handleDelete(event) {
        this.setState({deleteID: event.target.value});
    }
    handleAddFirstPage(event) {
        this.setState({addPage: event.target.value});
    }
    handleDeleteFirstPage(event) {
        this.setState({deletePage: event.target.value});
    }

    render() {
        return (
            <div>
                <br/>
                <Button bsStyle="default" onClick={this.deleteMistake}>删除错题</Button>
                <Col sm={4}>
                    <FormControl placeholder="请输入错题ID"
                                 onChange={this.handleDelete}/>
                </Col>
                <br/>
                <br/>

                <Button bsStyle="default" onClick={this.addPageMistake}>添加</Button>
                <Col sm={4}>
                    <FormControl placeholder="请输入添加到主页的错题ID"
                                 onChange={this.handleAddFirstPage}/>
                </Col>
                <br/>
                <br/>
                <Button bsStyle="default" onClick={this.deletePageMistake}>删除</Button>
                <Col sm={4}>
                    <FormControl placeholder="请输入欲删除的主页的错题ID"
                                 onChange={this.handleDeleteFirstPage}/>
                </Col>
            </div>
        )
    }
}
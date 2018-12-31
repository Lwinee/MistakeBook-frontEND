import React, { Component } from 'react';
import {Button,FormControl,Col} from 'react-bootstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';




const products = [];

export default class MyMistake extends Component {
    constructor() {
        super();
        this.state = {
            table: products,
            deleteID:''
        };
        this.refresh = this.refresh.bind(this);
        this.deleteMistake = this.deleteMistake.bind(this);
    }

    refresh = ()=>{
            fetch('http://localhost:8080/CRUD/List?name='+this.props.username,
                {
                    method: 'POST',
                    mode: 'cors',
                }
            )
                .then(response=> {
                    response.json()
                .then(result =>{
                        console.log("result: ",result);
                        products.splice(0,products.length);
                        for(var i in result){
                            let add={"id":result[i].mistakeId,"subject":result[i].subject,
                                "title":result[i].mistakeTitle, "tag":result[i].tag};
                            products.push(add);
                            console.log("products: ",products);
                        }
                        console.log(products);
                        this.setState({table:products});


                })
        })
    };

    deleteMistake = ()=>{
        fetch('http://localhost:8080/CRUD/DeleteMistake?id='+this.state.deleteID,
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
                console.log("result: ", result);
                alert(result);
            });
    };


    handleDeleteID(event) {
        this.setState({deleteID: event.target.value});
    }

    render() {
        const options = {
            defaultSortName: 'id',
            clearSearch: true
        };


        return (
            <div>
                <br/>
                <Button bsStyle="default" onClick={this.deleteMistake} >删除</Button>
                <Button bsStyle="primary" onClick={this.refresh} >刷新界面</Button>

                <Col sm={3}>
                    <FormControl placeholder="请输入错题id" onChange={this.handleDeleteID.bind(this)}/>
                </Col>
                <BootstrapTable data={this.state.table} keyBoardNav columnFilter={true} options={ options }
                                 search={true}  >
                    <TableHeaderColumn isKey dataField='id' dataSort={ true } > Mistake ID </TableHeaderColumn>
                    <TableHeaderColumn dataField='subject'>Subject</TableHeaderColumn>
                    <TableHeaderColumn dataField='title'>Title</TableHeaderColumn>
                    <TableHeaderColumn dataField='tag'>Tag</TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }
}
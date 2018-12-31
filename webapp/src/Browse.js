import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {Button} from 'react-bootstrap';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';


const products = [];

export default class Browse extends Component {
    constructor() {
        super();
        this.state = {
            table: products
        };
        this.refresh = this.refresh.bind(this);
    }

    refresh = ()=>{
        fetch('http://localhost:8080/User/FirstPage',
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
                            let add={"id":result[i].mistakeId,
                                "title":result[i].mistakeTitle, "tag":result[i].tag};
                            products.push(add);
                            console.log("products: ",products);
                        }
                        console.log(products);
                        this.setState({table:products});
                    })
            })
    };



    render() {
        const options = {
            defaultSortName: 'id',
            clearSearch: true
        };
        return (
            <div>
                <Button bsStyle="primary" onClick={this.refresh} >刷新界面</Button>
                <br/>
                <br/>
                <BootstrapTable data={this.state.table} keyBoardNav columnFilter={true} options={ options }
                            pagination={true} search={true} >
                    <TableHeaderColumn isKey dataField='id' dataSort={ true } > Mistake ID </TableHeaderColumn>
                    <TableHeaderColumn dataField='title'>Title</TableHeaderColumn>
                    <TableHeaderColumn dataField='tag'>Tag</TableHeaderColumn>
                </BootstrapTable>
            </div>
    );
    }
}
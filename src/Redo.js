import React from 'react';

import {Button,FormGroup,ControlLabel,FormControl,Form} from 'react-bootstrap';

import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';


class Redo extends React.Component {
    constructor(){
        super();
        this.state={
            id:"",
            answer:"",
        };
        this.handleIDChange= this.handleIDChange.bind(this);
        this.handleAnswerChange= this.handleAnswerChange.bind(this);
        this.redoAnswer = this.redoAnswer.bind(this);
    }
    tools={ toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
            ['link', 'image'],
            ['formula'],
            ['clean'],
        ],

    };

    handleIDChange(event){
        this.setState({ id: event.target.value});
    }

    handleAnswerChange(value){
        this.setState({ answer : value })
    }

    redoAnswer(){

        let reAnswer=this.state.answer.replace(/<[^>]+>/g ,"");
        fetch('http://localhost:8080/CRUD/Redo?name='+this.props.username+'&answer='+reAnswer+
            '&mistakeID='+this.state.id,
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
    }

    render() {
        return(
            <div>
                <br/>
                <Form>
                    <FormGroup controlId="formInlineName">
                        <ControlLabel>输入错题ID</ControlLabel>
                        <FormControl type="text" placeholder="ID" onChange={this.handleIDChange}/>
                    </FormGroup>
                </Form>

                <br/>
                <ReactQuill theme="snow" value={ this.state.answer } modules={this.tools}
                            placeholder="重做" onChange={this.handleAnswerChange} />
                <br/>
                <Button bsStyle="primary" onClick={this.redoAnswer}>提交</Button>
            </div>
        )
    }
}
export default Redo;
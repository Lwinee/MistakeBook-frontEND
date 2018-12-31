import React from 'react';
import {Upload, message, Icon } from 'antd';
import {Button,FormGroup,Form,Modal,FormControl,DropdownButton,MenuItem,Col,Row,ControlLabel} from 'react-bootstrap';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';




const relatedTags=[];
class Add extends React.Component {
    constructor(){
        super();
        this.state={
            textTitle:"",
            textCause:"",
            showModal: false,
            title2:"标签",
            subject:"",
            tag:"",
            tagTip:relatedTags,
            fileList:[],
            uploading: false,
            img: "",
            disable:false,
            mistakeID:''
        };
        this.handleTitleChange= this.handleTitleChange.bind(this);
        this.handleCauseChange= this.handleCauseChange.bind(this);
        this.newMistake = this.newMistake.bind(this);
        this.handleClick1 = this.handleClick1.bind(this);
        this.handleClick2 = this.handleClick2.bind(this);
        this.handleClick3 = this.handleClick3.bind(this);
        this.handleClick4 = this.handleClick4.bind(this);
        this.handleClick5 = this.handleClick5.bind(this);
        this.handleClick6 = this.handleClick6.bind(this);
        this.handleTag = this.handleTag.bind(this);
        this.tagTip = this.tagTip.bind(this);
        this.showImage=this.showImage.bind(this);
        this.handleUpload=this.handleUpload.bind(this);
        this.close=this.close.bind(this);
        //this.imageHandler = this.imageHandler.bind(this);
    }

    toolbarOptions= [
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
            ['link', 'image'],
            ['formula'],
            ['clean'],

        ];

    tool={
        container:this.toolbarOptions,
    };


    newMistake= ()=>{
        console.log("title: ",this.state.textTitle);
        console.log("cause: ",this.state.textCause);
        let title=this.state.textTitle.replace(/<[^>]+>/g ,"");
        let cause=this.state.textCause.replace(/<[^>]+>/g ,"");
        fetch('http://localhost:8080/CRUD/AddMistake?name='+this.props.username+'&title='+title+
            '&cause='+cause+ '&subject='+this.state.subject+ '&tag='+this.state.tag,
            {
                method: 'POST',
                mode: 'cors',
            }
        )
            .then(response=> {
                console.log('Request successful', response);
                return response.text();
            })
            .then(result=> {
                console.log("result: ", result);
                let ID = result.substring(result.lastIndexOf('=')+1, result.length);
                console.log("ID: ", ID);
                this.setState({mistakeID:ID});

                alert(result);
            });
    };



    tagTip= ()=>{
        let querySubject = this.state.subject;
        fetch('http://localhost:8080/CRUD/QueryTagTip?subject='+querySubject,
            {
                method: 'POST',
                mode: 'cors',

            }
        )
            .then(response=> {
                response.text()
                    .then(result => {
                        console.log("result: ", result);
                        relatedTags.splice(0,relatedTags.length);
                        let splitTag=result.split(" ");
                        relatedTags.push(splitTag);
                        console.log(" relatedTags: ",  relatedTags);
                        this.setState({tagTip:relatedTags});

                    })

            });
    };



    handleTitleChange(value){
        this.setState({ textTitle: value});
    }
    handleCauseChange(value){
        this.setState({ textCause: value });
    }
    handleClick1(){
        this.setState({subject: 'Maths'},()=>{ this.tagTip()});
    }
    handleClick2(){
        this.setState({subject: 'Chinese'},()=>{ this.tagTip()});
    }
    handleClick3(){
        this.setState({subject: 'Chemistry'},()=>{ this.tagTip()});
    }
    handleClick4(){
        this.setState({subject: 'Physics'},()=>{ this.tagTip()});
    }
    handleClick5(){
        this.setState({subject: 'Biology'},()=>{ this.tagTip()});
    }
    handleClick6(){
        this.setState({subject: 'English'},()=>{ this.tagTip()});
    }
    handleTag(event){
        this.setState({tag: event.target.value});
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

    handleUpload = () => {
        const { fileList } = this.state;
        const formData = new FormData();
        fileList.forEach((file) => {
            formData.append('files[]', file);
        });

        this.setState({
            uploading: true,
        });

        fetch('http://localhost:8080/CRUD/image?mistakeID='+this.state.mistakeID ,
            {
                method: 'POST',
                mode: 'cors',
                body: formData,
            }
        )
            .then(response=> {
                return response.text()
                    .then(result => {
                        alert(result);
                    });
            });
    };

    close(){
        this.setState({showModal: false});
    }


    render() {
        const { uploading } = this.state;
        const props = {
            action: 'loveBaoBao',
            fileList: this.state.fileList,
            name: 'Ingram'
        };

       return(
           <div>
               <br/>
               <Row>
                   <Col md={1}>
                       <DropdownButton id="test" title="学科">
                           <MenuItem eventKey="1" onSelect={this.handleClick1}>Maths</MenuItem>
                           <MenuItem eventKey="2" onSelect={this.handleClick2}>Chinese</MenuItem>
                           <MenuItem eventKey="3" onSelect={this.handleClick3}>Chemistry</MenuItem>
                           <MenuItem eventKey="4" onSelect={this.handleClick4}>Physics</MenuItem>
                           <MenuItem eventKey="5" onSelect={this.handleClick5}>Biology</MenuItem>
                           <MenuItem eventKey="6" onSelect={this.handleClick6}>English</MenuItem>
                       </DropdownButton>
                   </Col>
                   <Col md={1}>
                           <Form inline>
                               <FormGroup controlId="formInlineEmail">
                                   <FormControl type="text" value={this.state.subject}/>
                               </FormGroup>
                           </Form>
                   </Col>
               </Row>

               <br/>
               <Form>
                   <FormGroup>
                       <ControlLabel>请输入标签</ControlLabel>
                       <FormControl type="text" placeholder="用空格分开" onChange={this.handleTag}/>
                   </FormGroup>
               </Form>

               <p> {"tag options: "+this.state.tagTip.toString()} </p>

               <br/>
               <ReactQuill theme="snow"
                           value={this.state.textTitle}
                           modules={this.tools}
                           placeholder="错题内容"
                           onChange={this.handleTitleChange} />
               <br/>
               <ReactQuill theme="snow" value={this.state.textCause} modules={this.tools}
                           placeholder="错误分析" onChange={this.handleCauseChange}/>
               <br/>
               <Button bsStyle="primary" onClick={this.newMistake}>提交</Button>
               <br/>
               <br/>


               <div>
                   <Col md={4}>
                       <Upload {...props}>
                           <Button>
                               <Icon type="upload" /> Select File
                           </Button>
                       </Upload>
                   </Col>
                   <Col md={4}>
                       <Button
                           className="upload-demo-start"
                           type="primary"
                           onClick={this.handleUpload}
                           disabled={this.state.disable}
                           loading={uploading}
                       >
                           {uploading ? 'Uploading' : 'Start Upload' }
                       </Button>
                   </Col>
                   <Col>
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
                   </Col>
                   <br/>
                   <br/>
               </div>









           </div>
       )
    }
}
export default Add;
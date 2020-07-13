import React, { Component } from "react";
import {
    Card,
    CardBody,
    CardImg,
    CardText,
    CardTitle,
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Modal,
    ModalHeader, ModalBody, Row, Label
} from "reactstrap";
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import { Link } from 'react-router-dom';
import { Control, Errors, LocalForm } from "react-redux-form";
import { FadeTransform, Fade, Stagger } from 'react-animation-components';



const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;


class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        }
        this.handleToggleModal = this.handleToggleModal.bind(this);
        this.submitComment = this.submitComment.bind(this);
    }


    handleToggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }


    submitComment(values) {
        console.log('Data after submit' + JSON.stringify(values));
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
        this.handleToggleModal();
    }


    render() {
        return (
            <React.Fragment>
                <Button outline color="secondary" onClick={this.handleToggleModal}><span className="fa fa-pencil"></span> Submit button</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.handleToggleModal}>
                    <ModalHeader toggle={this.handleToggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm className="container" onSubmit={(values) => this.submitComment(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select model=".rating"
                                    name="rating"
                                    className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author">Your Name</Label>
                                <Control.text model=".author"
                                    id="author"
                                    className="form-control"
                                    validators={{
                                        required,
                                        minLength: minLength(3),
                                        maxLength: maxLength(15)
                                    }} />
                                <Errors model=".author"
                                    className="text-danger"
                                    show="touched"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                />
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment">Comment</Label>
                                <Control.textarea model=".comment"
                                    className="form-control"
                                    id="comment"
                                    name="comment"
                                    rows="6">
                                </Control.textarea>
                            </Row>
                            <Button type="submit" color="primary">Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}



function RenderComments({ comments, postComment, dishId }) {
    if (comments != null) {
        return (
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    <Stagger in>
                        {comments.map((comment) => (
                            <Fade in>
                                <li key={comment.id}>
                                    <br></br>
                                    {comment.comment}
                                    <br></br>
                                    {comment.author} ,
                                {new Intl.DateTimeFormat('en-US',
                                        { year: 'numeric', month: 'short', day: '2-digit' }
                                    ).format(new Date(Date.parse(comment.date)))}
                                </li>
                            </Fade>
                        ))}
                    </Stagger>
                </ul>
                <CommentForm dishId={dishId} postComment={postComment} />
            </div>
        );
    } else {
        return (
            <div>
                <CommentForm />
            </div>
        );
    }
}

function RenderDish({ dish }) {
    return (
        <FadeTransform
            in
            transformProps={{
                exitTransform: 'scale(0.5) translateY(-50%)'
            }}>
            <Card>
                <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </FadeTransform>
    )
}


function DishDetail(props) {
    let dish = props.dish;
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (dish != null)
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={dish}></RenderDish>
                    </div>
                    <RenderComments comments={props.comments}
                        postComment={props.postComment}
                        dishId={props.dish.id}
                    />
                </div>
            </div>
        );
    else {
        return (
            <div></div>
        );
    }
}

export default DishDetail;






















// import React, { Component } from 'react';
// import {
//     Card, CardImg, CardText, CardBody,
//     CardTitle, Breadcrumb, BreadcrumbItem, Modal, ModalHeader, ModalBody,
//     Button, Row, Col, Label
// } from 'reactstrap';
// import { Control, LocalForm, Errors } from 'react-redux-form';
// import { Link } from 'react-router-dom';
// import { Comments } from '../redux/comments';


// const required = (val) => val && val.length;
// const maxLength = (len) => (val) => !(val) || (val.length <= len);
// const minLength = (len) => (val) => val && (val.length >= len);

// class DishDetail extends Component {
//     constructor(props) {
//         super(props);


//         this.state = {
//             isNavOpen: false,
//             isModalOpen: false
//         };

//         this.toggleModal = this.toggleModal.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }


//     toggleModal() {
//         this.setState({
//             isModalOpen: !this.state.isModalOpen
//         });
//     }

//     handleSubmit(values) {
//         console.log('Current State is: ' + JSON.stringify(values));
//         alert('Current State is: ' + JSON.stringify(values));
//         console.log(this.props.addComment(this.props.dishId, values.rating, values.author, values.comment));
//         // event.preventDefault();
//     }



//     RenderDish(dish) {
//         return (
//             <Card key={dish.id}>
//                 <CardImg width="100%" src={dish.image} alt={dish.name} />
//                 <CardBody>
//                     <CardTitle>{dish.name}</CardTitle>
//                     <CardText>{dish.description}</CardText>
//                 </CardBody>
//             </Card>
//         );
//     }

//     RenderComments(comments, addComment, dishId) {
//         return (
//             comments.map((comment) => {
//                 return (
//                     <div>
//                         <ul key={comment.id} className="list-unstyled">
//                             <li>
//                                 {comment.comment}
//                             </li>
//                             <br></br>
//                             <li>
//                                 {comment.author} ,
//                                   {new Intl.DateTimeFormat('en-US',
//                                     { year: 'numeric', month: 'short', day: '2-digit' }
//                                 ).format(new Date(Date.parse(comment.date)))}
//                             </li>
//                         </ul>
//                         {this.CommentForm(addComment, dishId)}
//                     </div>
//                 );
//             })

//         );
//     }

//     CommentForm() {
//         return (
//             <div>
//                 <Button outline color="secondary" onClick={this.toggleModal}><span className="fa fa-pencil"></span> Submit button</Button>
//             </div>
//         );
//     }

//     render() {
//         const dish = this.props.dish;
//         const comments = this.props.comments;

//         if (dish != null && comments != null) {
//             return (
//                 <div className="container">
//                     <div className="row">
//                         <Breadcrumb>
//                             <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
//                             <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
//                         </Breadcrumb>
//                         <div className="col-12">
//                             <h3>{dish.name}</h3>
//                             <hr />
//                         </div>
//                     </div>
//                     <div className="row">
//                         <div className="col-12 col-md-5 m-1">
//                             {this.RenderDish(dish)}
//                         </div>
//                         <div className="col-12 col-md-5 m-1">
//                             {this.RenderComments(comments, this.props.addComment, dish.id)}


//                             <br></br>
//                         </div>
//                     </div>
//                     <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
//                         <ModalHeader toggle={this.toggleModal}><h4>Submit Comment</h4></ModalHeader>
//                         <ModalBody className="px-5">
//                             <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
//                                 <Row>
//                                     <Label htmlFor="rating" >Rating</Label>
//                                 </Row>
//                                 <Row className="form-group">
//                                     <Control.select model=".rating" id="rating" name="rating"
//                                         // placeholder="1"
//                                         className="form-control">
//                                         <option>1</option>
//                                         <option>2</option>
//                                         <option>3</option>
//                                         <option>4</option>
//                                         <option>5</option>
//                                     </Control.select>
//                                 </Row>
//                                 <Row>
//                                     <Label htmlFor="author">Your Name</Label>
//                                 </Row>
//                                 <Row className="form-group">
//                                     <Control.text model=".author" id="author" name="author"
//                                         placeholder="Your Name"
//                                         className="form-control"
//                                         validators={{
//                                             required, minLength: minLength(3), maxLength: maxLength(15)
//                                         }}
//                                     />
//                                     <Errors
//                                         className="text-danger"
//                                         model=".name"
//                                         show="touched"
//                                         messages={{
//                                             required: 'Required ',
//                                             minLength: 'Must be greater than 2 characters',
//                                             maxLength: 'Must be 15 characters or less'
//                                         }}
//                                     />
//                                 </Row>

//                                 <Row>
//                                     <Label htmlFor="comment">Your Feedback</Label>
//                                 </Row>

//                                 <Row className="form-group">
//                                     <Control.textarea model=".comment" id="comment" name="comment"
//                                         rows="6"
//                                         className="form-control" />
//                                 </Row>

//                                 <Row className="form-group">
//                                     <Col>
//                                         <Button type="submit" color="primary">
//                                             Submit
//                                     </Button>
//                                     </Col>
//                                 </Row>
//                             </LocalForm>
//                         </ModalBody>
//                     </Modal>
//                 </div>
//             );
//         }
//         else {
//             return (
//                 <div>
//                 </div>
//             );
//         }
//     }
// }

// export default DishDetail;
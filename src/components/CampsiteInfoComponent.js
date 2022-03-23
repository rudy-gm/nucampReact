import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
} from "reactstrap";
import { Link } from "react-router-dom";
import ReturnArrow from "./ReturnArrowComponent";
import NextArrow from "./NextArrow";
import { LocalForm, Control, Errors } from "react-redux-form";
import { addComment } from "../redux/ActionCreator";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";

const minLength = (amount) => (value) => {
  return value && value.length >= amount;
};

const maxLength = (amount) => (value) => {
  return value && value.length <= amount;
};

const required = (value) => {
  return value;
};

function RenderCampsite({ campsite }) {
  return (
    <div className="col-md-5 m-1">
      <Card>
        <CardImg top src={baseUrl +campsite.image} alt={campsite.name}></CardImg>
        <CardBody>
          <CardText>{campsite.description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}

function RenderComments({ comments, campsiteId, addComment }) {
  if (comments) {
    return (
      <div className="col-md-5 m-1">
        <h4>Comments</h4>
        {comments.map((singleComment) => {
          return (
            <div>
              {singleComment.text} <br />
              --{singleComment.author}{" "}
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
              }).format(new Date(Date.parse(singleComment.date)))}
              <br></br>
              <br></br>
            </div>
          );
        })}
        <CommentForm
          campsiteId={campsiteId}
          addComment={addComment}
        ></CommentForm>
      </div>
    );
  } else {
    return (
      <div>
        <CommentForm></CommentForm>
      </div>
    );
  }
}

function CampsiteInfo(props) {
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  }
  if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h4>{props.errMess}</h4>
          </div>
        </div>
      </div>
    );
  }

  if (props.campsite) {
    console.log(props.campsite);
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/home">Home</Link>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <Link to="/directory">Directory</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
            </Breadcrumb>
            <h2>{props.campsite.name}</h2>
            <ReturnArrow></ReturnArrow>
            <NextArrow campsite={props.campsite}></NextArrow>
            <hr />
          </div>
        </div>
        <div className="row">
          <RenderCampsite campsite={props.campsite}></RenderCampsite>
          <RenderComments
            comments={props.comments}
            addComment={props.addComment}
            campsiteId={props.campsite.id}
          ></RenderComments>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}

class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
    };
  }

  toggleModal = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  };

  handleSubmit = (values) => {
    this.toggleModal();
    this.props.addComment(
      this.props.campsiteId,
      values.rating,
      values.author,
      values.text
    );
  };

  render() {
    return (
      <div>
        <Button outline onClick={this.toggleModal}>
          <i className="fa fa-pencil fa-lg"></i>
          Submit Comment
        </Button>

        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={this.handleSubmit}>
              <div className="form-group">
                <Label htmlFor="author">Author</Label>

                <Control.select
                  model=".rating"
                  name="rating"
                  id="rating"
                  placeholder="Your Name"
                  className="form-control"
                  defaultValue={1}
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Control.select>
              </div>

              <div className="form-group">
                <Label htmlFor="author">Author</Label>

                <Control.text
                  model=".author"
                  name="author"
                  id="author"
                  placeholder="Your Name"
                  className="form-control"
                  validators={{
                    minLength: minLength(2),
                    maxLength: maxLength(15),
                    required,
                  }}
                ></Control.text>

                <Errors
                  model=".author"
                  className="text-danger"
                  show="touched"
                  component="div"
                  messages={{
                    minLength: "There has to be at least 2 characters",
                    required: "This field is required",
                    maxLength: "Must be 15 characters or less",
                  }}
                ></Errors>
              </div>

              <div className="form-group">
                <Label htmlFor="text">Comment</Label>

                <Control.textarea
                  model=".text"
                  name="text"
                  id="text"
                  className="form-control"
                  rows={6}
                ></Control.textarea>
              </div>

              <Button type="submit">Submit</Button>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default CampsiteInfo;

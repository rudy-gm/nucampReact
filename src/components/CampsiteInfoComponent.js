import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";

function RenderCampsite({ campsite }) {
  return (
    <div className="col-md-5 m-1">
      <Card>
        <CardImg top src={campsite.image} alt={campsite.name}></CardImg>
        <CardBody>
          <CardTitle>{campsite.name}</CardTitle>
          <CardText>{campsite.description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}

function RenderComments({ comments }) {
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
            </div>
          );
        })}
      </div>
    );
  } else {
    return <div></div>;
  }
}

function CampsiteInfo(props) {
  if (props.campsite) {
    console.log(props.campsite);
    return (
      <div className="container">
        <div className="row">
          <RenderCampsite campsite={props.campsite}></RenderCampsite>
          <RenderComments comments={props.campsite.comments}></RenderComments>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default CampsiteInfo;

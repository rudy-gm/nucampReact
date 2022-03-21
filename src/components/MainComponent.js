import React, { Component } from "react";
import Directory from "./DirectoryComponent";
import CampsiteInfo from "./CampsiteInfoComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Home from "./HomeComponent";
import Contact from "./ContactComponent";
import About from "./AboutComponent";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addComment } from "../redux/ActionCreator";

const mapStateToProps = state => {
  return {
    campsites: state.campsites,
    comments: state.comments,
    partners: state.partners,
    promotions: state.promotions,
  };
};


const mapDispacthToProps = {

  addComment: (campsiteId,author,rating,text) => (addComment(campsiteId,author,rating,text))
}


class Main extends Component {
  render() {

    const HomePage = () => {
      return (
        <Home
          campsite={
            this.props.campsites.filter((campsite) => campsite.featured)[0]
          }
          promotion={
            this.props.promotions.filter((promotion) => promotion.featured)[0]
          }
          partner={this.props.partners.filter((partner) => partner.featured)[0]}
        ></Home>
      );
    };

    const CampsiteWithId = ({ match }) => {
      return (
        <React.Fragment>
          <CampsiteInfo
            campsite={
              this.props.campsites.filter(
                (campsite) => campsite.id === +match.params.campsiteId
              )[0]
            }
            comments={this.props.comments.filter(
              (comment) => comment.campsiteId === +match.params.campsiteId
            )}

            addComment={this.props.addComment}
          ></CampsiteInfo>
        </React.Fragment>
      );
    };

    return (
      <div>
        <Header></Header>
        <Switch>
          <Route path="/home" component={HomePage}></Route>
          <Route
            exact
            path="/directory"
            render={() => (
              <Directory campsites={this.props.campsites}></Directory>
            )}
          ></Route>
          <Route
            path="/aboutus"
            render={() => <About partners={this.props.partners}></About>}
          ></Route>
          <Route exact path="/contactus" component={Contact}></Route>
          <Route
            path="/directory/:campsiteId"
            component={CampsiteWithId}
          ></Route>
          <Redirect to="/home"></Redirect>
        </Switch>
        <Footer></Footer>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps,mapDispacthToProps)(Main));

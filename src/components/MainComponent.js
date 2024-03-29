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
import {
  postComment,
  fetchCampsites,
  fetchComments,
  fetchPromotions,
  fetchPartners,
  postFeedback
} from "../redux/ActionCreator";
import { actions } from "react-redux-form";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const mapStateToProps = (state) => {
  return {
    campsites: state.campsites,
    comments: state.comments,
    partners: state.partners,
    promotions: state.promotions,
  };
};

const mapDispacthToProps = {
  postComment: (campsiteId, rating, author, text) =>
    postComment(campsiteId, rating, author, text),
  fetchCampsites: () => fetchCampsites(),
  resetFeedbackForm: () => actions.reset("feedbackForm"),
  fetchComments: () => fetchComments(),
  fetchPromotions: () => fetchPromotions(),
  fetchPartners: ()=> fetchPartners(),
  postFeedback: (newFeedback) => postFeedback(newFeedback),
};

class Main extends Component {
  componentDidMount() {
    this.props.fetchCampsites();
    this.props.fetchComments();
    this.props.fetchPromotions();
    this.props.fetchPartners();
  }

  render() {
    const HomePage = () => {
      return (
        <Home
          campsite={
            this.props.campsites.campsites.filter(
              (campsite) => campsite.featured
            )[0]
          }
          campsitesLoading={this.props.campsites.isLoading}
          campsitesErrMess={this.props.campsites.errMess}
          promotion={
            this.props.promotions.promotions.filter(
              (promotion) => promotion.featured
            )[0]
          }
          promotionLoading={this.props.promotions.isLoading}
          promotionErrMess={this.props.promotions.errMess}
          partner={this.props.partners.partners.filter((partner) => partner.featured)[0]}
          partnerLoading={this.props.partners.isLoading}
          partnerErrMess={this.props.partners.errMess}

         
        />
      );
    };

    const CampsiteWithId = ({ match }) => {
      return (
        <React.Fragment>
          <CampsiteInfo
            campsite={
              this.props.campsites.campsites.filter(
                (campsite) => campsite.id === +match.params.campsiteId
              )[0]
            }
            isLoading={this.props.campsites.isLoading}
            errMess={this.props.campsites.errMess}
            comments={this.props.comments.comments.filter(
              (comment) => comment.campsiteId === +match.params.campsiteId
            )}
            commentsErrMess={this.props.comments.errMess}
            postComment={this.props.postComment}
          />
        </React.Fragment>
      );
    };

    return (
      <div>
        <Header></Header>
        <TransitionGroup>
          <CSSTransition
            key={this.props.location.key}
            classNames="page"
            timeout={300}
          >
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
              <Route
                exact
                path="/contactus"
                render={() => (
                  <Contact
                    resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback}
                  ></Contact>
                )}
              ></Route>
              <Route
                path="/directory/:campsiteId"
                component={CampsiteWithId}
              ></Route>
              <Redirect to="/home"></Redirect>
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer></Footer>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispacthToProps)(Main));

import React, { Component, Fragment } from "react";
import { Menu, Container, Button, Image } from "semantic-ui-react";
import { NavLink, Link, withRouter } from "react-router-dom";
import SignedOutMenu from "../Menus/SignedOutMenu";
import SignedInMenu from "../Menus/SignedInMenu";
import { connect } from "react-redux";
import { openModal } from "../../modals/modalActions";
import { withFirebase } from "react-redux-firebase";

const actions = {
  openModal
};
const mapState = state => ({
  auth: state.firebase.auth,
  profile:state.firebase.profile
});
class NavBar extends Component {
  handleSignIn = () => {
    this.props.openModal("LoginModal");
  };
  handleRegister = () => {
    this.props.openModal("RegisterModal");
  };
  handleSignOut = () => {
    this.props.firebase.logout();
    this.props.history.push("/");
  };
  render() {
    const { auth,profile } = this.props;
    const authenticated = auth.isLoaded && !auth.isEmpty;
    return (
      <Fragment>
        <Menu inverted fixed="top">
          <Container>
            <Menu.Item as={NavLink} exact to="/" header>
              <Image size="small" src="assets/logoHHTools.png" alt="logo" />
            </Menu.Item>
            <Menu.Item as={NavLink} exact to="/jobs" name="Jobs" />
            {authenticated && (
              <Fragment>
                <Menu.Item as={NavLink} to="/contractors" name="Contractors" />
                <Menu.Item as={NavLink} to="/test" name="Test" />
                <Menu.Item>
                  <Button
                    as={Link}
                    to="/createJob"
                    floated="right"
                    positive
                    inverted
                    content="Create job Enquiry"
                  />
                </Menu.Item>
              </Fragment>
            )}
            {authenticated ? (
              <SignedInMenu  signOut={this.handleSignOut} profile={profile} currentUser={auth.currentUser} auth={auth} />
            ) : (
              <SignedOutMenu
                signIn={this.handleSignIn}
                register={this.handleRegister}
              />
            )}
          </Container>
        </Menu>
      </Fragment>
    );
  }
}
export default withRouter(
  withFirebase(
    connect(
      mapState,
      actions
    )(NavBar)
  )
);

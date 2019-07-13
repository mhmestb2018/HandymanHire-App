import React, { Component } from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import { NavLink, Link, withRouter } from "react-router-dom";
import SignedOutMenu from "../Menus/SignedOutMenu";
import SignedInMenu from "../Menus/SignedInMenu";
import { connect } from "react-redux";
import { openModal } from "../../modals/modalActions";
import { logout } from "../../auth/authActions";

const actions = {
  openModal
};
const mapState = state => ({
  auth: state.auth
});
class NavBar extends Component {
  handleSignIn = () => {
    this.props.openModal("LoginModal");
  };
  handleRegister = () => {
    this.props.openModal("RegisterModal");
  };

  handleSignOut = () => {
    this.props.logout();
    this.props.history.push("/");
  };
  render() {
    const { auth } = this.props;
    const authenticated = auth.authenticated;
    return (
      <Menu inverted fixed="top">
        <Container>
          <Menu.Item as={NavLink} exact to="/" header>
            <img src="assets/categoryImages/logo.png" alt="logo" />
            Job-hire
          </Menu.Item>
          <Menu.Item as={NavLink} exact to="/jobs" name="Jobs" />
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
          {authenticated ? (
            <SignedInMenu
              signOut={this.handleSignOut}
              currentUser={auth.currentUser}
            />
          ) : (
            <SignedOutMenu
              signIn={this.handleSignIn}
              register={this.handleRegister}
            />
          )}
        </Container>
      </Menu>
    );
  }
}
export default withRouter(
  connect(
    mapState,
    actions
  )(NavBar)
);

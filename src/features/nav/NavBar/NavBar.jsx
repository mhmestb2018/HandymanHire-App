import React, { Component, Fragment } from "react";
import {
  Menu,
  Container,
  Button,
  Image,
  Dropdown,
  Icon,
  Responsive,
  Sticky,
  Sidebar,
  Segment
} from "semantic-ui-react";
import { NavLink, Link, withRouter } from "react-router-dom";
import SignedOutMenu from "../Menus/SignedOutMenu";
import SignedInMenu from "../Menus/SignedInMenu";
import { connect } from "react-redux";
import { openModal } from "../../modals/modalActions";
import { withFirebase } from "react-redux-firebase";
import PropTypes from "prop-types";
const getWidth = () => {
  const isSSR = typeof window === "undefined";

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};
const actions = {
  openModal
};
const mapState = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile
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
    const { auth, profile,contextRef } = this.props;
    const authenticated = auth.isLoaded && !auth.isEmpty;
    return (
      <Fragment>
        {/* Menu for desktop */}
        {/* <Sticky context={contextRef} styleElement={{ zIndex: 1 }}> */}
        <Menu stackable>
          <Container>
            <Image
              as={NavLink}
              exact
              to="/"
              size="small"
              src="assets/logoHHTools.png"
              alt="logo"
            />

            <Menu.Item position="left">
              <Icon name="sidebar" size="large" />
              <Dropdown pointing="top right" text="Menu">
                <Dropdown.Menu>
                  <Dropdown.Item
                    as={Link}
                    to={`/jobs`}
                    text="Jobs"
                    icon="wrench"
                  />
                  {authenticated && (
                    <Dropdown.Item
                      as={Link}
                      to="/members"
                      text="Members"
                      icon="users"
                    />
                  )}
                  <Dropdown.Item
                    as={Link}
                    to={`/contact`}
                    text="Contact Us"
                    icon="mail"
                  />
                  <Dropdown.Item
                    as={Link}
                    to={`/termsConditions`}
                    text="T & C"
                    icon="handshake"
                  />
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>

            {authenticated && (
              <Fragment>
                <Menu.Item position="left">
                  <Button
                    as={Link}
                    to="/createJob"
                    icon="plus"
                    basic
                    color="black"
                    content="Post a job"
                  />
                </Menu.Item>
              </Fragment>
            )}

            {authenticated ? (
              <SignedInMenu
                signOut={this.handleSignOut}
                profile={profile}
                currentUser={auth.currentUser}
                auth={auth}
              />
            ) : (
              <SignedOutMenu
                signIn={this.handleSignIn}
                register={this.handleRegister}
              />
            )}
           
          </Container>
        </Menu>
        {/* </Sticky> */}
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

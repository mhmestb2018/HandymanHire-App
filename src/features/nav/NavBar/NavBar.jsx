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
    const { auth, profile, contextRef } = this.props;
    const authenticated = auth.isLoaded && !auth.isEmpty;
    return (
      <Fragment ref={this.contextRef}>
        {/* Menu for desktop */}

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
            {/* <Responsive
              getWidth={getWidth}
              maxWidth={Responsive.onlyMobile.maxWidth}
            > */}

            <Menu.Item position="left">
              {/* <Icon name="user" size="big" /> */}
              <Icon name="align justify" size="large" />
              <Dropdown pointing="top right" text="Menu">
                <Dropdown.Menu>
                  {/* <Dropdown.Item text="Create Job Enquiry" icon="plus"  />
                  <Dropdown.Item text="My Jobs" icon="calendar" />
                  <Dropdown.Item text="My Proposals" icon="users" /> */}
                  <Dropdown.Item
                    as={Link}
                    to={`/jobs`}
                    text="Jobs"
                    icon="wrench"
                  />
                  <Dropdown.Item
                    as={Link}
                    to="/members"
                    text="Members"
                    icon="users"
                  />
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>
            {/* </Responsive> */}
            {/* <Menu.Item as={NavLink} exact to="/jobs" name="Jobs" /> */}

            {authenticated && (
              <Fragment>
                {/* <Menu.Item as={NavLink} to="/members" name="Members" /> */}
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

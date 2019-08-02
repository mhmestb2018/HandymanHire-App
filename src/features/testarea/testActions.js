import { INCREMENT_COUNTER, DECREMENT_COUNTER } from "./testConstants";
import { asyncActionFinish } from "../async/asyncActions";
import { ASYNC_ACTION_START } from "../async/asyncConstants";

export const incrementCounter = () => {
  return {
    type: INCREMENT_COUNTER
  };
};
export const decrementCounter = () => {
  return {
    type: DECREMENT_COUNTER
  };
};
const delay = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
export const incrementAsync = name => {
  return async dispatch => {
    dispatch({ type: ASYNC_ACTION_START, payload: name });
    await delay(1000);
    dispatch(incrementCounter());
    dispatch(asyncActionFinish());
  };
};
export const decrementAsync = name => {
  return async dispatch => {
    dispatch({ type: ASYNC_ACTION_START, payload: name });
    await delay(4000);
    dispatch({ type: DECREMENT_COUNTER });
    dispatch(asyncActionFinish());
  };
};

// import React, { Component, Fragment } from "react";
// import { Menu, Container, Button, Image } from "semantic-ui-react";
// import { NavLink, Link, withRouter } from "react-router-dom";
// import SignedOutMenu from "../Menus/SignedOutMenu";
// import SignedInMenu from "../Menus/SignedInMenu";
// import { connect } from "react-redux";
// import { openModal } from "../../modals/modalActions";
// import { withFirebase } from "react-redux-firebase";
// import PropTypes from "prop-types";

// import {
//   Divider,
//   Grid,
//   Header,
//   Icon,
//   List,
//   Responsive,
//   Segment,
//   Sidebar,
//   Visibility
// } from "semantic-ui-react";

// const getWidth = () => {
//   const isSSR = typeof window === "undefined";

//   return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
// };
// const actions = {
//   openModal
// };
// const mapState = state => ({
//   auth: state.firebase.auth,
//   profile: state.firebase.profile
// });

// class NavBar extends Component {
//   handleSignIn = () => {
//     this.props.openModal("LoginModal");
//   };
//   handleRegister = () => {
//     this.props.openModal("RegisterModal");
//   };
//   handleSignOut = () => {
//     this.props.firebase.logout();
//     this.props.history.push("/");
//   };
//   state = {};

//   hideFixedMenu = () => this.setState({ fixed: false });
//   showFixedMenu = () => this.setState({ fixed: true });
//   render() {
//     const { auth, profile, children } = this.props;
//     const authenticated = auth.isLoaded && !auth.isEmpty;
//     const { fixed } = this.state;
//     return (
//       <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
//         <Visibility
//           once={false}
//           onBottomPassed={this.showFixedMenu}
//           onBottomPassedReverse={this.hideFixedMenu}
//         >
//           <Segment
//             inverted
//             textAlign="center"
//             // style={{ minHeight: 700, padding: "1em 0em" }}
//             vertical
//           >
//             <Menu
//               fixed={fixed ? "top" : null}
//               inverted={!fixed}
//               pointing={!fixed}
//               secondary={!fixed}
//               size="large"
//             >
//               <Image
//                 as={NavLink}
//                 exact
//                 to="/"
//                 size="small"
//                 src="assets/logoHHTools.png"
//                 alt="logo"
//               />
//               <Container>
//                 <Menu.Item as={NavLink} exact to="/jobs" name="Jobs" />
//                 {authenticated &
//                 (
//                   <Fragment>
//                     <Menu.Item as={NavLink} to="/members" name="Members" />
//                     <Menu.Item as={NavLink} to="/test" name="Test" />
//                     <Menu.Item>
//                       <Button
//                         as={Link}
//                         to="/createJob"
//                         floated="right"
//                         positive
//                         inverted
//                         content="Create job Enquiry"
//                       />
//                     </Menu.Item>
//                   </Fragment>
//                 )}

//                 {authenticated ? (
//                   <SignedInMenu
//                     signOut={this.handleSignOut}
//                     profile={profile}
//                     currentUser={auth.currentUser}
//                     auth={auth}
//                   />
//                 ) : (
//                   <SignedOutMenu
//                     signIn={this.handleSignIn}
//                     register={this.handleRegister}
//                   />
//                 )}
//               </Container>
//             </Menu>
//           </Segment>
//         </Visibility>{" "}
//         {children}
//       </Responsive>
//     );
//   }
// }

// class MobileContainer extends Component {
//   state = {};

//   handleSidebarHide = () => this.setState({ sidebarOpened: false });

//   handleToggle = () => this.setState({ sidebarOpened: true });

//   render() {
//     const { sidebarOpened } = this.state;
//     const { auth, profile, children } = this.props;
//     const authenticated = auth.isLoaded && !auth.isEmpty;
//     return (
//       <Responsive
//         as={Sidebar.Pushable}
//         getWidth={getWidth}
//         maxWidth={Responsive.onlyMobile.maxWidth}
//       >
//         <Sidebar
//           as={Menu}
//           animation="push"
//           inverted
//           onHide={this.handleSidebarHide}
//           vertical
//           visible={sidebarOpened}
//         >
//           <Menu.Item as={NavLink} exact to="/jobs" name="Jobs" />
//           {authenticated &
//           (
//             <Fragment>
//               <Menu.Item as={NavLink} to="/members" name="Members" />
//               <Menu.Item as={NavLink} to="/test" name="Test" />
//               <Menu.Item>
//                 <Button
//                   as={Link}
//                   to="/createJob"
//                   floated="right"
//                   positive
//                   inverted
//                   content="Create job Enquiry"
//                 />
//               </Menu.Item>
//             </Fragment>
//           )}
//         </Sidebar>

//         <Sidebar.Pusher dimmed={sidebarOpened}>
//           <Segment
//             inverted
//             textAlign="center"
//             style={{ minHeight: 350, padding: "1em 0em" }}
//             vertical
//           >
//             <Container>
//               <Menu inverted pointing secondary size="large">
//                 <Menu.Item onClick={this.handleToggle}>
//                   <Icon name="sidebar" />
//                 </Menu.Item>
//                 {authenticated ? (
//                   <SignedInMenu
//                     signOut={this.handleSignOut}
//                     profile={profile}
//                     currentUser={auth.currentUser}
//                     auth={auth}
//                   />
//                 ) : (
//                   <SignedOutMenu
//                     signIn={this.handleSignIn}
//                     register={this.handleRegister}
//                   />
//                 )}
//               </Menu>
//             </Container>
//           </Segment>

//           {children}
//         </Sidebar.Pusher>
      
//       </Responsive>
      
//     );
//   }
// }

// MobileContainer.propTypes = {
//   children: PropTypes.node
// };

// const ResponsiveContainer = ({ children }) => (
//   <div>
//     <NavBar>{children}</NavBar>
//     <MobileContainer>{children}</MobileContainer>
//   </div>
// );

// ResponsiveContainer.propTypes = {
//   children: PropTypes.node
// };

// export default withRouter(
//   withFirebase(
//     connect(
//       mapState,
//       actions
//     )(MobileContainer)
//   )
// );

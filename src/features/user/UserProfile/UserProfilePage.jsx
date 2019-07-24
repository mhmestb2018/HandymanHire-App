import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import { firestoreConnect, isEmpty } from "react-redux-firebase";
import { compose } from "redux";
import UserProfileHeader from "./UserProfileHeader";
import UserProfileDescription from "./UserProfileDescription";
import UserProfileProjects from "./UserProfileProjects";
import UserProfileSidebar from "./UserProfileSidebar";
import UserProfileWorkOrders from "./UserProfileWorkOrders";
import { userProfileQuery } from "../userQueries";
import LoadingComponent from "../../../app/layout/LoadingComponent";
//to link specific user to specific profile
const mapState = (state, ownProps) => {
  let userUid = null;
  let profile = {};
  if (ownProps.match.params.id === state.auth.uid) {
    profile = state.firebase.profile;
  } else {
    profile =
      !isEmpty(state.firestore.ordered.profile) &&
      state.firestore.ordered.profile[0];
    userUid = ownProps.match.params.id;
  }
  return {
    userUid,
    profile,
    auth: state.firebase.auth,
    photos: state.firestore.ordered.photos,
    requesting: state.firestore.status.requesting
  };
};

class UserProfilePage extends Component {
  render() {
    const { profile, photos, auth, match, requesting } = this.props;
    const isCurrentUser = auth.uid === match.params.id;
    const loading = Object.values(requesting).some(a => a === true);
    if (loading) return <LoadingComponent />;
    return (
      <Grid>
        <UserProfileHeader profile={profile} />
        <UserProfileDescription profile={profile} />
        <UserProfileSidebar isCurrentUser={isCurrentUser} />
        <UserProfileProjects photos={photos} />
        <UserProfileWorkOrders />
      </Grid>
    );
  }
}
export default compose(
  connect(mapState),
  firestoreConnect((auth, userUid) => userProfileQuery(auth, userUid))
)(UserProfilePage);

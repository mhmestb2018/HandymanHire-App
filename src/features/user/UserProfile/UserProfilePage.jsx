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
import { getUserWorkOrders, followMember,unfollowMember } from "../../auth/userActions";

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
    requesting: state.firestore.status.requesting,
    workOrders: state.workOrders,
    workOrdersLoading: state.async.loading,
    following: state.firestore.ordered.following
  };
};
const actions = {
  getUserWorkOrders,
  followMember,
  unfollowMember
};
class UserProfilePage extends Component {
  async componentDidMount() {
    let workOrders = await this.props.getUserWorkOrders(this.props.userUid);
    console.log(workOrders);
  }
  changeTab = (e, data) => {
    this.props.getUserWorkOrders(this.props.userUid, data.activeIndex);
  };
  render() {
    const {
      profile,
      photos,
      auth,
      match,
      requesting,
      workOrders,
      workOrdersLoading,
      followMember,
      following,
      unfollowMember
    } = this.props;
    const isCurrentUser = auth.uid === match.params.id;
    const loading = Object.values(requesting).some(a => a === true);
    const isFollowing = !isEmpty(following);
    if (loading) return <LoadingComponent inverted={true} />;
    return (
      <Grid stackable>
        <UserProfileHeader profile={profile} />
        <UserProfileDescription profile={profile} />
        <UserProfileSidebar
          isCurrentUser={isCurrentUser}
          profile={profile}
          followMember={followMember}
          isFollowing={isFollowing}
          unfollowMember={unfollowMember}
        />
        <UserProfileProjects photos={photos} />
        <UserProfileWorkOrders
          workOrders={workOrders}
          workOrdersLoading={workOrdersLoading}
          changeTab={this.changeTab}
        />
      </Grid>
    );
  }
}
export default compose(
  connect(
    mapState,
    actions
  ),
  firestoreConnect((auth, userUid, match) =>
    userProfileQuery(auth, userUid, match)
  )
)(UserProfilePage);

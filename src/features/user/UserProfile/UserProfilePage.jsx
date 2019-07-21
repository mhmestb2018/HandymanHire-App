import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import UserProfileHeader from "./UserProfileHeader";
import UserProfileDescription from "./UserProfileDescription";
import UserProfileProjects from "./UserProfileProjects";
import UserProfileSidebar from "./UserProfileSidebar";
import UserProfileWorkOrders from "./UserProfileWorkOrders";

const query = ({ auth }) => {
  return [
    {
      collection: "users",
      doc: auth.uid,
      subcollections: [{ collection: "photos" }],
      storeAs: "photos"
    }
  ];
};
const mapState = state => ({
  profile: state.firebase.profile,
  auth: state.firebase.auth,
  photos: state.firestore.ordered.photos
});

class UserProfilePage extends Component {
  render() {
    const { profile, photos } = this.props;
    return (
      <Grid>
        <UserProfileHeader profile={profile} />
        <UserProfileDescription profile={profile} />
        <UserProfileSidebar />
        <UserProfileProjects photos={photos} />
        <UserProfileWorkOrders />
      </Grid>
    );
  }
}
export default compose(
  connect(mapState),
  firestoreConnect(auth => query(auth))
)(UserProfilePage);


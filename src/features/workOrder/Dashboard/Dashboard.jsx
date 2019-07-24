import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import WorkList from "../WorkList/WorkList";
import { connect } from "react-redux";
import { createJob, updateJob } from "../WorkList/workOrderActions";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import RecentActivity from "../RecentActivity/RecentActivity";
import { firestoreConnect, isLoaded } from "react-redux-firebase";

const mapState = state => ({
  workOrders: state.firestore.ordered.workOrders
});
const actions = {
  createJob,

  updateJob
};
class Dashboard extends Component {
  handleDeleteJob = id => {
    this.props.deleteJob(id);
  };
  render() {
    // const { isOpen, selectedJob } = this.state;
    const { workOrders } = this.props;
    if (!isLoaded(workOrders)) return <LoadingComponent />;
    return (
      <Grid>
        <Grid.Column width={10}>
          <WorkList
            workOrders={workOrders}
            // selectJob={this.handleSelectJob}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          <RecentActivity />
        </Grid.Column>
      </Grid>
    );
  }
}
export default connect(
  mapState,
  actions
)(firestoreConnect([{ collection: "workOrders" }])(Dashboard));

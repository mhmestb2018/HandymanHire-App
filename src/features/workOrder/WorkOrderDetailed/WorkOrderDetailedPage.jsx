import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import WorkOrderDetailedHeader from "./WorkOrderDetailedHeader";
import WorkOrderDetailedInfo from "./WorkOrderDetailedInfo";
import WorkOrderChat from "./WorkOrderChat";
import WorkOrderDetailedSidebar from "./WorkOrderDetailedSidebar";
import { connect } from "react-redux";
import { withFirestore } from "react-redux-firebase";
import { toastr } from "react-redux-toastr";
import { objectToArray } from "../../../app/common/utill/helpers";
import { jobProposal } from "../../auth/userActions";

const mapState = (state, ownProps) => {
  const jobId = ownProps.match.params.id;

  let job = {};
  //did not work with if before firestore
  if (
    state.firestore.ordered.workOrders &&
    state.firestore.ordered.workOrders.lenght > 0
  ) {
    job =
      state.firestore.ordered.workOrders.filter(job => job.id === jobId)[0] ||
      {};
  }
  return {
    job,
    auth: state.firebase.auth
  };
};
const actions = {
  jobProposal
};
class WorkOrderDetailedPage extends Component {
  async componentDidMount() {
    const { firestore, match } = this.props;
    await firestore.setListener(`workOrders/${match.params.id}`);
  }

  async componentWillUnmount() {
    const { firestore, match } = this.props;
    await firestore.unsetListener(`workOrders/${match.params.id}`);
  }
  render() {
    const { job, auth, jobProposal } = this.props;
    const InterestedInJobs =
      job && job.InterestedInJobs && objectToArray(job.InterestedInJobs);
    const isHandyman = job.orderedByUid === auth.uid;
    const isInterested =
      InterestedInJobs && InterestedInJobs.some(i => i.id === auth.uid);
    return (
      <Grid>
        <Grid.Column width={10}>
          <WorkOrderDetailedHeader
            job={job}
            isInterested={isInterested}
            isHandyman={isHandyman}
            jobProposal={jobProposal}
          />
          <WorkOrderDetailedInfo job={job} />
          <WorkOrderChat />
        </Grid.Column>
        <Grid.Column width={6}>
          <WorkOrderDetailedSidebar InterestedInJobs={InterestedInJobs} />
        </Grid.Column>
      </Grid>
    );
  }
}

export default withFirestore(
  connect(
    mapState,
    actions
  )(WorkOrderDetailedPage)
);

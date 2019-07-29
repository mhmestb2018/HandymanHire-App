import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import WorkOrderDetailedHeader from "./WorkOrderDetailedHeader";
import WorkOrderDetailedInfo from "./WorkOrderDetailedInfo";
import WorkOrderChat from "./WorkOrderChat";
import WorkOrderDetailedSidebar from "./WorkOrderDetailedSidebar";
import { connect } from "react-redux";
import { withFirestore, firebaseConnect, isEmpty } from "react-redux-firebase";
import { compose } from "redux";
import {
  objectToArray,
  createDataTree
} from "../../../app/common/utill/helpers";
import { jobProposal, cancelJobProposal } from "../../auth/userActions";
import { addComment } from "../WorkList/workOrderActions";

const mapState = (state, ownProps) => {
  const jobId = ownProps.match.params.id;
  let job = {};
  //did not work with if
  if (state.firestore.ordered.workOrders) {
    job =
      state.firestore.ordered.workOrders.filter(job => job.id === jobId)[0] ||
      {};
  }
  return {
    job,
    auth: state.firebase.auth,
    chat:
      !isEmpty(state.firebase.data.chat_data) &&
      objectToArray(state.firebase.data.chat_data[ownProps.match.params.id])
  };
};
const actions = {
  jobProposal,
  cancelJobProposal,
  addComment
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
    const {
      job,
      auth,
      jobProposal,
      cancelJobProposal,
      addComment,
      chat
    } = this.props;
    const chatTree = !isEmpty(chat) && createDataTree(chat);
    const InterestedInJobs =
      job && job.InterestedInJobs && objectToArray(job.InterestedInJobs);

    const isHire = job.orderedByUid === auth.uid;

    const isInterested =
      InterestedInJobs && InterestedInJobs.some(i => i.id === auth.uid);
    return (
      <Grid>
        <Grid.Column width={10}>
          <WorkOrderDetailedHeader
            job={job}
            isInterested={isInterested}
            isHire={isHire}
            jobProposal={jobProposal}
            cancelJobProposal={cancelJobProposal}
          />
          <WorkOrderDetailedInfo job={job} />
          <WorkOrderChat
            chat={chatTree}
            addComment={addComment}
            jobId={job.id}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          <WorkOrderDetailedSidebar InterestedInJobs={InterestedInJobs} />
        </Grid.Column>
      </Grid>
    );
  }
}

export default compose(
  withFirestore,
  connect(
    mapState,
    actions
  ),
  firebaseConnect(props => [`chat_data/${props.match.params.id}`])
)(WorkOrderDetailedPage);

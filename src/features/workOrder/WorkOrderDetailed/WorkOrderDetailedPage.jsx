import React from "react";
import { Grid } from "semantic-ui-react";
import WorkOrderDetailedHeader from "./WorkOrderDetailedHeader";
import WorkOrderDetailedInfo from "./WorkOrderDetailedInfo";
import WorkOrderChat from "./WorkOrderChat";
import EventDetailedSidebar from "./EventDetailedSidebar";
import { connect } from "react-redux";

const mapState = (state, ownProps) => {
  const jobId = ownProps.match.params.id;

  let job = {};
  // if (jobId && state.jobs.lenght > 0) {
  job = state.jobs.filter(job => job.id === jobId)[0];
  // }
  return {
    job
  };
};

const WorkOrderDetailedPage = ({ job }) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <WorkOrderDetailedHeader job={job} />
        <WorkOrderDetailedInfo job={job} />
        <WorkOrderChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailedSidebar proposals={job.proposals} />
      </Grid.Column>
    </Grid>
  );
};

export default connect(mapState)(WorkOrderDetailedPage);

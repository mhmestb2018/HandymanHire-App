import React, { Component, Fragment } from "react";
import WorkListItem from "./WorkListItem";

class WorkList extends Component {
  render() {
    const { jobs, selectJob,deleteJob } = this.props;
    return (
      <Fragment>
        {jobs.map(job => (
          <WorkListItem key={job.id} job={job} selectJob={selectJob} deleteJob={deleteJob}/>
        ))}
      </Fragment>
    );
  }
}
export default WorkList;

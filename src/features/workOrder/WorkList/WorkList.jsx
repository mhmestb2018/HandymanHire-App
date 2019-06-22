import React, { Component, Fragment } from "react";
import WorkListItem from "./WorkListItem";

 class WorkList extends Component {
  render() {
    return (
      <Fragment>
        {this.props.jobs.map(job => (
          <WorkListItem key={job.id} job={job}/>
        ))}
      </Fragment>
    );
  }
}
export default WorkList;
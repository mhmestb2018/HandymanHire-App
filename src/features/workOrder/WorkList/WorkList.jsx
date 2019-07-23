import React, { Component, Fragment } from "react";
import WorkListItem from "./WorkListItem";

class WorkList extends Component {
  render() {
    const { workOrders } = this.props;
    return (
      <Fragment>
        {workOrders && workOrders.map(job => (
          <WorkListItem key={job.id} job={job}  />
        ))}
      </Fragment>
    );
  }
}
export default WorkList;

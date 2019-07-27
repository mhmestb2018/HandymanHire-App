import React, { Component, Fragment } from "react";
import WorkListItem from "./WorkListItem";
import InfiniteScroll from "react-infinite-scroller";

class WorkList extends Component {
  render() {
    const {
      workOrders,
      getNextWorkOrder,
      loading,
      moreWorkOrders
    } = this.props;
    return (
      <Fragment>
        <InfiniteScroll
          pageStart={0}
          loadMore={getNextWorkOrder}
          hasMore={!loading && moreWorkOrders}
        />
        {workOrders &&
          workOrders.map(job => <WorkListItem key={job.id} job={job} />)}
      </Fragment>
    );
  }
}
export default WorkList;

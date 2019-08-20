import React, { Component, Fragment } from "react";
import WorkListItem from "./WorkListItem";
import InfiniteScroll from "react-infinite-scroller";

class WorkList extends Component {
  render() {
    const {
      workOrders,
      getNextWorkOrders,
      loading,
      moreWorkOrders
    } = this.props;
    return (
      <Fragment>
       
        {workOrders && workOrders.lenght !== 0 && (
          <InfiniteScroll
            pageStart={0}
            loadMore={getNextWorkOrders}
            hasMore={!loading && moreWorkOrders}
            initialLoad={true}
          >
            {workOrders &&
              workOrders.map(job => <WorkListItem key={job.id} job={job} p/>)}
          </InfiniteScroll>
        )}
      </Fragment>
    );
  }
}
export default WorkList;

// import React from "react"

// import WorkListItem from "./WorkListItem";
// import InfiniteScroll from "react-infinite-scroller";

// const renderWorkOrders = workOrders =>
// workOrders && workOrders.map(job => <WorkListItem key={job.id} job={job} />)

// const WorkList = ({ workOrders, loading, getNextWorkOrders, moreWorkOrders }) => (
//   <div>
//     {workOrders &&
//       workOrders.length > 0 && (
//         <InfiniteScroll
//           pageStart={0}
//           loadMore={getNextWorkOrders}
//           hasMore={!loading && moreWorkOrders}
//           initialLoad={false}
//         >
//           {renderWorkOrders(workOrders)}
//         </InfiniteScroll>
//       )}
//   </div>
// )

// export default WorkList

/*global google*/
import React, { Component, Fragment } from "react";
import WorkListItem from "./WorkListItem";
import InfiniteScroll from "react-infinite-scroller";
import {
  Button,
  Divider,
  Grid,
  Header,
  Icon,
  Search,
  Segment,
  Dropdown,
  Input
} from "semantic-ui-react";
import PlaceInput from "../../../app/common/form/PlaceInput";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { reduxForm, Field } from "redux-form";
import FilterDropdown from "../../../app/common/form/FilterDropdown";

class WorkList extends Component {
  state = {
    searchField: ""
  };
  handleCitySelect = selectedCity => {
    geocodeByAddress(selectedCity)
      .then(results => getLatLng(results[0]))
      .then(latlng => {
        this.setState({
          cityLatLng: latlng
        });
      })
      .then(() => {
        this.props.change("city", selectedCity);
      });
  };
  render() {
    const {
      workOrders,
      getNextWorkOrders,
      loading,
      moreWorkOrders
    } = this.props;

    return (
      <Fragment>
        <Segment >
          <Grid columns={2} textAlign="center" stackable>
            <Grid.Row verticalAlign="middle">
              <Grid.Column>
                <FilterDropdown />
              </Grid.Column>
              
              <Grid.Column>
              <Input action="Search" placeholder="Search..." />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>

        {workOrders && workOrders.lenght !== 0 && (
          <InfiniteScroll
            pageStart={0}
            loadMore={getNextWorkOrders}
            hasMore={!loading && moreWorkOrders}
            initialLoad={true}
          >
            {workOrders &&
              workOrders.map(job => <WorkListItem key={job.id} job={job} />)}
          </InfiniteScroll>
        )}
      </Fragment>
    );
  }
}

export default reduxForm({ form: "workOrderForm", enableReinitialize: true })(
  WorkList
);

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

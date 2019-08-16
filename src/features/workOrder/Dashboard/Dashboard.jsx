import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Grid, Loader, Segment, Image, Input, Item } from "semantic-ui-react";
import WorkList from "../WorkList/WorkList";
import { getWorkOrdersForDashboard } from "../../workOrder/WorkList/workOrderActions";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import RecentActivity from "../RecentActivity/RecentActivity";

const query = [
  {
    collection: "activity",
    orderBy: ["timestamp", "desc"],
    limit: 10
  }
];
const mapStateToProps = ({ workOrders, async, firestore }) => ({
  workOrders,
  loading: async.loading,
  activities: firestore.ordered.activity
});

class Dashboard extends Component {
  contextRef = createRef();
  state = {
    moreWorkOrders: false,
    initialLoading: true,
    loadedWorkOrders: [],
    contextRef: {}
  };

  async componentDidMount() {
    const next = await this.props.getWorkOrdersForDashboard();

    if (next && next.docs && next.docs.length > 1) {
      this.setState({ moreWorkOrders: true, initialLoading: false });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.workOrders !== nextProps.workOrders) {
      this.setState({
        loadedWorkOrders: [
          ...this.state.loadedWorkOrders,
          ...nextProps.workOrders
        ]
      });
    }
  }

  getNextWorkOrders = async () => {
    const { workOrders } = this.props;
    let lastWorkOrder = workOrders && workOrders[workOrders.length - 1];
    let next = await this.props.getWorkOrdersForDashboard(lastWorkOrder);

    if (next && next.docs && next.docs.length <= 1) {
      this.setState({ moreWorkOrders: false });
    }
  };
  handleChange(e) {
    // Variable to hold the original version of the list
    let currentList = [];
    // Variable to hold the filtered list before putting into state
    let newList = [];

    // If the search bar isn't empty
    if (e.target.value !== "") {
      // Assign the original list to currentList
      currentList = this.props.items;

      // Use .filter() to determine which items should be displayed
      // based on the search terms
      newList = currentList.filter(item => {
        // change current item to lowercase
        const lc = item.toLowerCase();
        // change search term to lowercase
        const filter = e.target.value.toLowerCase();
        // check to see if the current list item includes the search term
        // If it does, it will be added to newList. Using lowercase eliminates
        // issues with capitalization in search terms and search content
        return lc.includes(filter);
      });
    } else {
      // If the search bar is empty, set newList to original task list
      newList = this.props.items;
    }
    // Set the filtered state based on what our rules added to newList
    this.setState({
      filtered: newList
    });
  }

  render() {
    const { loading, activities } = this.props;
    const { initialLoading, loadedWorkOrders, moreWorkOrders } = this.state;
    this.handleChange = this.handleChange.bind(this);
    if (initialLoading) return <LoadingComponent inverted={true} />;

    return (
      <Grid stackable>
        <Grid.Column width={10}>
          <div ref={this.contextRef}>
            <Segment>
              <Item>
                <Item.Image
                  src="/assets/categoryImages/Jobs.jpg"
                  alt="sitemap"
                  size="small"

                  // style={{ margin: "0em 17em" }}
                />
                <Input
                  icon="search"
                  placeholder="Search..."
                  style={{ margin: "0em 11em" }}
                  onChange={this.handleChange}
                />
              </Item>
            </Segment>
            <WorkList
              loading={loading}
              moreWorkOrders={moreWorkOrders}
              workOrders={loadedWorkOrders}
              getNextWorkOrders={this.getNextWorkOrders}
            />
          </div>
        </Grid.Column>
        <Grid.Column width={6}>
          <RecentActivity
            activities={activities}
            contextRef={this.contextRef}
            className="activity"
          />
        </Grid.Column>
        <Grid.Column width={10}>
          <Loader active={loading} />
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(
  mapStateToProps,
  { getWorkOrdersForDashboard }
)(firestoreConnect(query)(Dashboard));

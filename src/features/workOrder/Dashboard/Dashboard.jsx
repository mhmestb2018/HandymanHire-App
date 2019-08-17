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

  render() {
    const { loading, activities } = this.props;
    const { initialLoading, loadedWorkOrders, moreWorkOrders } = this.state;

    if (initialLoading) return <LoadingComponent inverted={true} />;

    return (
      <Grid stackable>
        <Grid.Column width={10}>
          <div ref={this.contextRef}>
            <Segment>
              <Image
                src="/assets/categoryImages/Jobs.jpg"
                alt="sitemap"
                size="small"
                centered
            
              />
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

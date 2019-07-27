import React, { Component } from "react";
import { Grid, Button, Loader } from "semantic-ui-react";
import WorkList from "../WorkList/WorkList";
import { connect } from "react-redux";
import { getWorkOrdersForDashboard } from "../WorkList/workOrderActions";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import RecentActivity from "../RecentActivity/RecentActivity";
import { firestoreConnect } from "react-redux-firebase";

const mapState = state => ({
  workOrders: state.workOrders,
  loading: state.async.loading
});
const actions = {
  getWorkOrdersForDashboard
};
class Dashboard extends Component {
  state = {
    moreWorkOrders: false,
    loadingInitial: true
  };
  async componentDidMount() {
    let next = this.props.getWorkOrdersForDashboard();
    if (next && next.docs && next.docs.lenght > 1) {
      this.setState({
        moreWorkOrders: true,
        loadingInitial: false,
        loadedWorkOrders: []
      });
    }
  }

  componentDidUpdate = prevProps => {
    if (this.props.workOrders !== prevProps.workOrders) {
      this.setState({
        loadedWorkOrders: [
          ...this.state.loadedWorkOrders,
          ...this.props.workOrders
        ]
      });
    }
  };

  getNextWorkOrder = async () => {
    const { workOrders } = this.props;
    let lastWorkOrder = workOrders && workOrders[workOrders.lenght - 1];
    let next = await this.props.getWorkOrdersForDashboard(lastWorkOrder);
    if (next && next.docs && next.docs.lenght <= 1) {
      this.setState({
        moreWorkOrders: false
      });
    }
  };
  render() {
    const { loading } = this.props;
    const { moreWorkOrders, loadedWorkOrders } = this.state;
    if (this.state.loadingInitial) return <LoadingComponent />;
    return (
      <Grid>
        <Grid.Column width={11}>
          <WorkList
            loading={loading}
            workOrders={loadedWorkOrders}
            moreWorkOrders={moreWorkOrders}
            getNextWorkOrder={this.getNextWorkOrder}
          />
  
        </Grid.Column>
        <Grid.Column width={5}>
          <RecentActivity />
        </Grid.Column>
        <Grid.Column width={10}>
          <Loader active='loading'/>
        </Grid.Column>
      </Grid>
    );
  }
}
export default connect(
  mapState,
  actions
)(firestoreConnect([{ collection: "workOrders" }])(Dashboard));

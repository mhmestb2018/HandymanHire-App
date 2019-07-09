import React, { Component, Fragment } from "react";
import Dashboard from "../../features/workOrder/Dashboard/Dashboard";
import NavBar from "../../features/nav/NavBar/NavBar";
import { Container } from "semantic-ui-react";
import { Route,Switch ,withRouter } from "react-router-dom";
import WorkOrderForm from "../../features/workOrder/WorkOrderForm/WorkOrderForm";
import ContractorsDashboard from "../../features/user/ContractorsDashboard/ContractorsDashboard";
import UserDetailedPage from "../../features/user/UserDetailed/UserDetailedPage";
import SettingsDashboard from "../../features/user/Settings/SettingsDashboard";
import HomePage from "../../features/home/HomePage";
import TestComponent from "../../features/testarea/TestComponent";
import WorkOrderDetailedPage from "../../features/workOrder/WorkOrderDetailed/WorkOrderDetailedPage";

class App extends Component {
  render() {
    return (
      <Fragment>
        <Route exact path="/" component={HomePage} />
        <Route
          path="/(.+)"
          render={() => (
            <Fragment>
              <NavBar />
              <Container className="main">
                <Switch key={this.props.location.key}>
                  <Route exact path="/jobs" component={Dashboard} />
                  <Route path="/jobs/:id" component={WorkOrderDetailedPage} />
                  <Route path="/profile/:id" component={UserDetailedPage} />
                  <Route path="/contractors" component={ContractorsDashboard} />
                  <Route path="/settings" component={SettingsDashboard} />
                  <Route
                    path={["/createJob", "/manage/:id"]}
                    component={WorkOrderForm}
                  />
                  <Route path="/test" component={TestComponent} />
                </Switch>
              </Container>
            </Fragment>
          )}
        />
      </Fragment>
    );
  }
}

export default withRouter(App);

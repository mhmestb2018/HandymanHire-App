import React, { Component, Fragment } from "react";
import Dashboard from "../../features/workOrder/Dashboard/Dashboard";
import NavBar from "../../features/nav/NavBar/NavBar";
import { Container } from "semantic-ui-react";
import { Route } from "react-router-dom";
import WorkOrderForm from "../../features/workOrder/WorkOrderForm/WorkOrderForm";
import WorkOrderDetailedPage from "../../features/workOrder/WorkOrderDetailed/WorkOrderDetailedPage";
import ContractorsDashboard from "../../features/user/ContractorsDashboard/ContractorsDashboard";
import UserDetailedPage from "../../features/user/UserDetailed/UserDetailedPage";
import SettingsDashboard from "../../features/user/Settings/SettingsDashboard";
import HomePage from "../../features/home/HomePage";
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
                <Route path="/jobs" component={Dashboard} />
                <Route path="/jobs:id" component={WorkOrderDetailedPage} />
                <Route path="/profile:id" component={UserDetailedPage} />
                <Route path="/contractors" component={ContractorsDashboard} />
                <Route path="/settings" component={SettingsDashboard} />
                <Route path="/createJob" component={WorkOrderForm} />
              </Container>
            </Fragment>
          )}
        />
      </Fragment>
    );
  }
}

export default App;

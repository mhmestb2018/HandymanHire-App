import React, { Component, Fragment } from "react";
import Dashboard from "../../features/workOrder/Dashboard/Dashboard";
import NavBar from "../../features/nav/NavBar/NavBar";
import { Container } from "semantic-ui-react";
import { Route, Switch, withRouter } from "react-router-dom";
import WorkOrderForm from "../../features/workOrder/WorkOrderForm/WorkOrderForm";
import MembersDashboard from "../../features/user/MembersDashboard/MembersDashbord";
import UserProfilePage from "../../features/user/UserProfile/UserProfilePage";
import SettingsDashboard from "../../features/user/Settings/SettingsDashboard";
import HomePage from "../../features/home/HomePage";
import TestComponent from "../../features/testarea/TestComponent";
import WorkOrderDetailedPage from "../../features/workOrder/WorkOrderDetailed/WorkOrderDetailedPage";
import ModalManager from "../../features/modals/ModalManager";
import Footer from "../../features/nav/Footer";
import ScrollUpButton from "react-scroll-up-button";
import ContactForm from '../common/form/ContactForm'
class App extends Component {
  render() {
    return (
      <Fragment>
        <ModalManager />
        <Route exact path="/" component={HomePage} />
        <Route
          path="/(.+)"
          render={() => (
            <Fragment>
              <Container className="main">
                <NavBar />
                <Switch key={this.props.location.key}>
                  <Route exact path="/jobs" component={Dashboard} />
                  <Route path="/jobs/:id" component={WorkOrderDetailedPage} />
                  <Route path="/profile/:id" component={UserProfilePage} />
                  <Route path="/members" component={MembersDashboard} />
                  <Route path="/settings" component={SettingsDashboard} />
                  <Route
                    path={["/createJob", "/manage/:id"]}
                    component={WorkOrderForm}
                  />
                  <Route path="/test" component={TestComponent} />
                  <Route path="/contact" component={ContactForm} />
                  
                </Switch>
                <ScrollUpButton /> 
                <Footer/>
              </Container>
            </Fragment>
          )}
        />
      </Fragment>
    );
  }
}

export default withRouter(App);

import React, { Component, Fragment, createRef } from "react";
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
import ContactForm from "../common/form/ContactForm";
import PrivacyPolicy from "../../features/home/PrivacyPolicy";
import TermsConditions from "../../features/home/TermsConditions";
import Sitemap from "../../features/home/Sitemap";

class App extends Component {
  contextRef = createRef();
  state = {
    contextRef: {}
  };
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
                <NavBar contextRef={this.contextRef} />
                <div ref={this.contextRef}>
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
                    <Route path="/privacyPolicy" component={PrivacyPolicy} />
                    <Route
                      path="/termsConditions"
                      component={TermsConditions}
                    />
                    <Route path="/sitemap" component={Sitemap} />
                  </Switch>
                  <ScrollUpButton />
                  <Footer />
                </div>
              </Container>
            </Fragment>
          )}
        />
      </Fragment>
    );
  }
}

export default withRouter(App);

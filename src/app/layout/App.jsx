import React, { Component, Fragment } from "react";
import Dashboard from "../../features/workOrder/Dashboard/Dashboard";
import NavBar from "../../features/nav/NavBar/NavBar";
import { Header, Container } from "semantic-ui-react";
class App extends Component {
  render() {
    return (
      <Fragment>
        <NavBar />
        <Container className="main">
        <Header as="h2">
            FIND TOP-RATED, CERTIFIED PROS FOR YOUR PROJECT
          </Header>
          <Dashboard />
        </Container>
      </Fragment>
    );
  }
}

export default App;

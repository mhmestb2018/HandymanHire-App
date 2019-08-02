// import React from "react";
// import {
//   Header,
//   Container,
//   Segment,
//   Image,
//   Button,
//   Icon
// } from "semantic-ui-react";
// const HomePage = ({ history }) => {
//   return (
//     <Segment inverted textAlign="center" vertical className="masthead">
//       <Container text>
//         <Image size="big" src="/assets/logoHHTools.png" alt="logo" />
//         <Header
//           as="h2"
//           inverted
//           content="FIND TOP-RATED, CERTIFIED PROS FOR YOUR PROJECT"
//         />

//         <Button onClick={() => history.push("/jobs")} size="huge" inverted>
//           Get started
//           <Icon name="right arrow" inverted />
//         </Button>
//       </Container>
//     </Segment>
//   );
// };

// export default HomePage;


//Responsive menu test
import _ from "lodash";
import React, { Component } from "react";
import { render } from "react-dom";
import {
  Container,
  Icon,
  Image,
  Menu,
  Sidebar,
  Responsive
} from "semantic-ui-react";

const NavBarMobile = ({
  children,
  leftItems,
  onPusherClick,
  onToggle,
  rightItems,
  visible
}) => (
  <Sidebar.Pushable>
    <Sidebar
      as={Menu}
      animation="overlay"
      icon="labeled"
      inverted
      items={leftItems}
      vertical
      visible={visible}
    />
    <Sidebar.Pusher
      dimmed={visible}
      onClick={onPusherClick}
      style={{ minHeight: "100vh" }}
    >
      <Menu fixed="top" inverted>
        <Menu.Item>
          <Image size="mini" src="https://react.semantic-ui.com/logo.png" />
        </Menu.Item>
        <Menu.Item onClick={onToggle}>
          <Icon name="sidebar" />
        </Menu.Item>
        <Menu.Menu position="right">
          {_.map(rightItems, item => (
            <Menu.Item {...item} />
          ))}
        </Menu.Menu>
      </Menu>
      {children}
    </Sidebar.Pusher>
  </Sidebar.Pushable>
);

const NavBarDesktop = ({ leftItems, rightItems }) => (
  <Menu fixed="top" inverted>
    <Menu.Item>
      <Image size="mini" src="https://react.semantic-ui.com/logo.png" />
    </Menu.Item>
    {_.map(leftItems, item => (
      <Menu.Item {...item} />
    ))}
    <Menu.Menu position="right">
      {_.map(rightItems, item => (
        <Menu.Item {...item} />
      ))}
    </Menu.Menu>
  </Menu>
);

const NavBarChildren = ({ children }) => (
  <Container style={{ marginTop: "5em" }}>{children}</Container>
);

class HomePage extends Component {
  state = {
    visible: false
  };

  handlePusher = () => {
    const { visible } = this.state;

    if (visible) this.setState({ visible: false });
  };

  handleToggle = () => this.setState({ visible: !this.state.visible });

  render() {
    const { children, leftItems, rightItems } = this.props;
    const { visible } = this.state;

    return (
      <div>
        <Responsive {...Responsive.onlyMobile}>
          <NavBarMobile
            leftItems={leftItems}
            onPusherClick={this.handlePusher}
            onToggle={this.handleToggle}
            rightItems={rightItems}
            visible={visible}
          >
            <NavBarChildren>{children}</NavBarChildren>
          </NavBarMobile>
        </Responsive>
        <Responsive minWidth={Responsive.onlyTablet.minWidth}>
          <NavBarDesktop leftItems={leftItems} rightItems={rightItems} />
          <NavBarChildren > {children}</NavBarChildren>
        </Responsive>
      </div>
    );
  }
}

const leftItems = [
  { as: "a", content: "Home", key: "home" },
  { as: "a", content: "Users", key: "users" }
];
const rightItems = [
  { as: "a", content: "Login", key: "login" },
  { as: "a", content: "Register", key: "register" }
];

const App = () => <HomePage leftItems={leftItems} rightItems={rightItems}></HomePage>;



export default App;

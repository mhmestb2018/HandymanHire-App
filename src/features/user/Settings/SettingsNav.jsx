import React, { Fragment } from "react";
import { Menu, Header, Dropdown, Icon } from "semantic-ui-react";
import { NavLink, Link } from "react-router-dom";
const trigger = (
  <span>
    <Icon name="user" /> Hello, Bob
  </span>
);

const options = [
  {
    key: "user",
    text: (
      <span>
        Signed in as <strong>Bob Smith</strong>
      </span>
    ),
    disabled: true
  },
  { key: "profile", text: "Your Profile" },
  { key: "stars", text: "Your Stars" },
  { key: "explore", text: "Explore" },
  { key: "integrations", text: "Integrations" },
  { key: "help", text: "Help" },
  { key: "settings", text: "Settings" },
  { key: "sign-out", text: "Sign Out" }
];
const SettingsNav = () => {
  return (
    <Fragment>
      {/* <Dropdown trigger={trigger} options={options} /> */}

      <Menu.Item position="left">
        <Icon name="setting" size="large" />

        <Dropdown pointing="top left" text="Settings">
          <Dropdown.Menu>
            <Dropdown.Item
              as={NavLink}
              to="/settings/basic"
              icon="user"
              text="Basic Info"
            />

            <Dropdown.Item
              as={NavLink}
              to="/settings/about"
              icon="id badge outline"
              text="About"
            />
            <Dropdown.Item
              as={NavLink}
              to="/settings/projects"
              icon="images outline"
              text="My Jobs Portfolio"
            />
            <Dropdown.Item
              as={NavLink}
              to="/settings/account"
              icon="lock"
              text="My Account"
            />
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>

      {/* <Menu vertical>
        <Header icon="user" attached inverted color="grey" content="Profile" />
        <Menu.Item as={NavLink} to="/settings/basic">
          Basics
        </Menu.Item>
        <Menu.Item as={NavLink} to="/settings/about">
          About me
        </Menu.Item>
        <Menu.Item as={NavLink} to="/settings/projects">
          My Projects(photos)
        </Menu.Item>
      </Menu>
      <Menu vertical>
      <Header
        icon="settings"
        attached
        inverted
        color="grey"
        content="Account"
      />
      <Menu.Item as={NavLink} to="/settings/account">
        My Account
      </Menu.Item>
    </Menu> */}
    </Fragment>
  );
};
export default SettingsNav;

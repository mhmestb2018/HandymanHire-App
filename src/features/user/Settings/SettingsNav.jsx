import React, { Fragment } from "react";
import { Menu, Dropdown, Icon } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

const SettingsNav = () => {
  return (
    <Fragment>
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
    </Fragment>
  );
};
export default SettingsNav;

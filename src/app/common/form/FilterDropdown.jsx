import React from "react";
import { Dropdown, Input, Header } from "semantic-ui-react";

const optionsCategory = [
  { key: "painting", text: "Painting", value: "painting" },
  { key: "home renovation", text: "Home Renovation", value: "home renovation" },
  { key: "cleaning", text: "Cleaning", value: "cleaning" },
  {
    key: "electrical installation",
    text: "Electrical Installation",
    value: "electrical installation"
  },
  { key: "plumbing", text: "Plumbing", value: "plumbing" },
  {
    key: "home appliances repair",
    text: "Home Appliances Repair",
    value: "home appliances repair"
  },
  {
    key: "furniture repair & restoration",
    text: "Furniture Repair & Restoration",
    value: "furniture repair & restoration"
  }
];

const FilterDropdown = ({ workOrders }) => (
  <Dropdown
    text="Filter by Category"
    icon="filter"
    floating
    labeled
    button
    className="icon"
  >
    <Dropdown.Menu>
      <Dropdown.Divider />
      <Dropdown.Header  content="choose category" />
      <Dropdown.Menu scrolling>
        {optionsCategory.map(option => (
          <Dropdown.Item key={option.value} {...option} />
        ))}
      </Dropdown.Menu>
    </Dropdown.Menu>
  </Dropdown>
);

export default FilterDropdown;

import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import WorkList from "../WorkList/WorkList";
import WorkOrderForm from "../WorkOrderForm/WorkOrderForm";
import { Button } from "semantic-ui-react";

const jobsFromDashboard = [
  {
    id: "1",
    title: "House Painting",
    date: "2020-03-27T11:00:00+00:00",
    category: "Home Exterior",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.",
    city: "Sligo, IE",
    address: "Avondale",
    orderedBy: "Tom",
    photoURL: "https://randomuser.me/api/portraits/men/20.jpg",
    proposals: [
      {
        id: "a",
        name: "Bob",
        photoURL: "https://randomuser.me/api/portraits/men/20.jpg"
      },
      {
        id: "b",
        name: "Tom",
        photoURL: "https://randomuser.me/api/portraits/men/22.jpg"
      }
    ]
  },
  {
    id: "2",
    title: "Fix the washing machine",
    date: "2018-03-28T14:00:00+00:00",
    category: "Home Interior",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.",
    city: "Castlebar, IE",
    address: "Westport Road",
    orderedBy: "John",
    photoURL: "https://randomuser.me/api/portraits/men/22.jpg",
    proposals: [
      {
        id: "b",
        name: "Tom",
        photoURL: "https://randomuser.me/api/portraits/men/22.jpg"
      },
      {
        id: "a",
        name: "Bob",
        photoURL: "https://randomuser.me/api/portraits/men/20.jpg"
      }
    ]
  }
];

class Dashboard extends Component {
  state = {
    jobs: jobsFromDashboard,
    isOpen: false
  };
  handleIsOpenToggle = () => {
    this.setState(({ isOpen }) => ({
      isOpen: !isOpen
    }));
  };
  render() {
    const { jobs, isOpen } = this.state;

    return (
      <Grid>
        <Grid.Column width={10}>
          <WorkList jobs={jobs} />
        </Grid.Column>
        <Grid.Column width={6}>
          <Button
            onClick={this.handleIsOpenToggle}
            positive
            content="Create project"
          />
          {isOpen && <WorkOrderForm cancelFormOpen={this.handleIsOpenToggle} />}
        </Grid.Column>
      </Grid>
    );
  }
}
export default Dashboard;

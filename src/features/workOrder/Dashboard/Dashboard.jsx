import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import WorkList from "../WorkList/WorkList";
import WorkOrderForm from "../WorkOrderForm/WorkOrderForm";
import { Button } from "semantic-ui-react";
import cuid from "cuid";

const jobsFromDashboard = [
  {
    id: "1",
    title: "House Painting",
    date: "2020-03-27",
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
    date: "2018-03-28",
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
    isOpen: false,
    selectedJob: null
  };
  // handleIsOpenToggle = () => {
  //   this.setState(({ isOpen }) => ({
  //     isOpen: !isOpen
  //   }));
  // };
  handleCreateFormOpen = () => {
    this.setState({
      isOpen: true,
      selectedJob: null
    });
  };
  handleFormCancel = () => {
    this.setState({
      isOpen: false
    });
  };
  handleCreateJob = newJob => {
    newJob.id = cuid();
    newJob.photoURL = "/assets/user.png";
    this.setState(({ jobs }) => ({
      jobs: [...jobs, newJob],
      isOpen: false
    }));
  };
  handleSelectJob = job => {
    this.setState({
      selectedJob: job,
      isOpen: true
    });
  };

  handleUpdateJobs = updatedJob => {
    this.setState(({ jobs }) => ({
      jobs: jobs.map(job => {
        if (job.id === updatedJob.id) {
          return { ...updatedJob };
        } else {
          return job;
        }
      }),
      isOpen: false,
      selectedJob: null
    }));
  };
  handleDeleteJob = id => {
    this.setState(({ jobs }) => ({
      jobs: jobs.filter(j => j.id !== id)
    }));
  };
  render() {
    const { jobs, isOpen, selectedJob } = this.state;

    return (
      <Grid>
        <Grid.Column width={10}>
          <WorkList 
          jobs={jobs} 
          selectJob={this.handleSelectJob} 
          deleteJob={this.handleDeleteJob}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          <Button
            onClick={this.handleCreateFormOpen}
            positive
            content="Create project"
          />
          {isOpen && (
            <WorkOrderForm
              //makes form changed when click on diffrent view button
              key={selectedJob ? selectedJob.id : 0}
              updateJob={this.handleUpdateJobs}
              selectedJob={selectedJob}
              createJob={this.handleCreateJob}
              cancelFormOpen={this.handleFormCancel}
            />
          )}
        </Grid.Column>
      </Grid>
    );
  }
}
export default Dashboard;

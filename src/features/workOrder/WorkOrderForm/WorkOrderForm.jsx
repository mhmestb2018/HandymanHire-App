import React, { Component } from "react";
import { Segment, Button, label, Form } from "semantic-ui-react";

class WorkOrderForm extends Component {
  state = {
    title: "",
    date: "",
    city: "",
    address: "",
    orderedBy: ""
  };
  componentDidMount(){
    if(this.props.selectedJob !==null ){
      this.setState({
        ...this.props.selectedJob
      })
    }
  }
  handleFormSubmit = jb => {
    jb.preventDefault();
    if(this.state.id){
      this.props.updateJob(this.state);
    }else{
      this.props.createJob(this.state);
    }
    
  };
  handleInputChange = ({target:{name,value}}) => {
    this.setState({
      [name]: value
    });
  };
  render() {
    const { cancelFormOpen } = this.props;
    const { title, date, city, address, orderedBy } = this.state;
    return (
      <Segment>
        <Form onSubmit={this.handleFormSubmit} autoComplete="off">
          <Form.Field>
            <label>Job Title</label>
            <input
              name="title"
              onChange={this.handleInputChange}
              value={title}
              placeholder="Job title"
            />
          </Form.Field>
          <Form.Field>
            <label>Job Date</label>
            <input
              name="date"
              onChange={this.handleInputChange}
              value={date}
              type="date"
              placeholder="Job Date"
            />
          </Form.Field>
          <Form.Field>
            <label>City</label>
            <input
              name="city"
              onChange={this.handleInputChange}
              value={city}
              placeholder="City job is taking place"
            />
          </Form.Field>
          <Form.Field>
            <label>Address</label>
            <input
              name="address"
              onChange={this.handleInputChange}
              value={address}
              placeholder="Enter the address of the job"
            />
          </Form.Field>
          <Form.Field>
            <label>Ordered By</label>
            <input
              name="orderedBy"
              onChange={this.handleInputChange}
              value={orderedBy}
              placeholder="Enter the name of person Ordered"
            />
          </Form.Field>
          <Button positive type="submit">
            Submit
          </Button>
          <Button onClick={cancelFormOpen} type="button">
            Cancel
          </Button>
        </Form>
      </Segment>
    );
  }
}
export default WorkOrderForm;

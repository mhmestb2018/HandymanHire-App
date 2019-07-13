import { incrementCounter, decrementCounter } from "./testActions";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "semantic-ui-react";
import TestPlaceInput from "../testarea/testPlaceInput";
import SimpleMap from "./SimpleMap";

const mapState = state => ({
  data: state.test.data
});
const actions = {
  incrementCounter,
  decrementCounter
};
class TestComponent extends Component {
  render() {
    const { data, incrementCounter, decrementCounter } = this.props;
    return (
      <div>
        <h1>test component</h1>
        <h3>the ansver is : {data}</h3>
        <Button onClick={incrementCounter} positive content="Increment" />
        <Button onClick={decrementCounter} negative content="Decrement" />
        <TestPlaceInput />
        <br/>
        <SimpleMap/>
      </div>
    );
  }
}
export default connect(
  mapState,
  actions
)(TestComponent);

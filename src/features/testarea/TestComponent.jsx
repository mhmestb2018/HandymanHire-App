import { incrementCounter, decrementCounter } from "./testActions";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "semantic-ui-react";
import TestPlaceInput from "../testarea/testPlaceInput";
import SimpleMap from "./SimpleMap";
import { openModal } from "../modals/modalActions";

const mapState = state => ({
  data: state.test.data
});
const actions = {
  incrementCounter,
  decrementCounter,
  openModal
};
class TestComponent extends Component {
  render() {
    const { data, incrementCounter, decrementCounter, openModal } = this.props;
    return (
      <div>
        <h1>test component</h1>
        <h3>the ansver is : {data}</h3>
        <Button onClick={incrementCounter} positive content="Increment" />
        <Button onClick={decrementCounter} negative content="Decrement" />

        <Button
          onClick={() => openModal("TestModal", { data: 42 })}
          negative
          content="Open Modal"
        />
        <TestPlaceInput />
        <br />
        <SimpleMap />
      </div>
    );
  }
}
export default connect(
  mapState,
  actions
)(TestComponent);

import { incrementAsync, decrementAsync } from "./testActions";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "semantic-ui-react";
import TestPlaceInput from "../testarea/testPlaceInput";
import SimpleMap from "./SimpleMap";
import { openModal } from "../modals/modalActions";

const mapState = state => ({
  data: state.test.data,
  loading: state.async.loading,
  buttonName: state.async.elementName
});
const actions = {
  incrementAsync,
  decrementAsync,
  openModal
};
class TestComponent extends Component {
  render() {
    const {
      data,
      incrementAsync,
      decrementAsync,
      openModal,
      loading,
      buttonName
    } = this.props;
    return (
      <div>
        <h1>test component</h1>
        <h3>the ansver is : {data}</h3>
        <Button
          name="increment"
          loading={buttonName === 'increment' && loading}
          onClick={j => incrementAsync(j.target.name)}
          positive
          content="Increment"
        />
        <Button
          name="decrement"
          loading={buttonName === 'decrement' && loading}
          onClick={j => decrementAsync(j.target.name)}
          negative
          content="Decrement"
        />

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

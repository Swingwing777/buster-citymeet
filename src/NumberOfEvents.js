// src/NumberOfEvents.js

import React, { Component } from "react";

class NumberOfEvents extends Component {

  // use default 32
  state = {
    eventCount: 32
  }

  handleNumberChanged = (event) => {
    const value = event.target.value;
    this.setState({ eventCount: value });
    // if (value !== "") {
    //   this.props.updateNumberOfEvents(+value);
    //}
  }

  render() {
    return <div>
      <input
        type="number"
        className="viewNumber"
        value={this.state.eventCount}
        onChange={this.handleNumberChanged}
      />
    </div>;
  }
}
export default NumberOfEvents;

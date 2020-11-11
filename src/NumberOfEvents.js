// src/NumberOfEvents.js

import React, { Component } from "react";

class NumberOfEvents extends Component {
  state = {
    numEvents: 32
  }

  handleNumberChanged = (event) => {
    const value = event.target.value;
    this.setState({ numEvents: value });
  }

  render() {
    return <div>
      <input
        type="number"
        className="viewNumber"
        value={this.state.numEvents}
        onChange={this.handleNumberChanged}
      />
    </div>;
  }
}
export default NumberOfEvents;

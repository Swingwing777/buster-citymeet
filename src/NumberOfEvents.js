// src/NumberOfEvents.js

import React, { Component } from "react";
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {

  // use default 32
  state = {
    eventCount: 32,
    errorText: ''
  }

  handleNumberChanged = (event) => {
    const value = event.target.value;
    this.setState({ eventCount: value });
    if (value <= 0 || value > 32 || value === '') {
      this.setState({
        eventCount: value,
        errorText: 'Please choose a number between 1 and 32'
      });

      // if user has input value, call updateEventCount() in App.js
    } else {
      this.props.updateEventCount(value);
      this.setState({
        eventCount: value,
        errorText: ''
      });
    }
  }

  render() {
    return <div className="NumberOfEvents">
      <ErrorAlert className="errorAlert" text={this.state.errorText} />
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

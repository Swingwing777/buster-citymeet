// src/Event.js

import React, { Component } from "react";

class Event extends Component {
  state = {
    showDetails: false
  }

  handleToggleDetails = () => {
    this.setState(prevState => ({
      showDetails: !prevState.showDetails
    }))
  };

  render() {
    const { event } = this.props;
    if (!this.state.showDetails) {
      return <div className='eventDetails'>
        <div className='eventSummary'>{event.summary}</div>
        <div className='eventStart'>{event.start.dateTime}</div>
        <div className='eventTimezone'>{event.start.timeZone}</div>
        <div className='eventLocation'>{event.location}</div>
        <b
          className='buttonDetails'
          onClick={() => this.handleToggleDetails()}>
          Details
        </b>
      </div>
    }
    return <div className='eventDetails'>
      <div className='eventSummary'>{event.summary}</div>
      <div className='eventStart'>{event.start.dateTime}</div>
      <div className='eventTimezone'>{event.start.timeZone}</div>
      <div className='eventLocation'>{event.location}</div>
      <div className='eventDescription'>{event.description}</div>
      <b
        className='buttonDetails'
        onClick={() => this.handleToggleDetails()}>
        Hide Details
        </b>
    </div>;
  }
};


export default Event;
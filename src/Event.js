// src/Event.js

import React, { Component } from "react";
import { Card } from 'react-bootstrap';
import moment from 'moment'

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
      return <Card className='event'>
        <div className='eventSummary'>{event.summary}</div>
        <div
          className='eventStart'>{moment(event.start.dateTime).format("D MMM YYYY, h:mm a")}
        </div>
        <div className='eventTimezone'>{event.start.timeZone}</div>
        <div className='eventLocation'>{event.location}</div>
        <b
          className='details-btn'
          onClick={() => this.handleToggleDetails()}>
          Details
        </b>
      </Card>
    }
    return <Card className='event'>
      <div className='eventSummary'>{event.summary}</div>
      <div
        className='eventStart'>{moment(event.start.dateTime).format("D MMM YYYY, h:mm a")}
      </div>
      <div className='eventTimezone'>{event.start.timeZone}</div>
      <div className='eventLocation'>{event.location}</div>
      <div className='eventDetails'>{event.description}</div>
      <b
        className='details-btn'
        onClick={() => this.handleToggleDetails()}>
        Hide Details
      </b>
    </Card>;
  }
};


export default Event;
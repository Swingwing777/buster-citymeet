// src/EventList.js

import React, { Component } from 'react';
import Event from './Event';

class EventList extends Component {
  render() {
    const { events } = this.props;
    // console.log(events);
    return (
      <ul className="EventList">
        {events.map(event =>
          <div key={event.id}>
            <Event event={event} />
          </div>
        )}
      </ul>
    );
  }
};

export default EventList;
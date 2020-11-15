// src/EventList.js

import React, { Component } from 'react';
import Event from './Event';
import { Card } from 'react-bootstrap';

class EventList extends Component {
  render() {
    const { events } = this.props;
    return (
      <ul className="EventList">
        {events.map(event =>
          <Card key={event.id}>
            <Event event={event} />
          </Card>
        )}
      </ul>
    );
  }
};

export default EventList;
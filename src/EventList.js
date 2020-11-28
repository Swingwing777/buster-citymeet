// src/EventList.js

import React, { Component } from 'react';
import Event from './Event';
import { OfflineAlert } from './Alert';
import { handleConnectionChanged } from './_support_/api';

class EventList extends Component {

  state = {
    offlineText: ''
  }

  componentDidMount() {
    handleConnectionChanged()
    console.log(this.state.offlineText);
  }

  render() {
    const { events } = this.props;
    // console.log(events);
    return (<div className="Eventlist">
      <OfflineAlert text={this.state.offlineText} />
      <ul className="EventList">
        {events.map(event =>
          <div key={event.id}>
            <Event event={event} />
          </div>
        )}
      </ul>
    </div>
    );
  }
};

export default EventList;
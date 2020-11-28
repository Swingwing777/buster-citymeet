// src/EventList.js

import React, { Component } from 'react';
import Event from './Event';
import { OfflineAlert } from './Alert';

class EventList extends Component {

  state = {
    offlineText: ''
  }

  componentDidMount() {
    var status = navigator.onLine ? 'online' : 'offline';
    console.log(status);
    if (status === 'offline') {
      this.setState({
        offlineText: 'Working offline. Events not updated.',
      });
    } else {
      this.setState({
        offlineText: '',
      })
    }
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
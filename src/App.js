// src/App.js

import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { Container } from 'react-bootstrap';
import { getEvents, extractLocations } from './_support_/api';

class App extends Component {
  state = {
    events: [],
    locations: []
  }

  updateEvents = (location) => {
    getEvents().then((events) => {
      const locationEvents = (location === 'all')
        ? events
        : events.filter((event) => event.location === location);
      this.setState({
        events: locationEvents
      });
    });
  }

  componentDidMount() {
    getEvents().then((response) => {
      this.setState({
        events: response.events,
        locations: extractLocations(response.events)
      });
    })
      .catch((err) => {
        console.log(err);
      });
  }


  render() {
    return (
      <div className="App">
        <Container>
          <CitySearch
            locations={this.state.locations}
            updateEvents={this.updateEvents} />
          <EventList events={this.state.events} />
          <NumberOfEvents />
        </Container>
      </div >
    );
  }
}

export default App;

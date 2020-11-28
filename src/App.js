// src/App.js

import React, { Component } from 'react';
import './App.css';
import "./nprogress.css";
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { Container } from 'react-bootstrap';
import { getEvents, extractLocations } from './_support_/api';


class App extends Component {
  state = {
    events: [],
    locations: [],
    showEventCount: 32,
    userFilter: [],
  }

  updateEvents = (location) => {
    getEvents().then((events) => {
      const showEventCount = this.state.showEventCount;

      const locationEvents = (location === 'all')
        ? events
        : events.filter((event) => event.location === location);

      const filteredEvents = locationEvents.slice(0, showEventCount)

      this.setState({
        // new array matching locations and showEventCount filter.
        events: filteredEvents
      });
    });
  }

  updateEventCount = (number) => {
    this.setState({
      showEventCount: number
    });
  };

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events, locations: extractLocations(events) });
      }
    })
      .catch((err) => {
        console.log(err);
      });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    return (
      <div className="App">
        <h1>CityMeet Calendar</h1>
        <Container>
          <CitySearch
            locations={this.state.locations}
            updateEvents={this.updateEvents} />
          <NumberOfEvents
            updateEventCount={this.updateEventCount}
          />
          <EventList
            events={this.state.events}
            showEventCount={this.state.showEventCount}
          />
        </Container>
      </div >
    );
  }
}

export default App;

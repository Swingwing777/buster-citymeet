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
    showEventCount: 32
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
        <Container>
          <CitySearch
            locations={this.state.locations}
            updateEvents={this.updateEvents} />
          <EventList
            events={this.state.events}
            showEventCount={this.state.showEventCount} />
          <NumberOfEvents
            updateEventCount={this.updateEventCount}
          />
        </Container>
      </div >
    );
  }
}

export default App;
